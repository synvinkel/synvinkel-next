// import React, { useState, useEffect } from 'react'
import withLayout from '../components/Layout'
import Header from '../components/Header'

const Home = () => {


  return (
    <div className="home">

     <Header />

      <style jsx>{`

.home {
  margin: 0;
  padding: 0;
  height: 100vh;
}


    `}</style>
    </div>
  )
}

export default withLayout(Home)
