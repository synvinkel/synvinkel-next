// import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import withLayout from '../components/Layout'

const Home = () => {


  return (
    <div className="home">

      <div className="header">
        <div className="logo-container">
          <div className="logo">
            SYNVINKEL
          </div>
          <ul>
            <li>maps</li>
            <li>code</li>
            <li>play</li>
          </ul>
        </div>
        <nav>
          <Link href="/test"><a>things</a></Link>
          <Link href="/test2"><a>about / contact</a></Link>
        </nav>
      </div>

      <style jsx>{`

.home {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.header {
  min-height: 200px;
  margin: auto 30px;
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  align-items: flex-start;
}

ul {
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  padding: 10px 20px;
}

li+li::before{
 content: "—";
 margin-right: 10px;
}

.logo {
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  font-size: 30px;
  background: black;
  color: white;
  align-items: center;
}

nav {
  display: flex;
  flex-wrap: wrap;
  font-weight: 300;
  font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
}

nav a {
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}

nav a+a{
  margin-left: 20px;
}
    `}</style>
    </div>
  )
}

export default withLayout(Home)
