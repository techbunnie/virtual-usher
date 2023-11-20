import * as models from "/public/js/models.js"


;!function main() {
    let guests;

    guests = localStorage.getItem("ALFRED__GUESTS");
    guests = JSON.parse(guests);


    console.log("You have the following guests registered:");

    if (guests === null) {
        console.log("None");
        return;
    }

    guests.forEach((guestJSON) => {
        const guest = new models.Guest();

        guest.id = guestJSON.id;
        guest.name = guestJSON.name;
        guest.email = guestJSON.email;

        if (guestJSON.confirmedAt !== null)
            guest.confirmedAt = new Date(guestJSON.confirmedAt);
        else
            guest.confirmedAt = null;

        if (guestJSON.checkedinAt !== null)
            guest.checkedinAt = new Date(guestJSON.checkedinAt);
        else
            guest.checkedinAt = null;

        if (guestJSON.createdAt !== null)
            guest.createdAt = new Date(guestJSON.createdAt);
        else
            guest.createdAt = null;

        console.log(guest);
    });

    console.log(`Total: ${guests.length} guests`)
}();
