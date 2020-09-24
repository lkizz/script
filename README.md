![sazs34’s github stats](https://github-readme-stats.vercel.app/api?username=sazs34&show_icons=true&theme=vue)

# MyActions

### 本项目已可以实现自动同步上游更改！[具体点击](#自动同步)

目前[@lxk0301](https://github.com/lxk0301) 的代码都支持无限账号了，各位可以直接使用那边的了呢

> 更新时间:2020-9-22 10:05:30
>
> **添加京东手机狂欢城签到**
>
> 添加自动同步上游代码
>
> 支持京东多合一签到通知 + TG-Bot通知
>
> 支持京东取关店铺和商品自定义参数

支持手动执行，具体在Actions中选中要执行的Workflows后再在右侧可以看到Run workflow，点击即可运行此workflow。

嫌上一步麻烦的，也可以直接点击一下star，你会发现所有的workflow都已执行。

目前已支持[@NobyDa](https://github.com/NobyDa) 以及[@lxk0301](https://github.com/lxk0301) 中京东签到的内容,优点是支持无限数量的京东cookie

## 使用教程

1. 直接fork走
2. 再在`Settings`-`Secrets`里面添加`JD_COOKIE`
3. 多条cookie用`&`隔开，支持无数条cookie

刚fork完可能在Actions中看不到对应的workflow

目前**已配置好自动执行时间**，到了指定时间会执行并且看到workflow

### Secrets全集合

| Name                    |   归属   | 属性   | 说明                                                         |
| ----------------------- | :------: | ------ | ------------------------------------------------------------ |
| `JD_COOKIE`             |   京东   | 必须   | 京东cookie,具体获取参考[lxk0301的获取教程](https://github.com/lxk0301/scripts/issues/8#issuecomment-675837338)或[点击直达](#Cookie获取和配置) |
| `PUSH_KEY`              |   推送   | 非必须 | cookie失效推送[server酱的微信通知](http://sc.ftqq.com/3.version) |
| `BARK_PUSH`             |   推送   | 非必须 | cookie失效推送BARK这个APP,此token是https://api.day.app/后面的内容 |
| `BARK_SOUND`            |   推送   | 非必须 | bark推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
| `TG_BOT_TOKEN`          |   推送   | 非必须 | tg推送,填写自己申请[@BotFather](https://t.me/BotFather)的Token,如`10xxx4:AAFcqxxxxgER5uw` |
| `TG_USER_ID`            |   推送   | 非必须 | tg推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字ID |
| `PET_NOTIFY_CONTROL`    | 推送开关 | 非必须 | 控制京东萌宠是否通知,`false`为通知,`true`不通知              |
| `FRUIT_NOTIFY_CONTROL`  | 推送开关 | 非必须 | 控制京东农场是否通知,`false`为通知,`true`不通知              |
| `FruitShareCodes`       |  分享码  | 非必须 | 京东农场                                                     |
| `PETSHARECODES`         |  分享码  | 非必须 | 京东萌宠                                                     |
| `PLANT_BEAN_SHARECODES` |  分享码  | 非必须 | 种豆得豆                                                     |
| `JDMarketCoinToBeans`   |   兑换   | 非必须 | 京小超蓝币兑换京豆，默认0，请填入纯数字,并且在0~20之间       |
| `JDJoyFeedCount`        |   喂食   | 非必须 | 宠汪汪喂食数量，默认10，请填写[10,20,40,80]其中任意一个      |
| `UNSUBSCRIBE`           |   取关   | 非必须 | 京东取关店铺和商品，[具体使用往下看](#取关店铺参数的说明)    |

#### 关于分享码的说明:

```javascript
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间按Cookie隔开方法,即用&符号隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3@6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6&6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6
```

#### 取关店铺参数的说明

> 格式为`取关商品数`,`取关店铺数`,`遇到此商品不再进行取关`,`遇到此店铺不再进行取关`

```javascript
// 例如我要取关10个商品，20个店铺，商品遇到商品关键字apple停止取关，店铺遇到apple不再取关
// 则填入的内容是10,20,apple,apple

//再例如我什么都不管，商品和店铺我都取关50个
// 则填入的内容为50,50,,

// 即 哪怕不填关键字，也要用英文逗号隔开
```

#### 关于TG推送的说明

> 需要`TG_BOT_TOKEN`和`TG_USER_ID`一起使用，前者用于调用bot，后者用于指定推送目标

私聊[@getuseridbot](https://t.me/getuseridbot)，点击start以后，收到的第一条纯数字消息就是你的userid了

<img src="https://user-images.githubusercontent.com/6993269/93156198-3b1ad700-f73a-11ea-8f51-5ee71d06ef8a.png" alt="获取userid" style="zoom:40%;" />

私聊[@BotFather](https://t.me/BotFather)，创建自己的bot

<img src="https://user-images.githubusercontent.com/6993269/93155923-b0d27300-f739-11ea-928a-803134f0f416.png" alt="获取bot的token" style="zoom:40%;" />



### Cookie获取和配置

> 具体如何取cookie如何配置,可参考 https://github.com/lxk0301/scripts/issues/8#issuecomment-675837338

```

针对京东cookie我们只需要
pt_key=****;
和
pt_pin=***;
的部分

我有两个京东账号,则我JD_COOKIE里面要填写的内容为
pt_key=****;pt_pin=***;&pt_key=****;pt_pin=***;
```

### 同步Fork后的代码

#### 手动同步

[手动同步 http://www.ibloger.net/article/3361.html](http://www.ibloger.net/article/3361.html)

#### 自动同步

##### 方案A - 强制远程分支覆盖自己的分支
1. 参考[这里](http://note.youdao.com/noteshare?id=6cd72de428957d593c129749194b4352)，安装[pull插件](https://github.com/apps/pull)，并确认此项目已在pull插件的作用下（参考文中1-d）。
2. 确保.github/pull.yml文件正常存在，yml内上游作者填写正确(此项目已填好，无需更改)。
3. 确保pull.yml里面是`mergeMethod: hardreset`(默认就是hardreset)。
4. ENJOY!上游更改三小时左右就会自动发起同步。

##### 方案B - 保留自己分支的修改

> 上游变动后pull插件会自动发起pr，但如果有冲突需要自行**手动**确认。
> 如果上游更新涉及workflow里的文件内容改动，需要自行**手动**确认。

1. 参考[这里](http://note.youdao.com/noteshare?id=6cd72de428957d593c129749194b4352)，安装[pull插件](https://github.com/apps/pull)，并确认此项目已在pull插件的作用下（参考文中1-d）。
2. 确保.github/pull.yml文件正常存在，yml内上游作者填写正确(此项目已填好，无需更改)。
3. 将pull.yml里面的`mergeMethod: hardreset`修改为`mergeMethod: merge`保存。
4. ENJOY!上游更改三小时左右就会自动发起同步。
