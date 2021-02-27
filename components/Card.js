import Link from 'next/link'

const Card = ({ href, img, children }) => (
    <div className="card">
      <Link href={href}>
        <a>
          <div className="content">{children}</div>
        </a>
      </Link>
  
      <style jsx>{`
  .card{
    padding: 10px;
    height: 300px;
    width: 33%;
  }

  .card a {
    text-decoration: none;
    color: black;
    text-transform: uppercase;
  }
  .card div {
    height: 100%;
    border: 1px solid black;
    background-image: url(${img});
    background-size: cover;

    will-change: transform;
    transform: scale(1);
    transition: transform 150ms ease-in;
  }

  .card div:hover {
    transition: transform 100ms ease-out;
    transform: scale(1.01) translateY(-3px);
  }

  .card .content {
    display: grid;
    justify-content: start;
    align-items: center;
    font-family: sans-serif;
    text-decoration: none;
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