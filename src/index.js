import express from "express";
import * as pino from "pino";

import * as rsvpHandler from "#alfred/handler/rest/rsvp.js";


const logger = pino.pino();


const expressApp = express();
const expressPort = 3000;

expressApp.get("/", (request, response) => {
    response.send("Hello World!");
});

expressApp.get("/registration", (request, response) => {
    response.send("I am suppose to render registration.html here");
});

expressApp.get("/dashboard", (request, response) => {
    response.send(JSON.stringify({
        data: {
            guestPercent: 87
        }
    }));
});

function main() {
    logger.info("hello world!");

    rsvpHandler.init();
}

main();

expressApp.listen(expressPort, () => {
    logger.info(`example application now listening at port: ${expressPort}`);
});