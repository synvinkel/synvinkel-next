
export function FillDiv({
    time,
    initialTime
}) {

    return (
        <>
            <div className="fill-container">
                <div id="elapsed" style={{ flex: 1 - time / initialTime }} />
                <div id="remaining" style={{ flex: time / initialTime }} />
            </div>
            <style jsx>{`

                .fill-container {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: -1;
                    background: pink;
                    display: flex;
                    flex-direction: column;
                }

                #elapsed {
                    background: white;
                }

                #remaining {
                    background: black;
                }
              
            `}</style>
        </>
    )
}