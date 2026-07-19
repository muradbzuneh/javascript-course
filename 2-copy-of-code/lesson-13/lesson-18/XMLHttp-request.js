
/* get the data from the backend using XMLHttpRequest
const xhr = new XMLHttpRequest()
xhr.addEventListener('load', ()=> {
  console.log(xhr.response)
})
xhr.addEventListener('error', (error)=>{
  console.log(`unable to fetch please try agian later${error}`)
})
xhr.open('GET',
'https://supersimplebackend.dev/greeting')
xhr.send()*/

// using promise fetch get data from backend
function loadDataPromise(){
  console.log('waiting...')
fetch('https://supersimplebackend.dev/greeting').then((response)=>{
return response.text()
}).then((value) =>{
  console.log(value)
}).catch((error) =>{
  console.log(error)
})
}
loadDataPromise()

async function loadData(){
  try {
  console.log('waiting...')
 const response = await fetch('https://supersimplebackend.dev/greeting')
 const value = response.text()
  return value
  }
 catch(error){
  console.log(error)
}
}
loadData().then((value) =>{
  console.log(value)
})