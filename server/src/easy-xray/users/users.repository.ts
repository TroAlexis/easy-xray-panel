import { Injectable } from '@nestjs/common';
import { keyBy } from 'lodash';
import {
  ARGUMENT_SEPARATOR,
  CONFIG_DIRECTORY,
  EXECUTABLE_FILENAME,
} from '../easy-xray.consts';
import { EasyXrayCommand } from '../easy-xray.enums';
import { shell } from '../easy-xray.shell';
import { getServerConfig, getUsersFromConfig } from '../easy-xray.utils';
import type { XrayUserDto } from './dto/xray-user.dto';

@Injectable()
export class UsersRepository {
  findAll() {
    // Get all user configs
    const userConfigs = shell
      .ls(`${CONFIG_DIRECTORY}/config_client_*.json`)
      .filter((file) => {
        return !file.includes('_cdn');
      });

    const users = userConfigs.map<XrayUserDto>((file) => {
      const [, userName] = file.match(/client_(.*).json$/);
      return { name: userName };
    });

    // Check users in server config to see if some are suspended
    const serverConfig = getServerConfig();
    const serverConfigUsers = getUsersFromConfig(serverConfig);
    const serverConfigUserMap = keyBy(serverConfigUsers, 'name');

    return users.map<XrayUserDto>((user) => ({
      ...user,
      suspended: !serverConfigUserMap[user.name],
    }));
  }

  add(...names: string[]) {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.ADD_USER} ${names.join(ARGUMENT_SEPARATOR)} <<-EOF
        Y
        S
EOF
      `,
    );

    if (result.includes('already exists')) {
      return null;
    }

    return names;
  }

  suspend(...names: string[]) {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.SUSPEND_USER} ${names.join(ARGUMENT_SEPARATOR)} <<-EOF
        Y
        S
EOF
      `,
    );

    if (result.includes('no config')) {
      return null;
    }

    return names;
  }

  resume(...names: string[]) {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.RESUME_USER} ${names.join(ARGUMENT_SEPARATOR)} <<-EOF
        Y
        S
EOF
      `,
    );

    if (result.includes("can't resume")) {
      return null;
    }

    return names;
  }

  delete(...names: string[]) {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.DELETE_USER} ${names.join(ARGUMENT_SEPARATOR)} <<-EOF
        Y
        S
EOF
      `,
    );

    if (result.includes('no config')) {
      return null;
    }

    return names;
  }

  link(name: string) {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.LINK} ${CONFIG_DIRECTORY}/config_client_${name}.json`,
    );

    const matches = result.match(/(vless:\/\/.+)/);
    return matches?.[1];
  }
}
