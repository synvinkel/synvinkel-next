import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = ({ current }) => {

    const router = useRouter()

    const links = [
        {href: "/", label: "things"},
        {href: "/notes", label: "notes"},
        {href: "/about", label: "about"},
    ]

    return (
        <div className="header">
            <div className="logo-container">
                <Link href="/">
                    <div className="logo">
                        SYNVINKEL
                    </div>
                </Link>
                <ul>
                    <li>maps</li>
                    <li>code</li>
                    <li>play</li>
                </ul>
            </div>
            <nav>
                {links.map(l => (
                    <Link href={l.href}><a className={l.href === router.pathname ? "active" : "inactive"}>{l.label}</a></Link>
                ))}
            </nav>

            <style jsx>{`
.header {
  max-width: 1600px;
  margin: auto;
  padding: 0 30px;
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

li {
    opacity: 0.6;
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
  background: #fec752;
  color: white;
  align-items: center;
  cursor: pointer;
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
  opacity: 0.5;
  text-transform: uppercase;
  will-change: color;
  transition: color 200ms ease-out;
}

a.active {
    opacity: 1;
    color: black;
}

a.inactive:hover {
    color: #fec752;
    transition: color 100ms ease-in;
}

a+a{
  margin-left: 20px;
}
span+span {
    margin-left: 8px;
}

@media (max-width: 800px){

    .header {
        padding: 0 20px;
        margin-top: 20px;
    }

    .logo {
        height: 50px;
    }

    nav {
        padding-top: 5px;
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
}

export default Header