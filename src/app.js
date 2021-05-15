const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port = process.env.PORT || 3000

//Define paths for expres config
const public_path = path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(public_path))


app.get('', (req,res)=>{
    res.render('index' ,{
        title: "Weather app",
        name: "Ankita"
    })
})

app.get('/about', (req,res)=>{
    res.render('about' ,{
        title: "About us",
        name: "Ankita"
    })
})

app.get('/help', (req,res)=>{
    res.render('help' ,{
        title: "Need help",
        name:"Ankita"
       
    })
})

//app.com
//app.com/help
//app.com/about



// app.get('', (req,res) => {                    //now app.use will work and dont execute this bcz it gets redirected to index.html
//     res.send('<h1> Hello express </h1>')       // this individual route no longer needed   same for /help & about routes
// })                                             // now we have setup routes again bcz of template engine instead of static files it gets redirected to views index.hbs



app.get('/weather', (req,res) => {

    if(!req.query.address)
    {
        return res.send({
            error: "you must provide address"
        })

    }
    geocode(req.query.address, (error, {lat, long, loc} = {}) => {

        if(error)
        {
           return res.send({
            error: error
        })
        }
    
         forecast(lat,long, (error, forecastdata) => {
           if(error)
           {
             return res.send({
                error: error
            })
           }
    
           res.send({
            forecast: forecastdata,
            location: loc,
            address: req.query.address
        })
        //    console.log(loc)
        //    console.log(forecastdata)
        })
    })
    
})

app.get('/help/*', (req,res) => {
    res.render('error' ,{
        errormsg: "help article not found"
       
       
    })
})

app.get('*', (req,res) => {          // * act as wildcard for all non matching url, place at last
    res.render('error' ,{
        errormsg: "Page not found"
       
       
    })
})

app.listen(port, ()=>{
    console.log('Server running on port ' + port)
})