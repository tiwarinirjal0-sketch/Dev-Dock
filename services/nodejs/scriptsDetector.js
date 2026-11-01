export async function scriptsDetector(packageJson){
    const scripts = []
    const scriptBases = [
        "build",
        "start",
        "dev",
        "test"
    ]
    for(const scriptName of scriptBases ){
        if(packageJson.scripts[scriptName]){
            scripts.push({name:scriptName,script:packageJson.scripts[scriptName]})
        }else{
            scripts.push({name:scriptName,script:null})
        }
    }
    scripts.forEach((f=>{
        console.log(f.script)
        console.log(4)
    }))
    return scripts
}