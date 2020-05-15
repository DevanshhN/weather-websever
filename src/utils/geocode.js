request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGV2YW5zaG4iLCJhIjoiY2thMDZiN2FnMGRqczNzcnR6YXFxeWwwMCJ9.uo3cYG8FiFFAxrXCgR2sYA&limit=1'
    
    request({url , json : true},(error,{ body }={}) => {
        if (error){
            callback('Cannot connect to location services',undefined)
        }
        else if(body.message ||body.features.length ===0){
            callback('Cannot find location',undefined)
        }
        else{
                callback(undefined,
                    {
                        latitude : body.features[0].center[1],
                        longitude : body.features[0].center[0],
                        location : body.features[0].place_name
                    })
        }
    })
}


module.exports = geocode