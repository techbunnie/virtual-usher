import * as models from "/public/js/models.js";
import * as store from "/public/js/store.js";


/**
 * get event details from the store
 *
 * NOTE:
 * we have no backend. So to simplify implementation, we can always fetch the same event without any
 * search criteria just because there'll always just be one event anyways.
 *
 * @return {models.Event} the event object
 */
export function getEvent() {
    const events = localStorage.getItem(store.StorageKeyEvents);

    if (events === null)
        return new models.Event();

    return JSON.parse(events).map((item) => {
        return new models.Event(item);
    })[0];
}

/**
 * updates the event in the store
 *
 * NOTE:
 * we have no backend. So to simplify implementation, we can always fetch the same event without any
 * search criteria just because there'll always just be one event anyways.
 *
 * @param {models.Event} event
 */
export function putEvent(event) {
    if (event === null)
        throw new Error("event is required")

    if (event.id === null) {
        event.id = crypto.randomUUID();
        event.createdAt = event.updatedAt;
    }

    localStorage.setItem(store.StorageKeyEvents, JSON.stringify([event]));

    return event;
}

/**
 * get the list of guests from the store
 *
 * @return {models.Guest[]} the list of guests or an empty list if the store does not exist yet
 */
export function getGuests() {
    /**
     * @type Guest[]
     */
    const guests = localStorage.getItem(store.StorageKeyGuests);

    if (guests == null)
        return [];

    return JSON.parse(guests).map((item) => {
        return new models.Guest(item);
    });
}
