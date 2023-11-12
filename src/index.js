import * as pino from "pino";

import * as rsvpHandler from "#alfred/handler/rest/rsvp.js";


const logger = pino.pino();


function main() {
    logger.info("hello world!");

    rsvpHandler.init();
}

main();
