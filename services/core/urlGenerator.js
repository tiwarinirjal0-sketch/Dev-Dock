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
                resolve(port)
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