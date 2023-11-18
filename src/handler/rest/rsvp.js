import * as logging from "#alfred/logging.js";


export function init() {
    logging.root.info({file: import.meta.url}, "Hello from handler");
}

export function getConfirmation(request, response) {
    // response.render("confirmation");
    response.send("TODO: render confirmation page some day");
}
