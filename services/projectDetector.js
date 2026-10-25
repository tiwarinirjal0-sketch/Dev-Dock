import { error } from 'node:console';
import { access, constants, existsSync } from 'node:fs';
import path from 'node:path';
import decompress from 'decompress';
import { PROJECTS_DIR } from '../src/config/config.js';
import { mkdir,stat,readdir,readFile } from 'node:fs/promises';
import crypto from "node:crypto"
import { trusted, Types } from 'mongoose';
import extract from 'extract-zip';
import { type } from 'node:os';



export async function projectDetector(filePath, projectPath){
           
             
            await mkdir(projectPath, {recursive:true})

            await extract(filePath, {dir:projectPath})

            const nestedDir = await readdir(projectPath)
            const files = await readdir(`${projectPath}/${nestedDir[0]}`)
            
            const packageFile = files.filter((fName)=>fName.includes("package.json"))

            
            
            const jsonContents = await readFile(`${projectPath}/${nestedDir[0]}/${packageFile[0]}`, "utf-8")

            const jsonContentsObj = await JSON.parse(jsonContents)

            const framework = (jsonContentsObj.dependencies.express)?"express":null
            const packageManager = "npm"
            const installCommand = (files.includes("package-lock.json"))?"npm ci":null
            const build = (jsonContentsObj.scripts.build)?jsonContents.scripts.build:null
            const entryPoint = jsonContentsObj.scripts.start.split(" ")[1]
            const startCommand = jsonContentsObj.scripts?.start ?? null
            
            
             return {
                framework,
                packageManager,
                installCommand,
                build,
                entryPoint,
                startCommand
             }


            
}
