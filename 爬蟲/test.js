
  var r = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}) \.?/g

var urls = html.match(r)
console.log('urls=', urls)

while (true) {
  let m = r.exec(html)
  if (m == null) break
  console.log(m)
}
  var urlList = [
    'https://www.itread01.com/content/1549194305.html', 
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css" rel="stylesheet',
    'https://www.itread01.com/" rel="nofollow',
    'https://www.itread01.com/" rel="home" ><img src="https://www.itread01.com/logo.png'  
  ]
  isURL(urlList)  