// Selecting the p-autocomplete element and opening the popup
const ele = document.querySelector<HTMLElement>("#destination");
if (ele) {
  // Triggering the event to open the popup
  ele.dispatchEvent(new Event("click"));

  // Selecting the list item that matches "AKOLA JN - AK"
  const listItems = ele.querySelectorAll<HTMLElement>("li");
  listItems.forEach((l) => {
    if (l.innerText === "MALKAPUR JN - AK") {
      l.click();
    }
  });
}

// Updating the inner HTML of a list within #origin
const originList = document.querySelector<HTMLUListElement>("#origin ul");
if (originList) {
  const listItem = document.querySelector<HTMLLIElement>(
    "#origin ul li:nth-child(2)"
  );
  if (listItem) {
    originList.innerHTML = listItem.innerHTML + originList.innerHTML;
  }
}

// Handling dropdowns
const journeyQuotaButton = document.querySelector<HTMLElement>(
  "#journeyQuota div[role=button]"
);
if (journeyQuotaButton) {
  journeyQuotaButton.click();
  const quotaItems = document.querySelectorAll<HTMLElement>(
    "#journeyQuota ul li"
  );
  if (quotaItems[4]) {
    quotaItems[4].click();
  }
}

// Setting the journey date
const dateInput = document.querySelector<HTMLInputElement>(
  "#jDate > span > input"
);
if (dateInput) {
  dateInput.value = "17/01/2023";
}

// Handling checkboxes
const concessionCheckbox =
  document.querySelector<HTMLInputElement>("#concessionBooking");
const dateSpecificCheckbox =
  document.querySelector<HTMLInputElement>("#dateSpecific");
const availableBerthCheckbox =
  document.querySelector<HTMLInputElement>("#availableBerth");
const passBookingCheckbox =
  document.querySelector<HTMLInputElement>("#passBooking");

if (concessionCheckbox) {
  concessionCheckbox.checked = false;
}

if (dateSpecificCheckbox) {
  dateSpecificCheckbox.checked = false;
}

if (availableBerthCheckbox) {
  availableBerthCheckbox.checked = false;
}

if (passBookingCheckbox) {
  passBookingCheckbox.checked = false;
}
