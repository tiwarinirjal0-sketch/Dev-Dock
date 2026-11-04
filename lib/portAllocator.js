import ports from "@beyond-js/ports";
import { getOpenPort } from "../src/utils/port.helper.js";

export async function portAllocator() {
    const port = await getOpenPort()
    const isListening = await ports.check(port)

    if(isListening) {
        return port 
    }
    else throw new Error("port is not avialable port error");
    
    
    

}






