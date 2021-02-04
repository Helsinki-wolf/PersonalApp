const axios = require('axios')

class ControllerHarvardArt {
    static read(req, res, next){
        console.log('harvard')
        console.log(process.env.HARVARD_API_KEY)
        axios({
            method: 'get',
            url: `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&page=${req.params.page}&size=5`,
            
        })
        .then((result)=>{
            res.status(200).send(result.data)
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports={
    ControllerHarvardArt
}