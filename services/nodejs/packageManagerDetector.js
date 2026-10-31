import { searchFile } from "../../src/utils/helper.js";

/*
  -after detection of the frameWork checking the packagemanager to build dependencies like npm and yarn
 */
export async function packageManagerDetector(filePath){
    let packageManager = []
    const nodeLockFiles = [
        { file: "package-lock.json", manager: "npm" },
        { file: "npm-shrinkwrap.json", manager: "npm" },
        { file: "yarn.lock", manager: "yarn" },
        { file: "pnpm-lock.yaml", manager: "pnpm" },
        { file: "bun.lock", manager: "bun" },
        { file: "bun.lockb", manager: "bun" }
        ];
      for(const lockFile of nodeLockFiles){
         const detected = await searchFile(filePath,lockFile.file)
         if(detected) packageManager.push(lockFile.manager)
      }
    packageManager.forEach((f)=>{
        console.log(f)
        console.log(3)
    })

}