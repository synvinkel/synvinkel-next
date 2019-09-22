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
                }

                .card {
                    background: white;
                    border-radius: calc(60vh * 0.02);
                    box-shadow: 0 20px 10px 2px rgba(0, 0, 0, 0.2);
                    height: 60vh;
                    width: calc(60vh * 0.7);
                }
            `}</style>
        </div>
    )
}

export default withLayout(FloatingCard, 'Floating Card')