// Define the interfaces
interface Station {
  english_label: string;
  hindi_label: string;
  value: string;
}

interface StationDetails {
  hindi_label: string;
  english_label: string;
  station_code: string;
}

interface Passenger {
  name?: string;
  age?: number;
  gender?: string;
  berth?: string;
  nationality?: string;
}

interface Infant {
  name?: string;
  age?: number;
  gender?: string;
}

interface ContactDetails {
  mobileNumber?: string;
  email?: string;
}

interface GSTDetails {
  gstin_number?: string;
  gstin_name?: string;
  gstin_flat?: string;
  gstin_street?: string;
  gstin_area?: string;
  gstin_PIN?: string;
  gstin_City?: string;
}

interface PaymentPreferences {
  payment_type?: string;
}

interface TravelPreferences {
  travel_insurance_opted?: boolean;
}

interface OtherPreferences {
  auto_upgradation?: boolean;
  confirm_berths?: boolean;
  reservation_choice?: string;
  coach_id?: string;
}

interface FinalData {
  irctc_credentials: {
    user_name?: string;
    password?: string;
  };
  journey_details: {
    from?: StationDetails;
    destination?: StationDetails;
    journey_class?: string;
    quota?: string;
    journey_date?: string;
  };
  extension_data: {
    book_at_tatkal_time: boolean;
  };
  passenger_details: Passenger[];
  infant_details: Infant[];
  contact_details: ContactDetails;
  gst_details: GSTDetails;
  payment_preferences: PaymentPreferences;
  travel_preferences: TravelPreferences;
  other_preferences: OtherPreferences;
}

interface PassengerGender {
  value: string;
  label: string;
}

interface InfantGender {
  value: string;
  label: string;
}

interface InfantAge {
  value: string;
  label: string;
}

interface Country {
  countryCode: string;
  country: string;
}

interface ReservationChoice {
  value: string;
  label: string;
}

// Define the final data structure
const finalData: FinalData = {
  irctc_credentials: {},
  journey_details: {},
  extension_data: {
    book_at_tatkal_time: true,
  },
  passenger_details: [],
  infant_details: [],
  contact_details: {},
  gst_details: {
      "gstin-number": "",
      "gstin-name": "",
      "gstin-flat": "",
      "gstin-street": "",
      "gstin-area": "",
      "gstin-PIN": "",
      "gstin-City": ""
  },
  payment_preferences: {
      paymentType: ""
  },
  travel_preferences: {
      travelInsuranceOpted: ""
  },
  other_preferences: {
      autoUpgradation: false,
      confirmberths: false,
      coachId: "",
      reservationChoice: ""
  },
};

// Example lists (replace with actual data)
const stationList: Station[] = [];
const classList: { label: string; value: string }[] = [];
const quotaList: { label: string; value: string }[] = [];
const passengerGenderList: PassengerGender[] = [];
const infantGenderList: InfantGender[] = [];
const infantAge: InfantAge[] = [];
const countryList: Country[] = [];
const reservationChoiceList: ReservationChoice[] = [];

// Utility function for dropdowns
function addDropdownOption<T>(
  inputId: string,
  dropdownId: string,
  clickHandler: (event: Event) => void,
  dataList: T[],
  templateFn: (q: T) => string
) {
  const dropdown = document.querySelector<HTMLElement>(`#${dropdownId}`);
  const input = document.querySelector<HTMLInputElement>(`#${inputId}`);

  if (input && dropdown) {
    input.addEventListener("focus", () => {
      dropdown.style.display = "block";
    });

    dropdown.innerHTML = dataList.map(templateFn).join("");
    const items = dropdown.querySelectorAll(".dropdown-list-item");
    items.forEach((item) => item.addEventListener("click", clickHandler));
  }
}

// Utility function to add options to a select element
function addSelectOption<T>(
  selectId: string,
  dataList: T[],
  templateFn: (q: T, i: number) => string
) {
  const select = document.querySelector<HTMLSelectElement>(`#${selectId}`);

  if (select) {
    select.innerHTML = dataList.map(templateFn).join("");
  }
}

// Utility function for filtering dropdown items
function filterDropdown<
  T extends { english_label: string; hindi_label: string; value: string }
