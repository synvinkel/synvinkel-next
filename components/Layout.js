
import MyHead from './MyHead'

const withLayout = (Page, title) => {
    return () => (

        <>
            <MyHead title={title} />
            <Page />
            <style jsx global>{`

html, body {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
main {
    margin:40px auto;
    padding:0 100px;
    max-width:1600px;
}

main, article {
    line-height:1.6;
    font-size:18px;
    color:#444;
}

article {
    max-width: 50rem;
}

article a {
    color: inherit;
}


h1,h2,h3 {
    line-height:1.2;
    margin-bottom: 1rem;
    margin-top: 3rem;
    font-family: sans-serif;
}

article p {
    margin-bottom: 1rem;
}

img {
    max-width: 100%;
}

@media (max-width: 800px){
 main {
     padding: 0 10px;
 }
}
`}
            </style>
        </>
    )
}

export default withLayout