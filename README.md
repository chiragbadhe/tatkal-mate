# Tatkal Mate

## Overview

The IRCTC Tatkal Booking Chrome Extension automates the train ticket booking process on the IRCTC website. It simplifies tasks such as autofilling login credentials, journey details, passenger information, and finalizing Tatkal reservations.

## Features

- **Automated Login**: Autofills login credentials to streamline the login process.
- **Journey Details**: Automatically populates journey details including origin, destination, date, and class.
- **Passenger Details**: Inputs passenger and infant details efficiently.
- **Contact & Payment Details**: Fills in contact information and selects payment methods for the booking.
- **Booking Finalization**: Completes the booking process, including captcha handling and payment confirmation.


## Installation

1. **Open Chrome**: Launch Google Chrome.

2. **Access Extensions**: Go to the Extensions page by navigating to `chrome://extensions/`.

3. **Enable Developer Mode**: Toggle the "Developer mode" switch on the top right.

4. **Load Unpacked**: Click the "Load unpacked" button and select the extension directory from the cloned repository.

5. **Verify Installation**: The extension should now appear in the list of installed extensions. Click on the extension icon to start using it.

## Usage

1. **Login to IRCTC**: Open the IRCTC website and use the extension to autofill your login credentials.

2. **Fill Journey Details**: Utilize the extension to automatically enter journey information such as the origin station, destination station, travel date, and class.

3. **Enter Passenger Details**: Provide details for passengers and infants, which will be filled in automatically by the extension.

4. **Select Payment Method**: Choose the payment method and allow the extension to handle payment information.

5. **Finalize Booking**: The extension will manage the final steps of the booking, including captcha resolution and payment confirmation.

## Development

### Requirements

- **Chrome Browser**: To run and test the extension.
- **JavaScript/TypeScript**: For the extension's core functionality.
- **Chrome APIs**: For interacting with the browser and IRCTC website.

### Code Structure

- **`background.ts`**: Contains background script logic.
- **`content.ts`**: Handles content scripts that interact with the web page.
- **`popup.ts`**: Manages the popup UI and user interactions.
- **`manifest.json`**: Defines the extension's metadata and permissions.
- **`styles.css`**: Styles for the popup UI.

## License

This project is licensed under the [MIT License](LICENSE).
