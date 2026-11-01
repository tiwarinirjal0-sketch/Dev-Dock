import { ProjectTypeDetector } from './projectTypeDetector.js';
import { FrameWorkDetection } from '../nodejs/frameworkDetector.js';
import { packageManagerDetector } from '../nodejs/packageManagerDetector.js';
import { scriptsDetector } from '../nodejs/scriptsDetector.js';
import { rootDetector } from './rootDetector.js';
import { searchFile } from '../../src/utils/helper.js';
import { readFile } from 'node:fs/promises';


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
              
        console.log("5")  
        return {
            runTime:runTime,
            packageManager,
            scripts,
            rootFile,
            frameWork

        }
    }