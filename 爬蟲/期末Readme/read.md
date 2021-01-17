# 期末

## 爬蟲
* CODE
<pre><code>
var fs = require('fs');
var http = require('http');
var URI = require('URIjs');
var c = console;

var urlMap  = { };
var urlList = [ ];
var urlIdx  = 0;

urlList.push(process.argv[2]); //動手打第一個網址

crawNext(); // 開始抓

function crawNext() { // 下載下一個網頁
  if (urlIdx >= urlList.length) 
    return;
  var url = urlList[urlIdx];
  if (url.indexOf('http://')!==0) {
    urlIdx ++;
    crawNext();
    return;
  }
  c.log('url[%d]=%s', urlIdx, url);
  urlMap[url] = { downlioad:false };
  pageDownload(url, function (data) {
    var page = data.toString();
    urlMap[url].download = true;
    var filename = urlToFileName(url);
    fs.writeFile('data/'+filename, page, function(err) {
    });
    var refs = getMatches(page, /\shref\s*=\s*["'#]([^"'#]*)[#"']/gi, 1);
    for (i in refs) {
      try {
      var refUri = URI(refs[i]).absoluteTo(url).toString();
      c.log('ref=%s', refUri);
      if (refUri !== undefined && urlMap[refUri] === undefined)
        urlList.push(refUri);
      } catch (e) {}
    }
    urlIdx ++;
    var file = "./test.db";

//載入 sqlite3
var sqlite3 = require("sqlite3").verbose();
//new 一個 sqlite 的 database，檔案是 test.db
var db = new sqlite3.Database(file);

db.serialize(function() {
  //db.run 如果 Staff 資料表不存在，那就建立 Staff 資料表
  db.run("CREATE TABLE IF NOT EXISTS  Stuff (thing TEXT)");
  var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
  
  //寫進10筆資料

  stmt.run(url);
  

  stmt.finalize();

  
});

db.close();
    crawNext();
  });
}
// 下載一個網頁
function pageDownload(url, callback) {
  http.get(url, function(res) {
    res.on('data', callback);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
// 取得正規表達式比對到的結果成為一個陣列
function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}
// 將網址改寫為合法的檔案名稱
function urlToFileName(url) {
  return url.replace(/[^\w]/gi, '_');
}


</code></pre>
## 專題講解
* 先對html有初步了解，爬蟲是一種程式用來爬取所想要的資料並將其存於電腦中
* 只要硬體資料量夠大便可以容納數萬個個網址
* 應用SQL將資料儲存於電腦中而不會消失
* 目前只能抓取http開頭的資料，期望以後再做延伸
* 使用URL.js函式庫:
  * 先下載URL函式庫 指令:npm install URIjs
  * 找出相對路徑和絕對路徑的差別，再將其組合成一個完整路徑

## 參考程式碼
<a href='https://gitlab.com/ccckmit/course/-/wikis/%E9%99%B3%E9%8D%BE%E8%AA%A0/%E6%9B%B8%E7%B1%8D/%E7%B6%B2%E7%AB%99%E8%A8%AD%E8%A8%88/httpCrawler'>參考老師的程式碼</a>
<a href='https://riptutorial.com/zh-TW/node-js/example/30413/%E9%80%9A%E9%81%8Esql%E9%80%A3%E6%8E%A5--mssql-npm%E6%A8%A1%E5%A1%8A'>資料庫應用</a>
<a href='https://yiyingloveart.blogspot.com/2013/11/nodejs-sqlite3.html'>Node.js+SQlite串聯</a>

## 函式庫網址
<https://github.com/brian891005/ws109a/blob/master/%E7%88%AC%E8%9F%B2/test.db>


