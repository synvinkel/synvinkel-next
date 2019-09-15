import Link from 'next/link'

const Card = ({ href, img }) => (
    <div className="card">
      <Link href={href}>
        <a>
          <div></div>
        </a>
      </Link>
  
      <style jsx>{`
  .card{
    padding: 10px;
    height: 300px;
    width: 33%;
  }
  .card div {
    height: 100%;
    border: 1px solid black;
    background-image: url(${img});
    background-size: cover;
  }
  
  @media (max-width: 800px){
    .card {
      width: 100%;
    }
  }
        `}</style>
    </div>
  )

  export default Card