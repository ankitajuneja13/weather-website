console.log('Client side js file is loaded')

//it is working through index.hbs as it is our main page by including in script tag



const weatherform= document.querySelector('form')
const search= document.querySelector('input')
const msgone=document.querySelector('#msg1')
const msgtwo=document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()          //dont refresh the browser after submiting
  
     const loc= search.value
     msgone.textContent='Loading...'
     msgtwo.textContent=''

     fetch('http://localhost:3000/weather?address=' + loc).then((response)=>{
     response.json().then((data)=>{
        if(data.error){
            msgone.textContent=data.error
            //console.log(data.error)
        }else
        {

            msgone.textContent=data.location
            msgtwo.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
      })
    })
    console.log(loc)
})