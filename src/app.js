const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')

const app  = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
    res.render('index',{
        title : 'The weather app',
        name: "Devansh Nanani"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name : "Devansh"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : "This is some helpful text",
        name : "Devansh"
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send("Please enter a location")
    }
    geocode(req.query.address,(error,{latitude, longitude, location} = {})  =>{ 
        if (error){
        return res.send({error})
        }
    forecast(latitude, longitude, (error,forecastdata) =>{
        if (error){
            return res.send({error})
        }
    res.send({
        forecast : forecastdata,
        location,
        address : req.query.address,
    })
    }
    )
    })})

app.get('/help/*',(req,res)=>{
    
    res.render('404',{
        title : 'Help not found',
        errorMesssage : "Sorry can't help"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
    title : "404 page not found",
    errorMesssage : 'No such page'
    })
})

app.listen(port, () =>{
    console.log("Server is running om port "+port)
})