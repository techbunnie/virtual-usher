import * as process from "node:process";

import * as db from "#alfred/db.js";
import * as server from "#alfred/server.js";
import * as serverRoutes from "#alfred/server-routes.js";


async function main() {
    try {
        db.init(
            process.env["ALFRED_DB_HOST"],
            process.env["ALFRED_DB_PORT"],
            process.env["ALFRED_DB_SCHEMA"],
            process.env["ALFRED_DB_USERNAME"],
            process.env["ALFRED_DB_PASSWORD"],
        );

        await db.connect();
    }
    catch (err) {
        process.exit(1);
    }

    server.init(process.cwd());
    serverRoutes.init(server.getApplication());

    server.run(3000);
}


main();
