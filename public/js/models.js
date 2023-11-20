/**
 * @property {string} id
 * @property {string} email
 * @property {Date} confirmedAt
 * @property {Date} checkedinAt
 * @property {Date} createdAt
 */
export class Guest {
    id;
    email;
    confirmedAt;
    checkedinAt;
    createdAt;

    constructor() {
        this.id = null;
        this.email = null;
        this.confirmedAt = null;
        this.checkedinAt = null;
        this.createdAt = null;
    }
}
