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

    constructor(data) {
        if (typeof data == "object" && data != null) {
            this.id = data["id"] || null;
            this.email = data["email"] || null;

            this.confirmedAt = data["confirmedAt"] || null;
            this.confirmedAt = (this.confirmedAt !== null)
                             ? new Date(this.confirmedAt)
                             : null;

            this.checkedinAt = data["checkedinAt"] || null;
            this.checkedinAt = (this.checkedinAt !== null)
                             ? new Date(this.checkedinAt)
                             : null;

            this.createdAt = data["createdAt"] || null;
            this.createdAt = (this.createdAt !== null)
                             ? new Date(this.createdAt)
                             : null;

            return;
        }

        this.id = null;
        this.email = null;
        this.confirmedAt = null;
        this.checkedinAt = null;
        this.createdAt = null;
    }
}
