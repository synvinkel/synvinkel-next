import withLayout from '../../../components/Layout'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ML5 = ({ query }) => {

    const ImageClassifier = dynamic(() => import(`../../../components/code/ml5js/${query.example}`), {
        loading: () => <p>Loading...</p>,
        ssr: false
    })

    return (
        <div className="container">
            <ImageClassifier />
            <style global jsx>{`
                .container{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                input {
                    width: 720px;
                    margin-top: 10px;
                }

                html, body{
                    margin: 0;
                    padding: 0;
                }
                `} </style>
        </div>
    )
}

ML5.getInitialProps = ({ query }) => {
    return { query }
}

export default ML5