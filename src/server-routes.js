import * as express from "express";

import * as rsvpHandler from "#alfred/handler/rest/rsvp.js";


/**
 *
 * @param {express.Application} app
 */
export function init(app) {
    rsvpHandler.init();

    registerPages(app);
    registerAPIs(app);
}


function registerPages(app) {
    app.get("/", (request, response) => {
        response.send("Hello World!");
    });

    app.get("/confirmation", rsvpHandler.getConfirmation);

    app.get("/registration", (request, response) => {
        // response.render("registration");
        response.send("TODO: render registration page some day");
    });
}

function registerAPIs(app) {
    const router = express.Router();

    router.get("/dashboard", (request, response) => {
        response.send(JSON.stringify({
            data: {
                guestPercent: 87
            }
        }));
    });

    app.use("/api", router);
}
