
const data = require('fs').readFileSync('./static/code/tsdthingy/anga.json')
const json = JSON.parse(data)

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const monthimages = months.reduce((obj, month) => {
    obj[month] = json.images.filter(image => {
        const date = new Date(image.time)
        const imageMonth = date.getMonth()
        return month === imageMonth
    })

    return obj
}, {})

images = months.map(month => {
    const i = Math.floor(Math.random() * monthimages[month].length)
 return monthimages[month][i]
})

require('fs').writeFileSync('./static/code/tsdthingy/angamonths.json', JSON.stringify(images, null, 4))