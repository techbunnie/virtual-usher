import * as path from "node:path";

import * as express from "express";

import * as logging from "#alfred/logging.js";


let app;


/**
 * initialize and configure the ExpressJS application
 *
 * @param {string} basePath base directory on where this project is running
 */
export function init(basePath) {
    app = express.default();

    app.set("views", path.join(basePath, "public"));
    app.set("view engine", "ejs");
    app.set("alfred.logger", logging.root);

    app.use("/public", express.static(path.join(basePath, "public")));

    app.use((request, response, next) => {
        request.log = logging.root.child({
            "request.url": request.path
        });

        request.log.info(`received a ${request.method} request`);
        next();
    });

    return app;
}

/**
 * run the ExpressJS server
 *
 * @param {number} port
 * @param {boolean} secure
 *
 * @returns {http.Server}
 */
export function run(port) {
    if (app == null)
        return; // TODO throw an exception????

    app.listen(port, () => {
        logging.root.info(`now listening at port ${port}`);
    });
}

/**
 * get the current ExpressJS application instance
 *
 * @returns {express.Application}
 */
export function getApplication() {
    return app;
}
