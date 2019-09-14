
import MyHead from './MyHead'

const withLayout = (Page, title) => {
    return () => (

        <>
            <MyHead title={title} />
            <Page />
            <style jsx global>{`

* {
    padding: 0;
    margin: 0;
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


h1,h2,h3 {
    line-height:1.2
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