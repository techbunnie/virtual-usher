import * as api from "/public/js/registration/api.js"
import * as models from "/public/js/models.js"


;!function main() {
    let now = new Date(),
        guest;

    guest = new models.Guest();
    guest.confirmedAt = null;
    guest.checkedinAt = now;
    guest.createdAt = now;

    guest = api.postRegistration(guest);

    console.log("Registered guest:", guest);
}();
