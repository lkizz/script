/*
远程触发GithubActions

可以将Secrets配置到一个地方，然后随时触发私有仓库，因为私有仓库只有2000分钟的时间，所以超时之后，重新修改GITHUBUSER指向，就可以继续运行了
无需每个地方都配置Secrets，如果被触发的分支本身有Secrets，会自动使用被触发分支的

这个东西其实没啥用，纯好玩
*/

/*
github actions, repository_dispatch with client_payload

https://docs.github.com/cn/free-pro-team@latest/rest/reference/repos#create-a-repository-dispatch-event
curl -H "Authorization: token :token" \
    -H 'Accept: application/vnd.github.everest-preview+json' \
    "https://api.github.com/repos/:user/:repo/dispatches" \
    -d '{"event_type": "awesomeness", "client_payload": {"foo": "bar"}}'


in yaml https://docs.github.com/cn/free-pro-team@latest/actions/reference/events-that-trigger-workflows#%E6%89%8B%E5%8A%A8%E4%BA%8B%E4%BB%B6

name: example-client-payload-action
on: repository_dispatch
jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - run: 'echo "field: ${{ github.event.client_payload.foo }}"'
      - run: 'echo "payload: ${{ toJson(github.event.client_payload) }}"'
      - run: echo baz
        if: github.event.action == 'baz'

for env https://docs.github.com/cn/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions
*/

let ACTIONS_TRIGGER_TOKEN = process.env.ACTIONS_TRIGGER_TOKEN; //Personal access tokens，申请教程:https://www.jianshu.com/p/bb82b3ad1d11 记得勾选repo权限就行
let TRIGGER_KEYWORDS = process.env.TRIGGER_KEYWORDS; //.github/workflows/路径里面yml文件里面repository_dispatch项目的types值，例如jd_fruit.yml里面的值为fruit
let GITHUBUSER = process.env.GITHUBUSER; //github用户名，例:lxk0301
let REPO = process.env.REPO; //需要触发的 Github Action 所在的仓库名称 例:scripts
let SYSTEM_ENV = [
    //本身所需要的环境变量
    "ACTIONS_TRIGGER_TOKEN",
    "TRIGGER_KEYWORDS",
    "GITHUBUSER",
    "REPO",
    //系统环境变量
    "_",
    "LEIN_HOME",
    "M2_HOME",
    "ANDROID_HOME",
    "JAVA_HOME_11_X64",
    "ImageVersion",
    "AGENT_TOOLSDIRECTORY",
    "LANG",
    "AZURE_EXTENSION_DIR",
    "POWERSHELL_DISTRIBUTION_CHANNEL",
    "GITHUB_API_URL",
    "INVOCATION_ID",
    "BOOST_ROOT_1_72_0",
    "JAVA_HOME_12_X64",
    "ANDROID_SDK_ROOT",
    "RUNNER_TOOL_CACHE",
    "SWIFT_PATH",
    "JAVA_HOME",
    "RUNNER_TRACKING_ID",
    "DOTNET_MULTILEVEL_LOOKUP",
    "GITHUB_REPOSITORY_OWNER",
    "GITHUB_ACTIONS",
    "DOTNET_SKIP_FIRST_TIME_EXPERIENCE",
    "CI",
    "DOTNET_NOLOGO",
    "USER",
    "GITHUB_HEAD_REF",
    "GITHUB_ACTOR",
    "GITHUB_ACTION_REF",
    "GITHUB_ACTION",
    "GRADLE_HOME",
    "PWD",
    "ImageOS",
    "PIPX_HOME",
    "HOME",
    "GOROOT",
    "JOURNAL_STREAM",
    "GOROOT_1_14_X64",
    "JAVA_HOME_8_X64",
    "GITHUB_ACTION_REPOSITORY",
    "RUNNER_TEMP",
    "GITHUB_RETENTION_DAYS",
    "GOROOT_1_15_X64",
    "CONDA",
    "GOROOT_1_13_X64",
    "GITHUB_ENV",
    "DEBIAN_FRONTEND",
    "RUNNER_WORKSPACE",
    "GITHUB_REF",
    "GITHUB_SHA",
    "GITHUB_RUN_ID",
    "GITHUB_SERVER_URL",
    "GECKOWEBDRIVER",
    "DEPLOYMENT_BASEPATH",
    "GITHUB_EVENT_PATH",
    "CHROMEWEBDRIVER",
    "PIPX_BIN_DIR",
    "HOMEBREW_REPOSITORY",
    "GITHUB_GRAPHQL_URL",
    "RUNNER_OS",
    "GITHUB_BASE_REF",
    "VCPKG_INSTALLATION_ROOT",
    "GITHUB_PATH",
    "GITHUB_JOB",
    "PERFLOG_LOCATION_SETTING",
    "JAVA_HOME_7_X64",
    "RUNNER_USER",
    "SHLVL",
    "HOMEBREW_PREFIX",
    "GITHUB_REPOSITORY",
    "GITHUB_EVENT_NAME",
    "LEIN_JAR",
    "GITHUB_RUN_NUMBER",
    "RUNNER_PERFLOG",
    "GITHUB_WORKFLOW",
    "ANT_HOME",
    "PATH",
    "SELENIUM_JAR_PATH",
    "GITHUB_WORKSPACE",
    "CHROME_BIN",
    "HOMEBREW_CELLAR",
];

!(async () => {
    TRIGGER_KEYWORDS = TRIGGER_KEYWORDS.split(",");
    for (let event_type of TRIGGER_KEYWORDS) {
        if (!event_type) {
            console.log(`失败`, `触发关键词未提供`);
            return;
        }
        if (!ACTIONS_TRIGGER_TOKEN) {
            console.log(`失败`, `github token未提供`);
            return;
        }
        if (!GITHUBUSER) {
            console.log(`失败`, `github 用户名未提供`);
            return;
        }
        if (!REPO) {
            console.log(`失败`, `需触发的github仓库名未提供`);
            return;
        }
        await hook(event_type);
    }
})()
    .catch((e) => {
        console.log(`❌ 失败! 原因: ${e}!`);
    })
    .finally(() => {});

function hook(event_type) {
    const options = {
        url: `https://api.github.com/repos/${GITHUBUSER}/${REPO}/dispatches`,
        body: `${JSON.stringify({ event_type: event_type, client_payload: collectEnv() })}`,
        headers: {
            Accept: "application/vnd.github.everest-preview+json",
            Authorization: `token ${ACTIONS_TRIGGER_TOKEN}`,
        },
    };
    return new Promise((resolve) => {
        const { url, ..._opts } = options;
        require("got")
            .post(url, _opts)
            .then(
                (resp) => {
                    console.log(`触发[${event_type}]成功`);
                },
                (err) => {
                    const { message: error, response: resp } = err;
                    var data = resp && resp.body;
                    if (data && data.match("404")) {
                        console.log(`触发[${event_type}]失败,请仔细检查提供的参数`);
                    } else if (data && data.match("401")) {
                        console.log(`触发[${event_type}]失败,github token权限不足`);
                    } else {
                        console.log("失败", `${JSON.stringify(error)}`);
                    }
                }
            );
    });
}
/** 收集除了系统环境变量以外的自定义环境变量
 * @remarks 通过client_payload将变量传递到接收方,接收方可以直接读取
 */
function collectEnv() {
    var keys = Object.keys(process.env);
    var your_env = {};
    for (var index = 0; index < keys.length; index++) {
        var key = keys[index];
        if (!key || SYSTEM_ENV.indexOf(key) >= 0) continue;
        your_env[key] = process.env[key];
    }
    console.log("collectEnv", your_env);
    return your_env;
}
