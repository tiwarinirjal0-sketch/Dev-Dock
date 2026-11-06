
/*
sets a time as 10s for a timelimit for retries
checks if it has reached 10s of trying and if yes hrows error
if not creates a tcp client to establish a connection in the port where server is running for the sake of knowing if server is listening
on connection promise is resolved 
if not temp client is removed and tried again (recursive )  





*/ 




import net from 'node:net'

export async function urlGenerator(port) {
    return new Promise((resolve, reject) => {

        const startTime = Date.now()
        const timeout = 10000

        function checkConnection() {

            if (Date.now() - startTime >= timeout) {
                reject(new Error('Server did not start within 10 seconds'))
                return
            }

            const socket = net.createConnection({
                host: '127.0.0.1',
                port: port
            })

            socket.on('connect', () => {
                console.log("connection happend in around: ",(Date.now()-startTime)/1000)
                socket.destroy()
                resolve(`http://localhost:${port}`);  //Hardcoded for now
            })

            socket.on('error', () => {
                socket.destroy()

                setTimeout(() => {
                    checkConnection()
                }, 500)
            })
        }

        checkConnection()
    })
}