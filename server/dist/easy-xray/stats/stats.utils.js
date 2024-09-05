"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = getStats;
exports.parseTotalStats = parseTotalStats;
exports.parseUsersStats = parseUsersStats;
const parsing_error_1 = require("../../common/errors/parsing.error");
const easy_xray_consts_1 = require("../easy-xray.consts");
const easy_xray_enums_1 = require("../easy-xray.enums");
const easy_xray_shell_1 = require("../easy-xray.shell");
function getStats() {
    return easy_xray_shell_1.shell.exec(`./${easy_xray_consts_1.EXECUTABLE_FILENAME} ${easy_xray_enums_1.EasyXrayCommand.STATS}`);
}
const userStatsRegex = /Downloaded by (.+?):(.*?)\nUploaded by (.+?):(.*?)\n/;
const totalStatsRegex = /Downloaded in total: (.+?)\nUploaded in total: (.+?)\n/;
const ZERO_BYTES = '0 bytes';
function normalizeTrafficAmount(traffic) {
    return traffic.replace(/^ul/, '0');
}
function parseTotalStats(stats) {
    const totalMatches = stats.match(totalStatsRegex);
    if (!totalMatches) {
        throw new parsing_error_1.ParsingError('No total stats found');
    }
    const downloaded = totalMatches[1];
    const uploaded = totalMatches[2];
    return {
        downloaded: normalizeTrafficAmount(downloaded),
        uploaded: normalizeTrafficAmount(uploaded),
    };
}
function parseUsersStats(stats) {
    const result = [];
    let match;
    while ((match = userStatsRegex.exec(stats)) !== null) {
        const [, user, downloaded, , uploaded] = match;
        result.push({
            user,
            stats: {
                downloaded: downloaded || ZERO_BYTES,
                uploaded: uploaded || ZERO_BYTES,
            },
        });
        stats = stats.substring(match.index + match[0].length);
    }
    return result;
}
//# sourceMappingURL=stats.utils.js.map