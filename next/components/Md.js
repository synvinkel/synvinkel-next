import Markdown from 'react-markdown'

const Md = ({ source }) => (
    <div className="markdown">
        <Markdown source={source} />
        <style jsx global>{`
.markdown a {
    text-decoration: none;
    color: blue;
}

.markdown a:hover {
    opacity: 0.6;
}
        `}</style>
    </div>
)

export default Md