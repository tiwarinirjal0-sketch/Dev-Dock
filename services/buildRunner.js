import { spawn } from 'node:child_process';

// export function runCommand(command, cwd, onLog) {
//   return new Promise((resolve, reject) => {
//     const child = spawn(command, { cwd, shell: true });

//     child.stdout.on('data', chunk => onLog(chunk.toString()));
//     child.stderr.on('data', chunk => onLog(chunk.toString()));

//     child.on('error', reject);                       // couldn't start
//     child.on('close', code => {                      // finished
//       if (code === 0) resolve();
//       else reject(new Error(`"${command}" exited with code ${code}`));
//     });
//   });
// }


export async function runCommand(command, cwd, onLog) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, {cwd, shell:true})
        
        child.stdout.on("data", chunk => onLog(chunk.toString()))
        child.stderr.on("data", chunk => onLog(chunk.toString()))

        child.on("error", reject)
        child.on("close", code => {
            if(code === 0) resolve()
            else reject(`"${command}" exited with code ${code}`)
        })

    })
}