// import React, { useState, useEffect } from 'react'
import withLayout from '../components/Layout'
import Header from '../components/Header'
import Link from 'next/link'

const About = () => {


  return (
    <>
      <Header />
      <main>

        <article>
          <header>
            <h1>Johnnie Hård</h1>
            <p>M.Sc. Geomatics, GIS and remote sensing</p>
          </header>
          <p>
            Software developer working with maps and geographical data. A maker and all around tinkerer enamoured with getting lost in the unknown.
          </p>
          <p>Currently building a variety of map centerd apps at <Link href="https://geografiskainformationsbyran.se"><a target="_blank">Geografiska Informationsbyrån</a></Link>. We're mapping urban trees at <Link href="https://stadstrad.se"><a target="_blank">Stadsträd.se</a></Link> and delivering interactive watershed delineations for The Swedish Transport Administration, just to name a few.
          </p>
          <p>
            Get in touch: <Link href="mailto:johnnie@synvinkel.org"><a>johnnie@synvinkel.org</a></Link>
          </p>
        </article>
      </main>
      <style jsx>{`

header {
  margin-bottom: 2rem;
}

header p {
  opacity: .7;
}

header h1 {
  margin-bottom: 0;
}
        
        `}</style>
    </>
  )
}

export default withLayout(About)
