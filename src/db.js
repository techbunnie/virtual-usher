import * as pg from "pg";

import * as logging from "#alfred/logging.js";


let logger;
let client;


/**
 * initialize the database connection using postgreSQL
 */
export function init(host, port, db, username, password) {
    logger = logging.root.child({
        "db.schema": db,
        "db.host":   host,
        "db.port":   port,
    });

    client = new pg.default.Client({
        host: host,
        port: port,
        database: db,
        user: username,
        password: password,
    });

    client.on("error", (err) => {
        logger.error(err, "error occured on pg client");
    });
}

/**
 * connect to the database
 *
 * @return {Promise} a promise representing the asynchronous action of connecting to the database
 */
export function connect() {
    const promise = client.connect();

    promise.then(() => {
        logger.info("successfully connected to the database");
    });
    promise.catch((err) => {
        logger.error(err, "failed to connect to the database");
    });

    return promise;
}
