const exec = require("child_process").execSync;
const fs = require("fs");
const download = require("download");
// const { parse } = require("path");

// 公共变量
const Secrets = {
    JD_COOKIE: process.env.JD_COOKIE, //cokie,多个用&隔开即可
    SyncUrl: process.env.SYNCURL, //签到地址,方便随时变动
    PUSH_KEY: process.env.PUSH_KEY, //server酱推送消息
    BARK_PUSH: process.env.BARK_PUSH, //Bark推送
    MarketCoinToBeanCount: process.env.JDMarketCoinToBeans, //京小超蓝币兑换京豆数量
    JoyFeedCount: process.env.JDJoyFeedCount, //宠汪汪喂食数量
    FruitShareCodes: process.env.FruitShareCodes, //京东农场分享码
};
let CookieJDs = [];

async function downFile() {
    await download(Secrets.SyncUrl, "./", { filename: "temp.js" });
    console.log("下载代码完毕");
    if (Secrets.PUSH_KEY || Secrets.BARK_PUSH) {
        await download("https://github.com/lxk0301/scripts/raw/master/sendNotify.js", "./", {
            filename: "sendNotify.js",
        });
        console.log("下载通知代码完毕");
    }
    if (Secrets.FruitShareCodes) {
        await download("https://github.com/lxk0301/scripts/raw/master/jdFruitShareCodes.js", "./", {
            filename: "jdFruitShareCodes.js",
        });
        console.log("下载农场分享码代码完毕");
    }
}

async function changeFiele() {
    let content = await fs.readFileSync("./temp.js", "utf8");

    content = content.replace("require('./jdCookie.js')", JSON.stringify(CookieJDs));

    if (!Secrets.PUSH_KEY && !Secrets.BARK_PUSH) content = content.replace("require('./sendNotify')", "''");

    if (
        Secrets.MarketCoinToBeanCount &&
        !isNaN(Secrets.MarketCoinToBeanCount) &&
        parseInt(Secrets.MarketCoinToBeanCount) <= 20 &&
        parseInt(Secrets.MarketCoinToBeanCount) >= 0
    ) {
        if (content.indexOf("$.getdata('coinToBeans')") > 0) {
            console.log("蓝币兑换京豆操作已注入");
            content = content.replace("$.getdata('coinToBeans')", parseInt(Secrets.MarketCoinToBeanCount));
        }
    }

    if (
        Secrets.JoyFeedCount &&
        !isNaN(Secrets.JoyFeedCount) &&
        [10, 20, 40, 80].indexOf(parseInt(Secrets.JoyFeedCount) >= 0)
    ) {
        if (content.indexOf("$.getdata('joyFeedCount')") > 0) {
            console.log("宠汪汪喂食操作已注入");
            content = content.replace("$.getdata('joyFeedCount')", parseInt(Secrets.JoyFeedCount));
        }
    }

    await fs.writeFileSync("./lxk0301.js", content, "utf8");
    console.log("替换变量完毕");
}

async function start() {
    if (!Secrets.JD_COOKIE) {
        console.log("请填写 JD_COOKIE 后在继续");
        return;
    }
    if (!Secrets.SyncUrl) {
        console.log("请填写 SYNCURL 后在继续");
        return;
    }
    CookieJDs = Secrets.JD_COOKIE.split("&");
    console.log(`当前共${CookieJDs.length}个账号需要签到`);
    try {
        await downFile();
        await changeFiele();
        await exec("node lxk0301.js", { stdio: "inherit" });
    } catch (e) {
        console.log("执行异常:" + e);
    }
    console.log("执行完毕");
}

start();
