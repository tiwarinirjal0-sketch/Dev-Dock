
import net from 'node:net';

export async function urlGenerator(name, port, host, timeout = 10000) {
    return new Promise((resolve, reject) => {

        const startTime = Date.now();

        function checkConnection() {

            if (Date.now() - startTime >= timeout) {
                reject(new Error('Server did not start within 10 seconds'));
                return;
            }

            const socket = net.createConnection({
                host: host,
                port: port
            });

            socket.setTimeout(1000);

            socket.on('connect', () => {
                console.log(
                    'Server started in:',
                    (Date.now() - startTime) / 1000,
                    'seconds'
                );

                socket.destroy();

                resolve(`http://${host}:${port}`);
            });

            socket.on('error', () => {
                socket.destroy();

                setTimeout(checkConnection, 500);
            });

            socket.on('timeout', () => {
                socket.destroy();

                setTimeout(checkConnection, 500);
            });
        }

        checkConnection();
    });
}
