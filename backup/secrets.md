### Secrets 全集合

#### 京东专用

| Name | 归属 | 属性 | 说明 |
| --- | :-: | --- | --- |
| `JD_COOKIE` | 京东 | 必须 | 京东 cookie,具体获取参考[lxk0301 的获取教程](https://github.com/lxk0301/jd_scripts/blob/master/githubAction.md#%E4%BA%AC%E4%B8%9Ccookie) |
| `JD_BEAN_STOP` | 京东 | 非必须 | 自定义延迟签到,单位毫秒. 默认分批并发无延迟. 延迟作用于每个签到接口, 如填入延迟则切换顺序签到(耗时较长),如需填写建议输入数字 1 |
| `JD_DEBUG` | 脚本打印 log | 非必须 | 运行脚本时，是否显示 log,默认显示。改成 false 表示不显示，注重隐私的人可以在设置 secret -> `Name:JD_DEBUG,Value:false` |

##### 互助码系列

| Name | 归属 | 属性 | 说明 |
| --- | :-: | --- | --- |
| `FruitShareCodes` | 东东农场互助码 | 非必须 | 填写规则请看 [jdFruitShareCodes.js](https://github.com/lxk0301/jd_scripts/blob/master/jdFruitShareCodes.js) 里面的说明 |
| `PETSHARECODES` | 东东萌宠互助码 | 非必须 | 填写规则请看 [jdPetShareCodes.js](https://github.com/lxk0301/jd_scripts/blob/master/jdPetShareCodes.js) 里面的说明 |
| `PLANT_BEAN_SHARECODES` | 种豆得豆互助码 | 非必须 | 填写规则请看 [jdPlantBeanShareCodes.js](https://github.com/lxk0301/jd_scripts/blob/master/jdPlantBeanShareCodes.js) 里面的说明 |
| `SUPERMARKET_SHARECODES` | 京小超商圈互助码 | 非必须 | 填写规则请看 [jdSuperMarketShareCodes.js](https://github.com/lxk0301/jd_scripts/blob/master/jdSuperMarketShareCodes.js) 或见下方`互助码的填写规则` |

##### 其它控制

| Name | 归属 | 属性 | 说明 |
| --- | :-: | --- | --- |
| `JOY_FEED_COUNT` | 宠汪汪喂食数量 | 非必须 | 控制 jd_joy_feedPets.js 脚本喂食数量 ,可以填的数字 10,20,40,80 , 其他数字不可. |
| `JOY_HELP_FEED` | 宠汪汪帮好友喂食 | 非必须 | 控制 jd_joy_steal.js 脚本是否给好友喂食,`false`为否,`true`为是(给好友喂食) |
| `JOY_RUN_FLAG` | 宠汪汪参加双人赛跑 | 非必须 | 控制 jd_joy.js 脚本是否参加双人赛跑,`false`为否,`true`为是，脚本默认是`true` |
| `MARKET_COIN_TO_BEANS` | 京小超兑换京豆数量 | 非必须 | 控制 jd_blueCoin.js 兑换京豆数量,可输入值为 1 到 20 或者 1000 的数字，其他数字不可. |
| `SUPERMARKET_UPGRADE` | 京小超自动升级 | 非必须 | 自动升级,顺序:解锁升级商品、升级货架,`true`表示自动升级,`false`表示关闭自动升级 |
| `BUSINESS_CIRCLE_JUMP` | 京小超自动更换商圈 | 非必须 | 小于对方 300 热力值自动更换商圈队伍,`true`表示运行,`false`表示禁止 |
| `SUPERMARKET_LOTTERY` | 京小超抽奖 | 非必须 | 每天运行脚本是否使用金币去抽奖,`true`表示抽奖,`false`表示不抽奖 |
| `FRUIT_BEAN_CARD` | 农场使用水滴换豆卡 | 非必须 | 农场使用水滴换豆卡(如果出现限时活动时 100g 水换 20 豆,此时比浇水划算,推荐换豆),`true`表示换豆(不浇水),`false`表示不换豆(继续浇水),脚本默认是浇水 |
| `UNSUBSCRIBE` | 取消关注 | 非必须 | 共四个参数,换行隔开. 四个参数分别表示`取关商品数量`,`取关店铺数量`,`遇到此商品不再进行取关`, `遇到此店铺不再进行取关`，[具体使用往下看](#取关店铺secret的说明) |

#### 推送通知专用

| Name | 归属 | 属性 | 说明 |
| --- | :-: | --- | --- |
| `PUSH_KEY` | 推送 | 非必须 | cookie 失效推送[server 酱的微信通知](http://sc.ftqq.com/3.version) |
| `BARK_PUSH` | 推送 | 非必须 | cookie 失效推送 BARK 这个 APP,此 token 是https://api.day.app/后面的内容 |
| `BARK_SOUND` | 推送 | 非必须 | bark 推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
| `TG_BOT_TOKEN` | 推送 | 非必须 | tg 推送,填写自己申请[@BotFather](https://t.me/BotFather)的 Token,如`10xxx4:AAFcqxxxxgER5uw` |
| `TG_USER_ID` | 推送 | 非必须 | tg 推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字 ID，[关于 TG 推送的说明](#关于TG推送的说明) |
| `DD_BOT_TOKEN` | 钉钉推送 | 非必须 | 钉钉推送[官方文档](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq) ,只需`https://oapi.dingtalk.com/robot/send?access_token=XXX` 等于符号后面的 XXX， 注：如果钉钉推送只填写`DD_BOT_TOKEN`，那么安全设置需勾选`自定义关键词`，内容输入输入`账号`即可，其他安全设置不要勾选 |
| `DD_BOT_SECRET` | 钉钉推送 | 非必须 | 密钥，机器人安全设置页面，加签一栏下面显示的 SEC 开头的字符串,填写了`DD_BOT_TOKEN`和`DD_BOT_SECRET`，钉钉机器人安全设置只需勾选`加签`即可，其他选项不要勾选 |
| `PET_NOTIFY_CONTROL` | 东东萌宠推送开关 | 非必须 | 控制京东萌宠是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `FRUIT_NOTIFY_CONTROL` | 东东农场推送开关 | 非必须 | 控制京东农场是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `JD_JOY_REWARD_NOTIFY` | 宠汪汪兑换京豆推送开关 | 非必须 | 控制 jd_joy_reward.js 脚本是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `MARKET_REWARD_NOTIFY` | 京小超兑换奖品推送开关 | 非必须 | 控制 jd_blueCoin.js 兑换奖品成功后是否静默运行, `false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |

#### 喜马拉雅专用

| Name | 归属 | 属性 | 说明 |
| --- | :-: | --- | --- |
| `XMLY_SPEED_COOKIE` | 喜马拉雅 | 非必须 | [Cookie 获取请参考](https://github.com/Zero-S1/xmly_speed/blob/master/xmly_speed.md),仅支持 git actions 执行,多个 Cookie 用换行即可 |
| `XMLY_ANDROID_AGENT` | 喜马拉雅 | 非必须 | 仅安卓用的 Agent 配置，不填的话也会默认用红米 8 的 |
| `XMLY_ACCUMULATE_TIME` | 喜马拉雅 | 非必须 | 需要刷时长任务的话，填入`zero_s1`；可能会黑号，请知悉 |
| `XMLY_ACCUMULATE_INDEX` | 喜马拉雅 | 非必须 | 需配合`XMLY_ACCUMULATE_TIME`使用，用于限定某个索引的账号不进行刷时长 |
| `XMLY_ACCUMULATE_HOURS` | 喜马拉雅 | 非必须 | 需配合`XMLY_ACCUMULATE_TIME`使用，用于限定每天收听的小时数,尽量避免黑号 |

##### 关于`XMLY_ACCUMULATE_INDEX`

> 用于指定哪几个账号不执行时长任务

比如我有 5 个账号，我第 1 个和第 5 个不想执行刷时长任务，则填入内容为`1,5` 例如我只有两个号，第 2 个号不想执行刷时长，则直接填入`2`即可

##### 关于`XMLY_ACCUMULATE_HOURS`

> 用于指定时长任务最大时间，防止现在时长任务直接是 24 小时的，过于容易发生黑号情况

传入`1`~`24`之间的数字即可

#### 取关店铺参数的说明

> 格式为`取关商品数`,`取关店铺数`,`遇到此商品不再进行取关`,`遇到此店铺不再进行取关`

```javascript
// 例如我要取关10个商品，20个店铺，商品遇到商品关键字apple停止取关，店铺遇到apple不再取关
// 则填入的内容是10,20,apple,apple

//再例如我什么都不管，商品和店铺我都取关50个
// 则填入的内容为50,50,,

// 即 哪怕不填关键字，也要用英文逗号隔开
```

#### 关于 TG 推送的说明

> 需要`TG_BOT_TOKEN`和`TG_USER_ID`一起使用，前者用于调用 bot，后者用于指定推送目标

私聊[@getuseridbot](https://t.me/getuseridbot)，点击 start 以后，收到的第一条纯数字消息就是你的 userid 了

<img src="https://user-images.githubusercontent.com/6993269/93156198-3b1ad700-f73a-11ea-8f51-5ee71d06ef8a.png" alt="获取userid" style="zoom:40%;" />

私聊[@BotFather](https://t.me/BotFather)，创建自己的 bot

<img src="https://user-images.githubusercontent.com/6993269/93155923-b0d27300-f739-11ea-928a-803134f0f416.png" alt="获取bot的token" style="zoom:40%;" />
