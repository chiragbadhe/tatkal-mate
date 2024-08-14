# Tatkal Mate

## Overview

**Tatkal Mate** is a Chrome Extension designed to automate and streamline the Tatkal train ticket booking process on the IRCTC website. By simplifying tasks such as autofilling login credentials, journey details, passenger information, and managing the final booking process, it ensures a faster and more efficient booking experience.

## Features

- **Automated Login**: Quickly log in by autofilling your credentials.
- **Journey Details**: Automatically inputs journey details like origin, destination, date, and class.
- **Passenger Details**: Efficiently fills in the details for passengers and infants.
- **Contact & Payment Details**: Handles contact information and payment method selection seamlessly.
- **Booking Finalization**: Manages the final booking steps, including captcha handling and payment confirmation.

## Installation

1. **Open Chrome**: Launch Google Chrome.

2. **Access Extensions**: Navigate to the Extensions page by typing `chrome://extensions/` in the address bar.

3. **Enable Developer Mode**: Toggle the "Developer mode" switch in the top right corner.

4. **Load Unpacked**: Click the "Load unpacked" button and select the extension directory from the cloned repository.

5. **Verify Installation**: Ensure the extension appears in your list of installed extensions. Click on the extension icon to start using it.

## Usage

1. **Login to IRCTC**: Visit the IRCTC website and use the extension to autofill your login credentials.

2. **Fill Journey Details**: Automatically enter journey details like origin station, destination station, travel date, and class.

3. **Enter Passenger Details**: Provide passenger and infant details, which the extension will autofill.

4. **Select Payment Method**: Choose your payment method, and let the extension manage payment details.

5. **Finalize Booking**: The extension will handle the final steps, including captcha resolution and payment confirmation.

## Development

### Requirements

- **Chrome Browser**: Required to run and test the extension.
- **JavaScript/TypeScript**: Used for the extension's core functionality.
- **Chrome APIs**: Used for interacting with the browser and the IRCTC website.

### Code Structure

- **`background.ts`**: Contains the background script logic for handling events.
- **`content.ts`**: Manages content scripts that interact with the IRCTC web pages.
- **`popup.ts`**: Controls the popup UI and user interactions.
- **`manifest.json`**: Defines the extension's metadata, permissions, and configurations.
- **`styles.css`**: Provides styles for the extension's popup UI.

## License

This project is licensed under the [MIT License](LICENSE).

