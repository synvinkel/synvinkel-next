const fetch = require('isomorphic-unfetch')

const url = "https://mtf-sat.synvinkel.org"
const anga = [18.709872364997864, 57.46933345764645]
const key = process.env.MTF_SAT_KEY
const startDate = '2018-01-01'
const endDate = '2018-12-31'
const buffer = 100

async function getData(){
    const data = await fetch(`${url}/timeseries?apikey=${key}&lng=${anga[0]}&lat=${anga[1]}&endDate=${endDate}&startDate=${startDate}&buffer=${buffer}`)
    const json = await data.json()

    require('fs').writeFileSync('./code/tsdthingy/anga.json', JSON.stringify(json, null, 4))
        
}

getData()