>(inputId: string, dropdownId: string, dataList: T[]) {
  const input = document.querySelector<HTMLInputElement>(`#${inputId}`);
  const dropdown = document.querySelector<HTMLElement>(`#${dropdownId}`);

  if (input && dropdown) {
    const searchText = input.value.toLowerCase();
    const filteredItems = dataList.filter((item) =>
      item.english_label.toLowerCase().includes(searchText)
    );

    dropdown.innerHTML = filteredItems
      .map(
        (q) =>
          `<li data-english-label="${q.english_label}" data-hindi-label="${q.hindi_label}" data-station-code="${q.value}" class="dropdown-list-item">${q.english_label} - ${q.value}</li>`
      )
      .join("");

    const items = dropdown.querySelectorAll(".dropdown-list-item");
    items.forEach((item) => item.addEventListener("click", () => {}));
  }
}

// Initialize event listeners
window.addEventListener("load", () => {
  addDropdownOption<Station>(
    "from-station-input",
    "from-station-list",
    setFromStation,
    stationList,
    (q) =>
      `<li data-english-label="${q.english_label}" data-hindi-label="${q.hindi_label}" data-station-code="${q.value}" class="dropdown-list-item">${q.english_label} - ${q.value}</li>`
  );

  addDropdownOption<Station>(
    "destination-station-input",
    "destination-station-list",
    setDestinationStation,
    stationList,
    (q) =>
      `<li data-english-label="${q.english_label}" data-hindi-label="${q.hindi_label}" data-station-code="${q.value}" class="dropdown-list-item">${q.english_label} - ${q.value}</li>`
  );

  addDropdownOption<{ label: string; value: string }>(
    "journey-class-input",
    "journey-class-list",
    setJourneyClass,
    classList,
    (q) =>
      `<li class="dropdown-list-item" data-label="${q.label}" data-class="${q.value}">${q.label}</li>`
  );

  addDropdownOption<{ label: string; value: string }>(
    "quota-input",
    "quota-list",
    setQuota,
    quotaList,
    (q) =>
      `<li class="dropdown-list-item" data-label="${q.label}" data-quota="${q.value}">${q.label}</li>`
  );

  addSelectOption<PassengerGender>(
    "passenger-gender-1",
    passengerGenderList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.value}" data-label="${q.label}" data-index="${i}" data-gender="${q.value}">${q.label}</option>`
  );
  addSelectOption<PassengerGender>(
    "passenger-gender-2",
    passengerGenderList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.value}" data-label="${q.label}" data-index="${i}" data-gender="${q.value}">${q.label}</option>`
  );
  addSelectOption<PassengerGender>(
    "passenger-gender-3",
    passengerGenderList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.value}" data-label="${q.label}" data-index="${i}" data-gender="${q.value}">${q.label}</option>`
  );
  addSelectOption<PassengerGender>(
    "passenger-gender-4",
    passengerGenderList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.value}" data-label="${q.label}" data-index="${i}" data-gender="${q.value}">${q.label}</option>`
  );

  addSelectOption<Country>(
    "passenger-nationality-1",
    countryList,
    (q, i) =>
      `<option class="dropdown-list-item" ${
        q.countryCode === "IN" ? "selected" : ""
      } value="${q.countryCode}" data-label="${
        q.country
      }" data-index="${i}" data-nationality="${q.countryCode}">${
        q.country
      }</option>`
  );
  addSelectOption<Country>(
    "passenger-nationality-2",
    countryList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.countryCode}" data-label="${q.country}" data-index="${i}" data-nationality="${q.countryCode}">${q.country}</option>`
  );
  addSelectOption<Country>(
    "passenger-nationality-3",
    countryList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.countryCode}" data-label="${q.country}" data-index="${i}" data-nationality="${q.countryCode}">${q.country}</option>`
  );
  addSelectOption<Country>(
    "passenger-nationality-4",
    countryList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.countryCode}" data-label="${q.country}" data-index="${i}" data-nationality="${q.countryCode}">${q.country}</option>`
  );

  addSelectOption<ReservationChoice>(
    "reservation-choice",
    reservationChoiceList,
    (q, i) =>
      `<option class="dropdown-list-item" value="${q.value}" data-label="${q.label}" data-index="${i}" data-choice="${q.value}">${q.label}</option>`
  );

  filterDropdown<Station>(
    "from-station-input",
    "from-station-list",
    stationList
  );
  filterDropdown<Station>(
    "destination-station-input",
    "destination-station-list",
    stationList
  );
});

function setFromStation(event: Event): void {
  throw new Error("Function not implemented.");
}

function setDestinationStation(event: Event): void {
  throw new Error("Function not implemented.");
}

function setJourneyClass(event: Event): void {
  throw new Error("Function not implemented.");
}

function setQuota(event: Event): void {
  throw new Error("Function not implemented.");
}
