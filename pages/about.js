// import React, { useState, useEffect } from 'react'
import withLayout from '../components/Layout'
import Header from '../components/Header'
import Link from 'next/link'

const About = () => {


  return (
    <>
      <Header />
      <main>

    {/* Background div for placing images */}
    <div className="bg" />

        <article>
          <header>
            <h1>Johnnie Hård</h1>
            <p>M.Sc. Geomatics, GIS and remote sensing</p>
          </header>
          <img src="/static/images/portrait.jpg" alt="Self portrait" />
          <p>
            Software developer working with maps and geographical data. A maker and all around tinkerer enamoured with getting lost in the unknown.
          </p>
          <p>Currently building a variety of map centered apps at <a href="https://geografiskainformationsbyran.se" target="_blank">Geografiska Informationsbyrån</a>. We're mapping urban trees at <a href="https://stadstrad.se" target="_blank">Stadsträd.se</a> and delivering interactive watershed delineations for The Swedish Transport Administration, just to name a few.
          </p>
          <p>
            Get in touch: <a href="mailto:johnnie@synvinkel.org">johnnie@synvinkel.org</a>
          </p>
        </article>
      </main>
      <style jsx>{`

.bg {
  z-index: -10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

main {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: white;
}

header {
  margin-bottom: 2rem;
}

header p {
  opacity: .7;
}

header h1 {
  margin-bottom: 0;
}

@media (max-width: 800px){
  main {
    padding-top: 0;
  }
}
        
        `}</style>
    </>
  )
}

export default withLayout(About)
