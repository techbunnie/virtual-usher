/**
 * represents an event and its related information
 *
 * @property {String} id
 * @property {Number} expectedGuests
 * @property {Date}   createdAt
 * @property {Date}   updatedAt
 */
export class Event {
    id;
    expectedGuests;
    createdAt;
    updatedAt;

    constructor(data) {
        if (typeof data == "object" && data != null) {
            this.id = data["id"] || null;
            this.expectedGuests = data["expectedGuests"] || null;

            this.createdAt = data["createdAt"] || null;
            this.createdAt = (this.createdAt !== null)
                             ? new Date(this.createdAt)
                             : null;

            this.updatedAt = data["updatedAt"] || null;
            this.updatedAt = (this.updatedAt !== null)
                            ? new Date(this.updatedAt)
                            : null;

            return;
        }

        this.id = null;
        this.expectedGuests = null;
        this.createdAt = null;
        this.updatedAt = null;
    }

    setExpectedGuests(value) {
        if (value <= 0)
            throw new Error("invalid expected guests value");

        this.expectedGuests = value;
    }
}


/**
 * represents a guest entry for the event
 *
 * @property {String} id
 * @property {String} email
 * @property {Date}   confirmedAt
 * @property {Date}   checkedinAt
 * @property {Date}   createdAt
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
