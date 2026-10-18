import { spawn } from 'node:child_process';
import net from 'node:net';

// const running = new Map(); // projectId -> { child, port }

// // Ask the OS for a free port
// function getFreePort() {
//   return new Promise((resolve, reject) => {
//     const server = net.createServer();
//     server.listen(0, () => {
//       const { port } = server.address();
//       server.close(() => resolve(port));
//     });
//     server.on('error', reject);
//   });
// }

const running = new Map()

//Asking Os for the free port 

function getFreePort(){
    return new Promise((resolve, reject) => {
        const server = net.createServer()
        server.listen(0, ()=>{
            const {port} = server.address()
            server.close(()=> resolve(port))
        })
        server.on("error", reject)
    })
}











// Poll the port until something accepts a connection
// function waitForPort(port, timeoutMs = 30000) {
//   const start = Date.now();
//   return new Promise((resolve, reject) => {
//     const attempt = () => {
//       const socket = net.connect(port, '127.0.0.1');
//       socket.on('connect', () => { socket.destroy(); resolve(); });
//       socket.on('error', () => {
//         socket.destroy();
//         if (Date.now() - start > timeoutMs) reject(new Error('App did not start listening in time'));
//         else setTimeout(attempt, 500);
//       });
//     };
//     attempt();
//   });
// }


function waitForPort(port, timeoutMs = 3000){
    const start = Date.now()
    return new Promise((resolve, reject) => {
        const attempt = () => {
            const socket = net.connect(port,'127.0.0.1')
            socket.on("connect", ()=>{socket.destroy();resolve()})
            socket.on("error", ()=>{
                socket.destroy()
                if(Date.now - start > timeoutMs) reject(new Error('App did not start listening in time'))
                else setTimeout(attempt, 500)
            });
        }
        attempt()
    })
}



// export async function startApp(info, log) {
//   const port = await getFreePort();

//   const child = spawn(info.startCommand, {
//     cwd: info.rootDir,
//     shell: true,
//     env: { PATH: process.env.PATH, PORT: String(port), NODE_ENV: 'production' },
//   });

//   child.stdout.on('data', d => log(d.toString()));
//   child.stderr.on('data', d => log(d.toString()));

//   child.on('exit', code => {
//     running.delete(info.projectId);
//     updateStatus(info.projectId, code === 0 ? 'stopped' : 'crashed');
//   });

//   running.set(info.projectId, { child, port });

//   await waitForPort(port);          // throws if the app never listens
//   await updateStatus(info.projectId, 'running');
//   return port;
// }

export async function startApp(info, PROJECTS_DIR, log) {
    const port = await getFreePort();

    const child = spawn("npm", ["start"], {
        cwd: PROJECTS_DIR,
        shell: false,
        env: {
            ...process.env,
            PORT: String(port),
            NODE_ENV: "production",
        },
        stdio: ["ignore", "pipe", "pipe"],
    });

    child.stdout.on("data", d => log(d.toString()));
    child.stderr.on("data", d => log(d.toString()));

    child.on("error", err => {
        log(`Failed to start app: ${err.message}`);
        running.delete(info.projectId);
    });

    child.on("exit", (code, signal) => {
        log(`App exited: code=${code}, signal=${signal}`);
        running.delete(info.projectId);
    });

    running.set(info.projectId, { child, port });

    await waitForPort(port);

    return port;
}





