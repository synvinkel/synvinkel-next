import Link from 'next/link'

const Header = ({current}) => (
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
      <Link href="/"><a>things</a></Link>
      <Link href="/about"><a><span>about /</span><span>contact</span></a></Link>
    </nav>

    <style jsx>{`
.header {
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

nav, nav * {
  display: flex;
  flex-wrap: wrap;
  font-weight: 300;
  font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
}

a {
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}

a+a{
  margin-left: 20px;
}

span+span {
    margin-left: 8px;
}

@media (max-width: 800px){
    .logo {
        height: 50px;
    }

    nav {
    }

    nav, nav * {
        flex-direction: column;
        align-items: center;
    }

    a+a{
        margin-top: 10px;
        margin-left: 0;
    }
}
        `}</style>
  </div>
)

export default Header