import { XrayConfig } from './easy-xray.types';
import { XrayUser } from './users/users.types';
export declare const getServerConfig: () => XrayConfig.ServerConfig;
export declare const getUsersFromConfig: (serverConfig: XrayConfig.ServerConfig) => XrayUser[];
