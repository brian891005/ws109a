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
    for (let i=0; i<urlList.length; i++) {
      var url = urlList[i]
      var x=0 //flag是否抓到重複網址
      console.log(m)
      console.log(number[m])
      if (!url.startsWith('http')){
          const urlhost=new URL(root1[m])
          url='https://'+urlhost.hostname+url
          number[m]=number[m]-1
          if(number[m]==0)
          {
              m=m+1
              k=0
          }
        }
      for(let l=0;l<i-1;l++)
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
        if(urls.length>1){
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
  