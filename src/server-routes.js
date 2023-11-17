/**
 *
 * @param {express.Application} app
 */
export function init(app) {
    app.get("/", (request, response) => {
        response.send("Hello World!");
    });

    app.get("/registration", (request, response) => {
        response.send("I am suppose to render registration.html here");
    });

    app.get("/dashboard", (request, response) => {
        response.send(JSON.stringify({
            data: {
                guestPercent: 87
            }
        }));
    });

}
