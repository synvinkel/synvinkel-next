/*

Used to auto populate next.configs exportPathMap.
Automatically set all pages to be exported.

*/

const fs = require('fs')
const path = require('path')
const walkpages = (root, dir, filelist, asObject = false) => {
    dir = dir || root
    filelist = filelist || []
    files = fs.readdirSync(dir)
    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            if (file !== 'api') {
                filelist = walkpages(root, path.join(dir, file), filelist, asObject)
            }
        } else {
            const filepath = dir.split('/').filter(d => d !== root).join('/')
            file = file.split('.')[0]
            if (file === 'index') {
                file = ''
            }
            const path = `/${filepath}${file !== '' ? `${filepath === '' ? '' : '/'}${file}` : ''}`
            if(!asObject){
                filelist.push(path)
            } else {
                filelist.push({
                    path
                })
            }
        }
    })
    return filelist
}

module.exports = walkpages