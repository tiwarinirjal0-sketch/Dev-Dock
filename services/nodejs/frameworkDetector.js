/*
  -after finding out project type 
  -we will analyze into the dependencies to identify the framework

*/

import { searchFile } from "../../src/utils/helper.js";


export async function FrameWorkDetection(packageJson){
    const frameWorks = []
     const backendFrameworks = [
            { name: "express", package: "express" },
            { name: "fastify", package: "fastify" },
            { name: "nestjs", package: "@nestjs/core" },
            { name: "koa", package: "koa" },
            { name: "hapi", package: "@hapi/hapi" },
            { name: "hono", package: "hono" },
            { name: "adonisjs", package: "@adonisjs/core" },
            { name: "feathers", package: "@feathersjs/feathers" },
            { name: "sails", package: "sails" },
            { name: "loopback", package: "@loopback/core" }
            ];    

    for(const frameWork of backendFrameworks){
        const frameWorkName = frameWork.name
        const detected = packageJson.dependencies[frameWorkName] ? true : false;      
          if(detected) {
            frameWorks.push(frameWork)
            console.log(1)
        }
    }
    frameWorks.forEach((f)=>{
        console.log(f)
        console.log(2)
    })
}