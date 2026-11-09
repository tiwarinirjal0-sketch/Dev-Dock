import {spawn} from "node:child_process"
import { fstat, writeFile, writeFileSync } from "node:fs"
import { mkdtempDisposable,readFile } from "node:fs/promises"
import path from "node:path"


// export async function reverseproxy(subDomainName, port, host){
//     const writeFileContents =` cat > ${subDomainName}.conf <<EOF
//                             server {
//                                 listen 80;
//                                 server_name ${subDomainName}.devdock.com;

//                                 location / {
//                                     proxy_pass http://${host}:${port};
//                                 }
//                             }
//                             EOF`
//     const child = spawn(`cd /etc/nginx/conf.d && touch ${subDomainName}.conf && ${writ}`)

//     child.stdout.on("data", chunk => {
//         console.log(chunk)
//     })
//     child.stderr.on("data",chunk=>{
//         console.log(chunk)
//     })

//     child.on("error",err=>console.log(err))
//     child.on("close",(code)=>console.log(`process exited with code ${code}`))


// }

export async function reverseProxy(subDomainName, port, host){
    const config = `server {
                             listen 80;
                               server_name ${subDomainName}.devdock.com;

                               location / {
                                   proxy_pass http://${host}:${port};
                             }
                         }`

    
    
    await writeFileSync(`/etc/nginx/conf.d/${subDomainName}.conf`, config)    
    const fileContents = await readFile(`/etc/nginx/conf.d/${subDomainName}`,{encoding:"utf8"})
    console.log(fileContents)
}
