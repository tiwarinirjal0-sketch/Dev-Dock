import { ProjectTypeDetector } from './projectTypeDetector.js';
import { FrameWorkDetection } from '../nodejs/frameworkDetector.js';
import { packageManagerDetector } from '../nodejs/packageManagerDetector.js';
import { scriptsDetector } from '../nodejs/scriptsDetector.js';
import { rootDetector } from './rootDetector.js';
import { searchFile } from '../../src/utils/helper.js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';


export async function ProjectConfigAccumulator(projectPath){
    let runTime = []
    let packageManager = []
    let scripts = []
    let rootFile = []
    let frameWork = []

    
    
    
             runTime = await ProjectTypeDetector(projectPath)
             for(const item of runTime){
                switch (item) {
                case "node":
                    const packageJsonPath = await searchFile(projectPath,"package.json")
                    const jsonContents = await readFile(packageJsonPath,"utf-8")
                    const jsonContentsObj = await JSON.parse(jsonContents)
                   
                    frameWork = await FrameWorkDetection(jsonContentsObj)
                    packageManager =  await packageManagerDetector(projectPath)
                    scripts = await scriptsDetector(jsonContentsObj)
                    rootFile = await rootDetector(projectPath)
                    break;
                  
            
                default:
                    break;
            }
             }
            //  let refinedScripts = Object.fromEntries({name:"build",script:"hello"})

            // Hard COded for now has to be made logical for conflicting cases or double runtime detections 

            let refinedRunTime = runTime[0]
            let refinedPackageManager = packageManager[0]


            let refinedScripts = {}

            for(const item of scripts){
                 refinedScripts[item.name] = item.script
            }

            let refinedFrameWork = frameWork[0]

            let relativePath = path.relative(projectPath,rootFile)

        return {
            runtime: refinedRunTime,
            packagemanager: refinedPackageManager,
            scripts:refinedScripts,
            rootfile:relativePath,
            framework:refinedFrameWork

        }
    }