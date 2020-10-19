import requests
import os
import re

def loadFileContent(downloadUrl) :
    return requests.get(downloadUrl).text

def writeFile(content,fileName):
    file = './'+fileName
    with open(file, 'w', encoding='utf-8') as f: f.write(content.replace('\r\n','\n'))

def run():
    print("\n同步文件中...")
    webFileContent = loadFileContent(os.environ["SYNCURL"])
    print("\n文件同步完毕, 处理中...")
    xmly_speed_cookie = os.environ["XMLY_SPEED_COOKIE"]
    xmly_accumulate_index=[]
    if not os.environ["XMLY_ACCUMULATE_INDEX"].strip()=='':
       xmly_accumulate_index = [int(i) for i in os.environ["XMLY_ACCUMULATE_INDEX"].split(",")]
    if len(xmly_speed_cookie)==0 or xmly_speed_cookie.strip()=='':
        print("无法获取Cookie,请在Secrets中配置XMLY_SPEED_COOKIE")
        return
    agentPattern = re.compile(r'UserAgent = \"[\d\D]*?\"',re.S)
    for idx,xmlyCookie in enumerate(xmly_speed_cookie.split('\n')):
        executeContent = webFileContent.replace('xmly_speed_cookie = os.environ["XMLY_SPEED_COOKIE"]','xmly_speed_cookie = "' + xmlyCookie + '"',1)
        if xmlyCookie.find("_device=android") > 0:#此时表示是获取的安卓的cookie,需要使用安卓的agent
            rewriteAgent = os.environ["XMLY_ANDROID_AGENT"]
            if len(rewriteAgent) ==0 or rewriteAgent.strip()=='':
                rewriteAgent='UserAgent = "ting_1.8.30(Redmi+7,Android28)"'
                executeContent = re.sub(agentPattern,rewriteAgent,executeContent)
        if len(xmly_accumulate_index)>0:
            index = -1
            try:
                index = xmly_accumulate_index.index(idx)
            except ValueError:
                print("无需禁用")
            if index>=0:
                executeContent = executeContent.replace("XMLY_ACCUMULATE_TIME = 1","XMLY_ACCUMULATE_TIME = 0",1).replace("action 自动刷时长打开","action 自动刷时长被指定关闭",1)
                print("已接受XMLY_ACCUMULATE_INDEX配置,为索引"+str(idx)+"的数据执行了禁用刷新时长的操作")
        writeFile(executeContent,'execute'+str(idx)+'.py')
        os.system('python ./'+'execute'+str(idx)+'.py')
    print("\n***************************\n文件全部执行完毕")
    exit(0) 

run()