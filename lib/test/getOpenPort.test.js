import test from "node:test";
import assert from "node:assert";
import { getOpenPort } from "../../src/utils/port.helper.js"

test("should return the available ports", async () => {
    const port = await getOpenPort();

    console.log("Port:", port);
    console.log("Type:", typeof port);

    assert.ok(Number.isInteger(port));
});