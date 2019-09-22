import withLayout from '../../components/Layout'

const FloatingCard = () => {

    return (
        <div className="container">

            <div className="card">

            </div>

            <style jsx>{`
                .container {
                    align-items: center;
                    background: radial-gradient(darkred, black);
                    display: grid;
                    height: 100vh;
                    justify-content: center;
                    margin: 0;
                    width: 100%;
                    perspective: 2000px;
                }

                .card {
                    background: white;
                    border-radius: calc(60vh * 0.02);
                    box-shadow: 0 20px 10px 2px rgba(0, 0, 0, 0.2);
                    height: 60vh;
                    width: calc(60vh * 0.7);
                    position: relative;
                    transition: transform .5s ease,
                                box-shadow .5s ease;
                    transform: rotateX(45deg);
                }
                .card::after {
                    content: " ";
                    position: absolute;
                    left: 5%;
                    top: 3%;
                    display: block;
                    background: url(https://images.unsplash.com/photo-1569099254297-2cda92bef031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) center center;
                    width: 90%;
                    height: 94%;

                }

                .card:hover, .card:active{
                    cursor: pointer;
                    transform: 
                                translate3d(0, 0, 200px)
                                rotateX(0deg);
                       
                    box-shadow: 0 30px 20px 4px rgba(0, 0, 0, 0.2);

                }
            `}</style>
        </div>
    )
}

export default withLayout(FloatingCard, 'Floating Card')