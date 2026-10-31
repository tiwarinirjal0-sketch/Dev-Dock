import { error } from 'node:console';
import { access,constants, existsSync, readdirSync, readFileSync,readdir } from 'node:fs';
import path from 'node:path';
import decompress from 'decompress';
import { PROJECTS_DIR } from '../../src/config/config.js';
import { mkdir,readFile,stat } from 'node:fs/promises';
import crypto from "node:crypto"
import { trusted, Types } from 'mongoose';
import extract from 'extract-zip';
import { type } from 'node:os';
import { start } from 'node:repl';
import { searchFile } from '../../src/utils/helper.js';
import { ProjectTypeDetector } from './projectTypeDetector.js';
import { FrameWorkDetection } from '../nodejs/frameworkDetector.js';
import { packageManagerDetector } from '../nodejs/packageManagerDetector.js';


export async function projectDetector(filePath, projectPath){
           
             
            await mkdir(projectPath, {recursive:true})
            await extract(filePath, {dir:projectPath})
            const ProjectType = await ProjectTypeDetector(projectPath)
            console.log(ProjectType)


            ProjectType.forEach(async(f)=>{
                switch (f) {
                case "node":
                    const packageJsonPath = await searchFile(projectPath,"package.json")
                    const jsonContents = await readFile(packageJsonPath,"utf-8")
                    const jsonContentsObj = await JSON.parse(jsonContents)
                    await FrameWorkDetection(jsonContentsObj)
                    await packageManagerDetector(projectPath)
                    break;
            
                default:
                    break;
            }

            })
            
            
            
            // const packageJsonPath = await searchFile(projectPath,"package.json")
            // const packageLockJsonPath = await searchFile(projectPath,"package-lock.json")
            // console.log(packageJsonPath)
            // console.log(packageLockJsonPath)

            // const jsonContents = await readFile(packageJsonPath,"utf-8")
            // const jsonContentsObj = await JSON.parse(jsonContents)

            // const jsonLockContents = await readFile(packageLockJsonPath,"utf-8")
            // const jsonLockContentsObj = await JSON.parse(jsonLockContents)
            
            // const frameWork = (jsonContentsObj.dependencies.express)?"express":null
            // const packageManager = "npm"
            // const installCommands = "npm ci"
            // const buildCommand = (jsonContentsObj.scripts.build)?jsonContentsObj.scripts.build:null
            // const entryPoint = jsonContentsObj.scripts.start.split[1]
            // const startCommand = jsonLockContentsObj.sctipts?.start ?? null


            // console.log(frameWork, packageManager, installCommands, entryPoint, startCommand)
            
            //let startCommand
            //   if(jsonContents.Obj.scritps){
            //      if(jsonContents.Obj.sctipts.start){
            //         startCommand = jsonContents.scripts.start
            //      }else{
            //       startCommand = null
            //      }
            //   }
     


            // const nestedDir = await readdir(projectPath)
            // const files = await readdir(`${projectPath}/${nestedDir[0]}`)
            
            // const packageFile = files.filter((fName)=>fName.includes("package.json"))

            
            
            // const jsonContents = await readFile(`${projectPath}/${nestedDir[0]}/${gi[0]}`, "utf-8")

            // const jsonContentsObj = await JSON.parse(jsonContents)

            // const framework = (jsonContentsObj.dependencies.express)?"express":null
            // const packageManager = "npm"
            // const installCommand = (files.includes("package-lock.json"))?"npm ci":null
            // const build = (jsonContentsObj.scripts.build)?jsonContents.scripts.build:null
            // const entryPoint = jsonContentsObj.scripts.start.split(" ")[1]
            // const startCommand = jsonContentsObj.scripts?.start ?? null
            
            
            //  return {
            //     frameWork,
            //     startCommand,
            //     installCommands,
            //     entryPoint,
            //     packageManager,
            //     buildCommand
            //  }


            
}
