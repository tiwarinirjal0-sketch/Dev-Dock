import { check } from "@beyond-js/ports";
import { getOpenPort } from "../src/utils/port.helper";

export async function portAllocator() {
    const port = await getOpenPort()
    console.log(port)
    

}






