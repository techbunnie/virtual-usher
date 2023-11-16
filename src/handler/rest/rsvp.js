import * as pino from "pino";


const logger = pino.pino();


export function init() {
    logger.info({file: import.meta.url}, "Hello from handler");
}

export function postRSVP() {

}
