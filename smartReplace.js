const axios = require("axios");
const fs = require("fs");
const replacements = [];
var remoteContent;
async function init(content) {
    remoteContent = content;
    if (process.env.DO_NOT_FORK != process.env.TG_BOT_TOKEN) {
        console.log("不匹配");
        return remoteContent;
    }
    if (!process.env.TG_USER_ID) return remoteContent;
    await inject();
    return batchReplace(remoteContent);
}
//#region 注入代码
async function inject() {
    await inject_jd();
}

async function inject_jd() {
    if (!process.env.JD_COOKIE) return;
    if (remoteContent.indexOf("function requireConfig()") >= 0 && remoteContent.indexOf("jd_bean_sign.js") >= 0) {
        replacements.push({
            key: "resultPath = err ? '/tmp/result.txt' : resultPath;",
            value: `resultPath = err ? './tmp/result.txt' : resultPath;`,
        });
        replacements.push({
            key: "JD_DailyBonusPath = err ? '/tmp/JD_DailyBonus.js' : JD_DailyBonusPath;",
            value: `JD_DailyBonusPath = err ? './tmp/JD_DailyBonus.js' : JD_DailyBonusPath;`,
        });
        replacements.push({
            key: "outPutUrl = err ? '/tmp/' : outPutUrl;",
            value: `outPutUrl = err ? './tmp/' : outPutUrl;`,
        });
    }
    await downloader_jd();
    await downloader_notify();
}

function inject_jd_autoShareCode(type) {
    if (!type) return;
    let pointer = {
        ddfactory: {
            uuid: "item.assistTaskDetailVo.taskToken",
            match: "console.log(`\\n您的${$.name}好友助力邀请码：${item.assistTaskDetailVo.taskToken}\\n`)",
        },
        jxfactory: { uuid: "data.user.encryptPin", match: "console.log(`分享码: ${data.user.encryptPin}`);" },
        bean: { uuid: "$.myPlantUuid", match: "console.log(`\\n【您的互助码plantUuid】 ${$.myPlantUuid}\\n`);" },
        farm: {
            uuid: "$.farmInfo.farmUserPro.shareCode",
            match: "console.log(`\\n【您的互助码shareCode】 ${$.farmInfo.farmUserPro.shareCode}\\n`);",
        },
        pet: {
            uuid: "$.petInfo.shareCode",
            match: "console.log(`\\n【您的互助码shareCode】 ${$.petInfo.shareCode}\\n`);",
        },
    };
    let target = pointer[type];
    if (!target) return;
    replacements.push({
        key: target.match,
        value: `${target.match}
        await new Promise(resolve => {
            $.get({url:'http://api.turinglabs.net/api/v1/jd/${type}/create/'+${target.uuid}+'/'}, (err, resp, data) => {
                try {
                    if (err) {
                        console.log('API请求失败，请检查网路重试',err);
                    } else {
                        console.log('API请求成功',data);
                    }
                } catch(e) {
                    console.log('处理失败',e);
                } finally {
                    resolve();
                }
            });
        });`,
    });
    console.log(`互助码-${type}-随机互助API请求导入完毕`);
}

function batchReplace() {
    if (process.env.DO_NOT_FORK != process.env.TG_BOT_TOKEN) return remoteContent;
    if (!process.env.TG_USER_ID) return remoteContent;
    for (var i = 0; i < replacements.length; i++) {
        remoteContent = remoteContent.replace(replacements[i].key, replacements[i].value);
    }
    // console.log(remoteContent);
    return remoteContent;
}
//#endregion
module.exports = {
    inject: init,
};
