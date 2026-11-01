import { searchFile } from "../../src/utils/helper.js";

export async function lockFileDetector(filePath){
     let lockFile = await searchFile(filePath,"package-lock.json")
     if(lockFile) return {command:"npm", args:["ci"]}
     
}