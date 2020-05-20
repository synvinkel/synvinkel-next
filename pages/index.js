import withLayout from '../components/Layout'
import Header from '../components/Header'
import Card from '../components/Card'
const Home = () => {


  return (
    <div className="home">

      <Header />

      <main>
        <Card href="/notes/digitalgarden">Digital Garden</Card>
        <Card href="/code/designsystems" img="/static/code/designsystems/icecream.png" />
        <Card href="/projects/tsdthingy" img="/static/projects/tsdthingy/tsdthingy.jpg" />
        <Card href="/code/spirals" img="/static/code/spirals/spirals.jpg" />
        <Card href="/code/geolines" img="/static/code/geolines/geolines.jpg" />
      </main>

      <style jsx>{`

.home {
  margin: 0;
  padding: 0;
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
