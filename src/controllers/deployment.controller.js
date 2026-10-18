import { error, log } from 'node:console';
import { access, constants, readFile } from 'node:fs';
import path from 'node:path';
import decompress from 'decompress';
import { PROJECTS_DIR } from '../config/config.js';
import { mkdir,stat,readdir } from 'node:fs/promises';
import crypto from "node:crypto"
import { trusted } from 'mongoose';
import extract from 'extract-zip';
import { type } from 'node:os'; ///home/nirjal/Projects/my-projects/devdock2/deployed-projects
import { projectDetector } from '../../services/projectDetector.js';
import { runCommand } from '../../services/buildRunner.js';
import { logger } from '../../lib/logger.js';
import { startApp } from '../../services/projectStarter.js';

export async function ProjectController(req,res){
     let receivedFile = req.file;
     
     try {
        if(!req.file)return res.status(400).json({error:"please upload a file"})
            const projectId = crypto.randomUUID()
            const projectPath = path.join(PROJECTS_DIR, projectId) 

            const requiredInfos = await projectDetector(req.file.path, projectPath)
            
            const buildInfos = await runCommand(requiredInfos.installCommand, projectPath, logger)
            console.log("..................................................................................................")
            console.log("..................................................................................................")

           const startInfos = await startApp(requiredInfos,PROJECTS_DIR, logger)


            
            console.log('message reached')
           
            return res.status(201).json({
                contents: requiredInfos,
                message: "Project uploaded and extracted successfully"
                
                
                });
              
                        
        
        

     } catch (error) {
        console.log(error.message)
        console.log("error")

        return res.status(500).json({
            status:"failed",
            errormessage :error.message,
            errorstack:error.stack
        })
     }
     
}