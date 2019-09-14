/*

Used to auto populate next.configs exportPathMap.
Automatically set all pages to be exported.

*/

const fs = require('fs')
const path = require('path')
const walkpages = (root, dir, filelist) => {
    dir = dir || root
    filelist = filelist || []
    files = fs.readdirSync(dir)
    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkpages(root, path.join(dir, file), filelist)
        } else {
            const filepath = dir.split('/').filter(d => d !== root).join('/')
            file = file.split('.')[0]
            if (file === 'index') {
                file = ''
            }
            filelist.push(`/${filepath}${file !== '' ? `${filepath === '' ? '' : '/'}${file}` : ''}`)
        }
    })
    return filelist
}

module.exports = walkpages