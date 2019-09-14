// import React, { useState, useEffect } from 'react'
import withLayout from '../components/Layout'
import Header from '../components/Header'

const Home = () => {


  return (
    <div className="home">

     <Header />

     <main>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
        <div className="card"><div></div></div>
     </main>

      <style jsx>{`

.home {
  margin: 0;
  padding: 0;
  height: 100vh;
}

main {
  display: flex;
  flex-wrap: wrap;
}

.card{
  padding: 10px;
  height: 300px;
  width: 33%;
}
.card > div {
  height: 100%;
  border: 1px solid black;
  background: pink;
}

@media (max-width: 800px){
  .card {
    width: 100%;
  }
}

    `}</style>
    </div>
  )
}

export default withLayout(Home)
