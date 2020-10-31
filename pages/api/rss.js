import { Feed } from 'feed'

export default (req, res) => {

    
    const feed = new Feed({
        title: "Synvinkel",
        link: "https://synvinkel.org",
        description: "maps - code - play"
    })
    
    const pages = require('../../walkpages')('pages', null, null, true)

    pages.forEach(page => {
        feed.addItem({
            link: `https://synvinkel.org${page.path}`
        })
    })

    const {
        query: format
    } = req

    res.send(feed.rss2())
}