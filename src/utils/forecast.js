const request=require('request')

const forecast = (lat,long,callback)=> {
    
    const url='http://api.weatherstack.com/current?access_key=eb94ec7169bfd9d577b53de1911874c6&query=' + lat + ',' + long 
    
    request({url : url,json :true} ,(error, {body})=>        // intead of writing response we are just using its attribute body remember destructuring way     
     {
       
      if(error)
      {
         callback('Unable to connect to location services' , undefined)   
      }
      else if(body.error)
      {
       callback('unable to find loc,  try another search' , undefined) 
      }
      else {
         callback(undefined, 
         body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out but it feels like ' + body.current.feelslike + ' degree out. The humidity in environment is ' + body.current.humidity + '%'
         )
      }
 
 
    })
 
 }

 module.exports = forecast    //export this fxn forecast