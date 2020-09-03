function replaceWithSecrets(content, Secrets) {
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
    if (!Secrets.PUSH_KEY && !Secrets.BARK_PUSH && content.indexOf("require('./sendNotify')") > 0) {
        replacements.push({ key: "require('./sendNotify')", value: "" });
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
    return batchReplace(content, replacements);
}
function batchReplace(content, replacements) {
    for (var i = 0; i < replacements.length; i++) {
        content = content.replace(replacements[i].key, replacements[i].value);
    }
    return content;
}

module.exports = {
    replaceWithSecrets,
};
