
import {spawn} from "node:child_process"


export async function ProjectStarter(assignedPort,projectPath,config){
    const env = {
        PATH: process.env.PATH,
        PORT : String(assignedPort),
        NODE_ENV : "production",
        HOST : "0.0.0.0"

    }
    const {startcommand} = config
    const child = spawn(startcommand.command, startcommand.args, {
        env: env,
        cwd:projectPath
    })

    child.stdout.on("data", chunk=>{console.log(chunk.toString())})
    child.stderr.on("data",chunk=>{console.log(chunk.toString())})

    child.on("error",(err)=>console.log(err))
    child.on("close",(code)=>
        console.log("Process finsihed with " + code)
        
    )


    
}


