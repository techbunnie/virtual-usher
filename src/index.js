import * as process from "node:process";

import * as logging from "#alfred/logging.js";
import * as rsvpHandler from "#alfred/handler/rest/rsvp.js";
import * as server from "#alfred/server.js";
import * as serverRoutes from "#alfred/server-routes.js";


function main() {
    server.init(process.cwd());
    serverRoutes.init(server.getApplication());

    server.run(3000);
}


main();
