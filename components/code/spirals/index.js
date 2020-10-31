export default function graphic(container) {
    const canvas = container.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    let w, h
    let t = new Date().getTime()
    let reset = new Date().getTime()
    let spirals = []

    setup()

    function setup() {
        console.log(container)
        w = container.clientWidth
        h = container.clientHeight

        canvas.width = w
        canvas.height = h

        addItems()
        requestAnimationFrame(tick)
    }

    function addItems() {
        if (spirals.length > 12) {
            for (let i = 0; i < 9; i++) {
                spirals.shift()
            }
        }
        for (let i = 0; i < 9; i++) {
            spirals.push(new Spiral(Math.random() * w, Math.random() * h, 10, 10))
        }
    }

    function tick() {
        update()
        draw()
        if (new Date().getTime() - reset > 1000) {
            reset = new Date().getTime()
            // setup()
            addItems()
        }
        requestAnimationFrame(tick)
    }

    function update() {
        t = new Date().getTime()
        spirals.forEach(spiral => spiral.update())
    }


    function draw() {
        clear()

        spirals.forEach((spiral, i) => spiral.draw())
        spirals.forEach((s1, i) => {
            if (i > 0) {

                const s2 = spirals[i - 1]

                ctx.save()
                ctx.beginPath()
                ctx.strokeStyle = 'orange'
                ctx.lineWidth = 2
                ctx.moveTo(s1.x + s1.getWidth() / 2, s1.y)
                // ctx.lineTo(s2.x - s2.getWidth() / 2, s2.y)
                ctx.bezierCurveTo(s1.x + s1.getWidth() * 2, s1.y, s2.x - s2.getWidth() * 2, s2.y, s2.x - s2.getWidth() / 2, s2.y)
                ctx.stroke()

                ctx.restore()
            }
        })
    }

    function clear() {
        ctx.fillStyle = "#123"
        ctx.fillRect(0, 0, w, h)
    }

    function Spiral(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.timeOffw = Math.random() * 0.002
        this.timeOffh = Math.random() * 0.002

        this.getHeight = () => w + w + Math.sin(t * this.timeOffw) * w
        this.getWidth = () => h + h + Math.sin(t * this.timeOffh) * h

        this.update = () => {
            this.w = this.getWidth()
            this.h = this.getHeight()
        }

        this.draw = (l = 30) => {
            ctx.save()
            ctx.translate(this.x, this.y)
            // ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.fillStyle = `hsla(30, 100%, ${l}%, 1)`
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
            ctx.restore()
        }

        return this
    }
}