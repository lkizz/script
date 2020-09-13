![sazs34’s github stats](https://github-readme-stats.vercel.app/api?username=sazs34&show_icons=true&theme=merko)

# MyActions
自己用来签到的东东,不支持售后

目前[@lxk0301](https://github.com/lxk0301) 的代码都支持无限账号了，各位可以直接使用那边的了呢

更新时间:2020-9-13 10:57:30

> 兼容最新的代码

##
目前已支持[@NobyDa](https://github.com/NobyDa) 以及[@lxk0301](https://github.com/lxk0301) 中京东签到的内容,优点是支持无限数量的京东cookie

## 使用教程

1. 直接fork走
2. 再在`Settings`-`Secrets`里面添加`JD_COOKIE`
3. 多条cookie用`&`隔开，支持无数条cookie

上面三步搞定后就不用管了

刚fork完可能在Actions中看不到对应的workflow

目前已配置好自动执行时间，到了指定时间会执行，并且看到workflow

### Secrets全集合

#### `JD_COOKIE`

> 【必须】京东Cookie，必须有这个，否则全部不执行

多个账号间用&隔开，支持无数个账号签到

#### `PUSH_KEY` 

> 【可选】[server酱的微信通知](http://sc.ftqq.com/3.version)服务

用于推送Cookie失效通知，同时用于推送京东农场兑换礼物通知等

#### `BARK_PUSH`

> 【可选】BARK这个手机APP的推送 https://t.me/jdfruit/80

在settings->secrets->new secret里面Name填写BARK_PUSH，Value填写app提供的token

(注：此token是https://api.day.app/后面的内容)

#### `FruitShareCodes` 

> 【可选】京东农场分享码

```javascript
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间按Cookie隔开方法,即用&符号隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3@6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6&6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6
```

#### `PETSHARECODES`

> 【可选】京东萌宠分享码

```javascript
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间按Cookie隔开方法,即用&符号隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3@6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6&6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6
```

#### `JDMarketCoinToBeans`

> 【可选】京小超蓝币换京东个数,请填入纯数字,并且在0~20之间

如果值超出范围会直接使用0,不用担心脚本无法正常执行

#### `JDJoyFeedCount`

> 【可选】宠汪汪喂食数量，请填写[10,20,40,80]其中任意一个

如果值超出范围会直接使用10,不用担心脚本无法正常执行

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

### fork后如何同步代码

参考

http://www.ibloger.net/article/3361.html

