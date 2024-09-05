"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFromConfig = exports.getServerConfig = void 0;
const not_found_error_1 = require("../common/errors/not-found.error");
const parsing_error_1 = require("../common/errors/parsing.error");
const easy_xray_consts_1 = require("./easy-xray.consts");
const easy_xray_shell_1 = require("./easy-xray.shell");
const getServerConfig = () => {
    try {
        const config = easy_xray_shell_1.shell.cat(`./${easy_xray_consts_1.CONFIG_DIRECTORY}/config_server.json`);
        return JSON.parse(config);
    }
    catch (e) {
        throw new parsing_error_1.ParsingError('Server configuration is not a valid JSON');
    }
};
exports.getServerConfig = getServerConfig;
const getUsersFromConfig = (serverConfig) => {
    const vlessInbound = serverConfig.inbounds.find((inbound) => inbound.protocol === 'vless');
    if (!vlessInbound) {
        throw new not_found_error_1.NotFoundError('VLESS inbound not found in the config');
    }
    return vlessInbound.settings.clients.map((client) => ({
        name: client.email.substring(0, client.email.indexOf('@')),
    }));
};
exports.getUsersFromConfig = getUsersFromConfig;
//# sourceMappingURL=easy-xray.utils.js.map