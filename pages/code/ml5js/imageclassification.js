import withLayout from '../../../components/Layout'
import dynamic from 'next/dynamic'

const ImageClassifier = dynamic(() => import('../../../components/code/ml5js/imageclassification'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

export default withLayout(() => (
    <div className="container">
        <ImageClassifier />
        <style jsx>{`
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
                `} </style>
    </div>
), 'ml5 imageclassification')