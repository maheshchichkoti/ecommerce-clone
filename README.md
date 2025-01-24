# E-commerce Clone

A modern e-commerce web application built with React, utilizing the Fake API from Platzi. This project demonstrates front-end development skills, API integration, and user authentication.

**Firebase Configuration:**

You will need to create a Firebase project in the [Firebase Console](https://console.firebase.google.com/) and obtain your project's configuration details.

The following environment variables need to be set:

- `VITE_FIREBASE_API_KEY`: Your Firebase project's API key.
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase project's Auth domain.
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project's Project ID.
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase project's Storage bucket.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase project's Messaging Sender ID.
- `VITE_FIREBASE_APP_ID`: Your Firebase project's App ID.
- `VITE_FIREBASE_MEASUREMENT_ID`: (Optional) Your Firebase project's Measurement ID (for Google Analytics).

**How to Obtain Firebase Configuration:**

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create or select your project.
2.  Click on the "Project settings" icon (gear icon) next to "Project Overview" in the left sidebar.
3.  Scroll down to the "Your apps" section and select the web app (</>). If you haven't created a web app yet, create one.
4.  You will find your Firebase configuration details in the "Firebase SDK snippet" section. Choose the "Config" option.
5.  Copy the values for `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, and `measurementId` from the config object.

**Setting up Environment Variables:**

You will need to set these environment variables in your development environment. The method for setting environment variables depends on your operating system and development setup. Common methods include:

- **`.env.local` file (for Vite projects - as you are using):** Create a file named `.env.local` in the root of your project and add the variables like this:

  ```
  VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
  VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN_HERE
  VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID_HERE
  VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET_HERE
  VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID_HERE
  VITE_FIREBASE_APP_ID=YOUR_APP_ID_HERE
  VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID_HERE
  ```

  **Important:** Do _not_ commit the `.env.local` file to your repository as it might contain sensitive information. `.env.local` is usually added to `.gitignore` by default in Vite projects.

- **System Environment Variables:** You can also set these variables directly in your operating system's environment variables settings.

**After setting up the environment variables, you should be able to run the application with Firebase features enabled.**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ecommerce-clone.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ecommerce-clone
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Firebase configuration and any other necessary environment variables.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

## Usage

1. **Browse Products:** Visit the home page to see a listing of available products. Use category links in the navigation bar to filter products by category.
2. **Search for Products:** Use the search bar at the top of the home page to search for specific products by keywords.
3. **Sort Products:** Utilize the "Sort By" dropdown on the home page to arrange products by price or newness.
4. **View Product Details:** Click on a product card to navigate to the product details page for more information and images.
5. **Add to Cart:** On product cards or product detail pages, click "Add to Cart" to add items to your shopping cart.
6. **View Cart:** Open the cart drawer by clicking the cart icon in the navigation bar to review your selected items and total.
7. **Proceed to Checkout:** From the cart drawer, click the "Checkout" button to go to the checkout page.
8. **Login/Signup:** Access user authentication features (login/signup) via the "Login" or "Signup" links in the navigation bar. Authentication is required to proceed to checkout (in a real e-commerce scenario).

## Features

- **Responsive Design:** The application is designed to be fully responsive and work seamlessly on various devices (desktops, tablets, and mobile phones) thanks to Tailwind CSS.
  - **Product Catalog:** Browse a wide range of products, with clear listings including images, titles, and prices.
  - **Product Search and Filtering:** Easily find products using the search bar and category filters available on the home page.
  - **Product Sorting:** Sort products by price (low to high, high to low) and by newest arrivals to quickly find what you're looking for.
  - **Detailed Product Pages:** View comprehensive product information, including descriptions, categories, and image galleries on dedicated product detail pages.
  - **Shopping Cart:** A persistent shopping cart allows users to add products, review their selected items, and manage quantities before checkout.
  - **Checkout Process:** A simplified checkout process for users to place orders (note: this is a mock checkout, no real payment processing is implemented).
  - **User Authentication:** Secure user accounts with signup and login functionality powered by Firebase Authentication.

## Technologies Used

- **Front-end Framework:** React
- **Styling:** Tailwind CSS
- **API Integration:** Axios
- **State Management:** React Context API
- **Routing:** React Router
- **Authentication:** Firebase Authentication
- **Package Manager:** npm
- **Build Tool:** Vite

## API Integration

This project uses the [Platzi Fake API](https://api.escuelajs.co/api/v1) to fetch product and category data. The API is integrated using Axios for HTTP requests.

## Deployment

The application is deployed on [Netlify/Vercel/AWS/Heroku](#) (replace with your deployment link).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/ecommerce-clone](https://github.com/yourusername/ecommerce-clone)
