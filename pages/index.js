import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import withLayout from '../components/Layout'
import Md from '../components/Md'

const Home = () => {

  const [time, setTime] = useState(0)
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(time + 1)
  //   }, 100)
  //   return () => {
  //     clearInterval(id)
  //   }
  // }, [])

  return (
    <>
      <div className='hero'>

        <Md source={`
# Hej det här är markdown

Den kan ju också läsas från fil.
      `} />

        <p>
          Sen kommer det lite jsx. Med variabel: {time}
        </p>

        <div className='row'>
          <Link href="/folder/page" >
            <a>folder page</a>
          </Link>

        </div>
      </div>

      <style jsx>{`

    `}</style>
    </>
  )
}

export default withLayout(Home)
