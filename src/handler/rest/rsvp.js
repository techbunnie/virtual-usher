import * as logging from "#alfred/logging.js";


/**
 * performs initialization for this entire RSVP handler module
 */
export function init() {
    logging.root.info({file: import.meta.url}, "Hello from handler");
}

/**
 * serve the registration confirmation page
 *
 * @param {express.Request} request
 * @param {express.Response} response
 */
export function getConfirmation(request, response) {
    // response.render("confirmation");
    response.send("TODO: render confirmation page some day");
}
