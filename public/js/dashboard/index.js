import * as models from "/js/models.js";
import * as api from "/js/dashboard/api.js";


let $form       = null,
    $percentage = null;

/**
 * computes and renders the percentage of attendees vs the expected number of guests set for the event
 *
 * @param {models.Event} event
 */
function computeGuestPercent(event) {
    const count   = api.getGuests().length;
    let   percent;

    if (event.expectedGuests === null || event.expectedGuests === 0)
        percent = 0;
    else
        percent = count / event.expectedGuests * 100;

    $percentage.innerText = `${percent.toFixed(0)}%`;
}

function onDocumentLoaded(htmlEvent) {
    const event = api.getEvent();

    $form.elements["expected-guest"].value = event.expectedGuests;
    computeGuestPercent(event);
}

function onGuestAdminFormSubmitted(htmlEvent) {
    htmlEvent.preventDefault();

    const $source = htmlEvent.currentTarget,
          $input  = $source.elements["expected-guest"];

    const event = api.getEvent();

    try {
        if (event === null)
            throw new Error("event object is required");

        event.setExpectedGuests(parseInt($input.value));
        event.updatedAt = new Date();
        api.putEvent(event);
    }
    catch (error) {
        console.error("validation error occurred", error);
    }

    computeGuestPercent(event);
}

;!function main() {
    $form       = document.getElementById("admin-count-form"),
    $percentage = document.getElementById("guest-percent");

    document.addEventListener("DOMContentLoaded", onDocumentLoaded);

    $form.addEventListener("submit", onGuestAdminFormSubmitted);
}();
