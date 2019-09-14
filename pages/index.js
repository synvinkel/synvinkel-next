import withLayout from '../components/Layout'
import Header from '../components/Header'
import Card from '../components/Card'
const Home = () => {


  return (
    <div className="home">

      <Header />

      <main>

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



    `}</style>
    </div>
  )
}

export default withLayout(Home)
