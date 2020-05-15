const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2563a446700929ca90ad65b035d01f1e&query='+latitude+','+longitude
    request  ({url, json:true},(error,{body} = {}) => {
        
        if (error){
            callback("Cannot connect to api",undefined)
        }
        else if(!body)
        {
            callback('Unable to find location',undefined)
        }
        else {
            const data = body.current
            
                {
                    callback(undefined,'It is '+data.temperature+' right now but it feels like '+data.feelslike+' right now')
                }
        }
    })
}


module.exports = forecast