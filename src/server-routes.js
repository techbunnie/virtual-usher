/**
 *
 * @param {express.Application} app
 */
export function init(app) {

    registerPages(app);
    registerAPIs(app);
}


function registerPages(app) {
    app.get("/", (request, response) => {
        response.send("Hello World!");
    });

    app.get("/registration", (request, response) => {
        response.send("I am suppose to render registration.html here");
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
