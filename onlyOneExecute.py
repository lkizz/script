import requests
import os

def loadFileContent(downloadUrl) :
    return requests.get(downloadUrl).text

def writeFile(content):
    file = './execute.py'
    # print(content)
    with open(file, 'w', encoding='utf-8') as f: f.write(content.replace('\r\n','\n'))


writeFile(loadFileContent(os.environ["SYNCURL"]))
os.system('python ./execute.py')
