const download = require("download");
async function replaceWithSecrets(content, Secrets) {
    if (!Secrets || !Secrets) return content;
    const replacements = [];
    //此处为字符串,说明是传入指定cookie信息了,仅替换cookie即可,其它的不需要替换
    if (typeof Secrets == "string") {
        if (content.indexOf("require('./jdCookie.js')") > 0) {
            replacements.push({ key: "require('./jdCookie.js')", value: `{CookieJD:'${Secrets}'}` });
        }
        if (content.indexOf("京东多合一签到") > 0 && content.indexOf("@NobyDa") > 0) {
            replacements.push({ key: /var Key = ''/, value: `var Key = '${Secrets}'` });
        }
        return batchReplace(content, replacements);
    }
    if (Secrets.JD_COOKIE && content.indexOf("require('./jdCookie.js')") > 0) {
        replacements.push({ key: "require('./jdCookie.js')", value: JSON.stringify(Secrets.JD_COOKIE.split("&")) });
    }
    if (!Secrets.PUSH_KEY && !Secrets.BARK_PUSH) {
        if (content.indexOf("require('./sendNotify')") > 0) {
            replacements.push({
                key: "require('./sendNotify')",
                value: "{sendNotify:function(){},BarkNotify:function(){}}",
            });
        }
    } else {
        await download_notify();
    }
    if (content.indexOf("jdFruitShareCodes") > 0) {
        await download_jdFruit();
    }
    if (content.indexOf("jdPetShareCodes") > 0) {
        await download_jdPet();
    }
    if (content.indexOf("jdPlantBeanShareCodes") > 0) {
        await download_jdPlant();
    }
    if (Secrets.MarketCoinToBeanCount && !isNaN(Secrets.MarketCoinToBeanCount)) {
        let coinToBeanCount = parseInt(Secrets.MarketCoinToBeanCount);
        if (coinToBeanCount >= 0 && coinToBeanCount <= 20 && content.indexOf("$.getdata('coinToBeans')") > 0) {
            console.log("蓝币兑换京豆操作已注入");
            replacements.push({ key: "$.getdata('coinToBeans')", value: coinToBeanCount });
        }
    }
    if (Secrets.JoyFeedCount && !isNaN(Secrets.JoyFeedCount)) {
        let feedCount = parseInt(Secrets.JoyFeedCount);
        if ([10, 20, 40, 80].indexOf(feedCount) >= 0 && content.indexOf("$.getdata('joyFeedCount')") > 0) {
            console.log("宠汪汪喂食操作已注入");
            replacements.push({ key: "$.getdata('joyFeedCount')", value: feedCount });
        }
    }
    if (Secrets.Unsubscribe) {
        if (Secrets.Unsubscribe.split(",").length != 4) {
            console.log("取关参数不正确，请参考readme中的提示填入，记得用英文逗号,隔开");
        } else {
            let usinfo = Secrets.Unsubscribe.split(",");
            replacements.push({ key: "$.getdata('jdUnsubscribePageSize')", value: isNaN(usinfo[0]) ? 0 : usinfo[0] });
            replacements.push({
                key: "$.getdata('jdUnsubscribeShopPageSize')",
                value: isNaN(usinfo[1]) ? 50 : usinfo[1],
            });
            replacements.push({ key: "$.getdata('jdUnsubscribeStopGoods')", value: `'${usinfo[2]}'` });
            replacements.push({ key: "$.getdata('jdUnsubscribeStopShop')", value: `'${usinfo[3]}'` });
        }
    }
    return batchReplace(content, replacements);
}
function batchReplace(content, replacements) {
    for (var i = 0; i < replacements.length; i++) {
        content = content.replace(replacements[i].key, replacements[i].value);
    }
    return content;
}

async function download_notify() {
    await download("https://github.com/lxk0301/scripts/raw/master/sendNotify.js", "./", {
        filename: "sendNotify.js",
    });
    console.log("下载通知代码完毕");
}

async function download_jdFruit(content) {
    await download("https://github.com/lxk0301/scripts/raw/master/jdFruitShareCodes.js", "./", {
        filename: "jdFruitShareCodes.js",
    });
    console.log("下载农场分享码代码完毕");
}

async function download_jdPet(content) {
    await download("https://raw.githubusercontent.com/lxk0301/scripts/master/jdPetShareCodes.js", "./", {
        filename: "jdPetShareCodes.js",
    });
    console.log("下载萌宠分享码代码完毕");
}

async function download_jdPlant(content) {
    await download("https://raw.githubusercontent.com/lxk0301/scripts/master/jdPlantBeanShareCodes.js", "./", {
        filename: "jdPlantBeanShareCodes.js",
    });
    console.log("下载种豆得豆分享码代码完毕");
}

module.exports = {
    replaceWithSecrets,
};
