interface ClassList {
  label: string;
  value: string;
}

interface QuotaList {
  label: string;
  value: string;
}

interface GenderList {
  label: string;
  value: string;
}

interface AgeList {
  label: string;
  value: number;
}

interface BerthChoice {
  label: string;
  value: string;
}

interface ReservationChoice {
  value: string;
  label: string;
}

interface UserJourneyDetails {
  from: {
    hindi_label: string;
    english_label: string;
    station_code: string;
  };
  destination: {
    hindi_label: string;
    english_label: string;
    station_code: string;
  };
  date: string;
  class: ClassList;
  quota: QuotaList;
}

interface UserCredentials {
  user_name: string;
  password: string;
}

interface PassengerDetail {
  name: string;
  age: string;
  gender?: string;
  berth: string;
}

interface InfantDetail {
  name: string;
  age: string;
}

interface ContactDetails {
  mobileNumber?: string;
  email?: string;
}

interface GSTDetails {
  "gstin-number": string;
  "gstin-name": string;
  "gstin-flat": string;
  "gstin-street": string;
  "gstin-area": string;
  "gstin-PIN": string;
  "gstin-City": string;
}

interface PaymentPreferences {
  paymentType: string;
}

interface TravelPreferences {
  travelInsuranceOpted: string;
}

interface OtherPreferences {
  autoUpgradation: boolean;
  confirmberths: boolean;
  coachId: string;
  reservationChoice: string;
}

interface UserData {
  journey_details: UserJourneyDetails;
  irctc_credentials: UserCredentials;
  passenger_details: PassengerDetail[];
  infant_details: InfantDetail[];
  contact_details: ContactDetails;
  gst_details?: GSTDetails;
  payment_preferences: PaymentPreferences;
  travel_preferences: TravelPreferences;
  other_preferences: OtherPreferences;
}

const classLists: ClassList[] = [
  {
    label: "AC First Class (1A)",
    value: "1A",
  },
  {
    label: "Vistadome AC (EV)",
    value: "EV",
  },
  {
    label: "Exec. Chair Car (EC)",
    value: "EC",
  },
  {
    label: "AC 2 Tier (2A)",
    value: "2A",
  },
  {
    label: "AC 3 Tier (3A)",
    value: "3A",
  },
  {
    label: "AC 3 Economy (3E)",
    value: "3E",
  },
  {
    label: "AC Chair car (CC)",
    value: "CC",
  },
  {
    label: "Sleeper (SL)",
    value: "SL",
  },
  {
    label: "Second Sitting (2S)",
    value: "2S",
  },
];

const quotaLists: QuotaList[] = [
  {
    label: "GENERAL",
    value: "GN",
  },
  {
    label: "LADIES",
    value: "LD",
  },
  {
    label: "LOWER BERTH/SR.CITIZEN",
    value: "SS",
  },
  {
    label: "PERSON WITH DISABILITY",
    value: "HP",
  },
  {
    label: "TATKAL",
    value: "TQ",
  },
  {
    label: "PREMIUM TATKAL",
    value: "PT",
  },
];

const passengerGenderLists: GenderList[] = [
  {
    label: "Male",
    value: "M",
  },
  {
    label: "Female",
    value: "F",
  },
  {
    label: "Transgender",
    value: "T",
  },
];

const infantGenderLists: GenderList[] = [
  {
    label: "Male",
    value: "M",
  },
  {
    label: "Female",
    value: "F",
  },
  {
    label: "Transgender",
    value: "T",
  },
];

const infantAges: AgeList[] = [
  {
    label: "Below one year",
    value: 0,
  },
  {
    label: "One year",
    value: 1,
  },
  {
    label: "Two years",
    value: 2,
  },
  {
    label: "Three years",
    value: 3,
  },
  {
    label: "Four years",
    value: 4,
  },
];

const berthChoiceLists: Record<string, BerthChoice[]> = {
  "2S": [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Window Side",
      value: "WS",
    },
  ],
  CC: [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Window Side",
      value: "WS",
    },
  ],
  EV: [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Window Side",
      value: "WS",
    },
  ],
  EC: [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Window Side",
      value: "WS",
    },
  ],
  SL: [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Lower",
      value: "LB",
    },
    {
      label: "Middle",
      value: "MB",
    },
    {
      label: "Upper",
      value: "UB",
    },
    {
      label: "Side Lower",
      value: "SL",
    },
    {
      label: "Side Upper",
      value: "SU",
    },
  ],
  "3E": [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Lower",
      value: "LB",
    },
    {
      label: "Middle",
      value: "MB",
    },
    {
      label: "Upper",
      value: "UB",
    },
    {
      label: "Side Lower",
      value: "SL",
    },
    {
      label: "Side Upper",
      value: "SU",
    },
  ],
  "3A": [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Lower",
      value: "LB",
    },
    {
      label: "Middle",
      value: "MB",
    },
    {
      label: "Upper",
      value: "UB",
    },
    {
      label: "Side Lower",
      value: "SL",
    },
    {
      label: "Side Upper",
      value: "SU",
    },
  ],
  "2A": [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Lower",
      value: "LB",
    },
    {
      label: "Upper",
      value: "UB",
    },
    {
      label: "Side Lower",
      value: "SL",
    },
    {
      label: "Side Upper",
      value: "SU",
    },
  ],
  "1A": [
    {
      label: "No Preference",
      value: "",
    },
    {
      label: "Lower",
      value: "LB",
    },
    {
      label: "Upper",
      value: "UB",
    },
    {
      label: "Cabin",
      value: "CB",
    },
    {
      label: "Coupe",
      value: "CP",
    },
  ],
};

const reservationChoiceLists: ReservationChoice[] = [
  { value: "Reservation Choice", label: "Reservation Choice" },
  {
    value: "Book, only if all berths are allotted in same coach.",
    label: "Book, only if all berths are allotted in same coach.",
  },
  {
    value: "Book, only if at least 1 lower berth is allotted.",
    label: "Book, only if at least 1 lower berth is allotted.",
  },
  {
    value: "Book, only if 2 lower berths are allotted.",
    label: "Book, only if 2 lower berths are allotted.",
  },
];
