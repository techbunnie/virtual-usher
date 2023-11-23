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

    localStorage.setItem("ALFRED__GUESTS", JSON.stringify(guests));

    return guest;
}

/**
 * search a guest within the attendance list by email
 *
 * @param {models.Guest} guestNeedle
 *
 * @returns the guest if found or null otherwise
 */
export function getGuest(guest) {
    return new models.Guest();
}
