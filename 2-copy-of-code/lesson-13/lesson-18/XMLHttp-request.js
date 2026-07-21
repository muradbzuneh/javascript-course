
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

async function addName(){
  try {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
       name: 'Murad Bzuneh' 
      })
    })
 const value = await response.text()
  console.log(value)
  }
catch (error){
  console.log(`please try again ${error}`)
}
}
addName()

async function addToSuperSimple(){
  try {
   const response = await fetch('https://supersimplebackend.dev/greeting', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    })
  if(response.status >= 400){
    throw response
  }
  }
catch (error){
  if(error.status === 400){
    const responseError =  await error.json
    console.log(responseError)
  }
 else {
  console.log('network error please try agian')
 }
}
}
addToSuperSimple()
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

async function loadDataFromAmazon(){
  try {
 const response = await fetch('https://amazon.com')
  if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
 const value = await response.json()
  console.log(value)
  }
 catch(error){
  console.log(`un expected error${error.massage}`)
}
}

loadDataFromAmazon()