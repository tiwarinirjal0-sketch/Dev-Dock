//will recieve the config details to install the dependecy and run it as a child process capture logs and errors
import {spawn} from "node:child_process"

export async function dependencyInstaller(filePath, config){
    const {installcommand,rootfile} = config

    //execute the child process
    const child = spawn(installcommand.command,installcommand.args,{
        cwd:filePath
    })
    
    //emit logs

    child.stdout.on("data",(chunk)=>console.log(chunk.toString()))
    child.stderr.on("data",(chunk)=>console.log(chunk.toString()))
    const exitCode = await new Promise((resolve, reject) => {
        child.on("error", reject);

        child.on("close", (code) => {
            resolve(code);
        });
});
    
}