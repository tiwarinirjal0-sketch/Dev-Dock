import { searchFile } from "../../src/utils/helper.js"

export async function rootDetector(filePath){
    let mainFilePath = ""
    const baseRootFiles = [
        "index.js",
        "server.js"
    ]
    for(const file of baseRootFiles){
        const detected = await searchFile(filePath, file)
        if(detected) mainFilePath = detected 
    }
    return mainFilePath
}