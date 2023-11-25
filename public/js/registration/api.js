import * as models from "/public/js/models.js";
import * as store from "/public/js/store.js";


/**
 * register a guest's attendance
 *
 * @param {models.Guest} guest the guest who checked-in to the app
 */
export function postRegistration(guest) {
    /**
     * @type Guest[]
     */
    let guests;

    if (guest.id !== null || (guest.id !== null && guest.id.trim() === ""))
        throw new Error("guest already registered");

    guests = localStorage.getItem(store.StorageKeyGuests);
    guests = (guests === null)
           ? []
           : JSON.parse(guests);

    guest.id = crypto.randomUUID();
    guests.push(guest);

    localStorage.setItem(store.StorageKeyGuests, JSON.stringify(guests));

    return guest;
}

/**
 * search a guest within the attendance list by email
 *
 * @param {models.Guest} guestNeedle
 *
 * @returns {models.Guest} the guest if found or null otherwise
 */
export function getGuest(guestNeedle) {
    /**
     * @type Guest[]
     */
    let guests,
        guest;

    if (guestNeedle === null)
        return null;

    guests = localStorage.getItem(store.StorageKeyGuests);

    if (guests == null)
        return null;

    guest = JSON.parse(guests)
        .map((item) => {
            return new models.Guest(item);
        })
        .find((item) => {
            return item.email === guestNeedle.email;
        });

    if (guest === undefined || guest === null)
        return null;
    else
        return guest;
}
