# HOMEWORK WEEK13

## 爬蟲
* CODE
<pre><code>
async function getPage(url) {
    const res = await fetch(url);
    return await res.text();
  }
  
  function html2urls(html) {
    var r = /\shref\s*=\s*['"](.*)['"]/g
    var urls = []
    while (true) {
      let m = r.exec(html)
      if (m == null) break
      urls.push(m[1])
    }
    return urls
  }
  
  async function craw(urlList) {
    var k=0 //網頁抓到的子網頁
    var number=[]
    var m=0 //第幾個子網頁的網址
    var root1=[]
    var j=0
    for (let i=0; i<=urlList.length; i++) {
      var url = urlList[i]
      var x=0 //flag是否抓到重複網址
      console.log('第'+(m+1)+'子網頁')
      console.log('剩餘子網頁網址數',number[m])
      if (!url.startsWith('http')){
          const urlhost=new URL(root1[m])
          url='https://'+urlhost.hostname+url
        }
      number[m]=number[m]-1 //如果抓到子網頁網址不是https開頭，則子網頁網址數量減一
      if(number[m]==0) //如果網頁抓到的子網頁已歸零則換主網頁所抓到的下一個子網頁
      {
          m=m+1
          k=0
      }
      for(let l=0;l<=i-1;l++) //查詢是否有一樣網址在urlList內
      {
          if(url==urlList[l])
          {
              x=1
              break
          }
          
      }
      if(x==1)continue
        console.log(url, 'download')
      try {
        var page = await getPage(url)

        await Deno.writeTextFile(`data/${i}.txt`, page)
        var urls = html2urls(page)
        if(urls.length>){
            root1[m]=url
        }
        for (url of urls) {
          urlList.push(url)
          k++
        }
        if(urls.length>1){
            number[j]=k
            j++
            k=0
        }
      } catch (error) {
        console.log('error=', error)
      }
    }
  }
  
  var urlList = [
    'https://www.itread01.com/content/1549194305.html', 
  ]
  
  await craw(urlList)
  
</code></pre>
## 步驟講解
* 了解網路爬蟲的定義:
先對html有初步了解，爬蟲是一種程式用來爬取所想要的資料並將其存於電腦中

* 使用正規表達式
  * fetch
  * match
  * exec

* 了解網址各位置所代表的含意
  * port
  * pathname
  * protocol
![PICTURE1](https://github.com/brian891005/ws109a/tree/master/%E7%88%AC%E8%9F%B2/04.jpg)

* 使用URL函式庫:
找出相對路徑和絕對路徑的差別，再將其組合成一個完整路徑

## 參考程式碼
<https://gitlab.com/ccc109/ws/-/blob/master/deno/02-http/07-crawler2/crawler.js>
