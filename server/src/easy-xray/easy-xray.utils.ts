import { NotFoundError } from '@common/errors/not-found.error';
import { ParsingError } from '@common/errors/parsing.error';
import { CONFIG_DIRECTORY } from './easy-xray.consts';
import { shell } from './easy-xray.shell';
import { XrayConfig } from './easy-xray.types';
import type { XrayUserDto } from './users/dto/xray-user.dto';

export const getServerConfig = (): XrayConfig.ServerConfig => {
  try {
    const config = shell.cat(`./${CONFIG_DIRECTORY}/config_server.json`);
    return JSON.parse(config);
  } catch (e) {
    throw new ParsingError('Server configuration is not a valid JSON');
  }
};

export const getUsersFromConfig = (serverConfig: XrayConfig.ServerConfig) => {
  const vlessInbound = serverConfig.inbounds.find(
    (inbound) => inbound.protocol === 'vless',
  );

  if (!vlessInbound) {
    throw new NotFoundError('VLESS inbound not found in the config');
  }

  return vlessInbound.settings.clients.map<XrayUserDto>((client) => ({
    name: client.email.substring(0, client.email.indexOf('@')),
  }));
};
