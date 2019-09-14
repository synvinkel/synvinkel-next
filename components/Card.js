import Link from 'next/link'

const Card = ({ href }) => (
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
    background-image: url(https://images.unsplash.com/photo-1568404642193-7caa1575e939?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80);
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