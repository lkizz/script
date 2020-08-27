// version v0.0.1
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require("child_process").execSync;
const fs = require("fs");
const download = require("download");

// 公共变量
const JD_COOKIE = process.env.JD_COOKIE; //cokie,多个用&隔开即可
const SyncUrl = process.env.SYNCURL; //签到地址,方便随时变动
const PUSH_KEY = process.env.PUSH_KEY; //推送消息地址
let CookieJDs = [];

async function downFile() {
    await download(SyncUrl, "./", { filename: "temp.js" });
}
async function downNotifyFile() {
    await download("https://github.com/lxk0301/scripts/raw/master/sendNotify.js", "./", { filename: "sendNotify.js" });
}

async function changeFiele() {
    let content = await fs.readFileSync("./temp.js", "utf8");
    content = content.replace("require('./jdCookie.js')", JSON.stringify(CookieJDs));
    if (!PUSH_KEY) {
        content = content.replace("require('./sendNotify')", "''");
    }
    await fs.writeFileSync("./lxk0301.js", content, "utf8");
}

async function start() {
    if (!JD_COOKIE) {
        console.log("请填写 JD_COOKIE 后在继续");
        return;
    }
    if (!SyncUrl) {
        console.log("请填写 SYNCURL 后在继续");
        return;
    }
    CookieJDs = JD_COOKIE.split("&");
    console.log(`当前共${CookieJDs.length}个账号需要签到`);
    // 下载最新代码
    await downFile();
    console.log("下载代码完毕");
    if (PUSH_KEY) {
        await downNotifyFile();
        console.log("下载通知代码完毕");
    } else {
        console.log("无PUSH_KEY,不发送微信通知");
    }
    await changeFiele();
    console.log("替换变量完毕");
    await exec("node lxk0301.js", { stdio: "inherit" });
    console.log("执行完毕");
}

start();
