
var urlList = [
    'https://example.com', 
    'https://jsonplaceholder.typicode.com/todos/1', 
    'https://jsonplaceholder.typicode.com/todos/2', 
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5',
    'https://jsonplaceholder.typicode.com/todos/6',
    'https://jsonplaceholder.typicode.com/todos/7',
    'https://jsonplaceholder.typicode.com/todos/8',
    'https://jsonplaceholder.typicode.com/todos/9',
    'https://jsonplaceholder.typicode.com/todos/10',
    'https://jsonplaceholder.typicode.com/todos/11',
  ]
const url = new URL(urlList[1]);
var s='gfgjhjk'
console.log('https://'+url.host+s); 
console.log(typeof url.hostname)