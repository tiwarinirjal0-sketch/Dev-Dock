import ports from "@beyond-js/ports";
import test from "node:test"
import { getOpenPort } from "../../src/utils/port.helper.js";
import assert from "node:assert";

test("retrun if the port is litening ",async()=>{
    const port = await getOpenPort()
    const isListening = await ports.check(port)
    assert.equal(isListening,true)
})