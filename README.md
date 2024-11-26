# Attorney Price Management System ⚖️💰

## Overview 🌟

The **Attorney Price Management System** is a comprehensive web application designed to streamline the management of attorneys and their associated pricing structures. This system allows users to efficiently handle attorney details, associate them with various pricing based on specific criteria, and perform essential operations to maintain accurate and up-to-date information.

### Key Features 🚀

- **Attorney Management:** Easily manage attorney profiles, including their contact information and relevant details.
- **Dynamic Pricing:** Associate attorneys with different prices based on various factors such as county, court, violation, and points. This flexibility allows for tailored pricing strategies that can adapt to different legal scenarios.
- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on attorney profiles and their associated price maps, ensuring that all data is current and accurate.
- **Data Persistence:** Utilize MongoDB for reliable data storage, ensuring that all information is securely saved and easily retrievable.
- **User-Friendly Interface:** Built with Next.js, the application provides a responsive and intuitive user interface, making it easy for users to navigate and manage data effectively.

## How It Works 🔧

The application is structured to allow users to:

1. **Create and Manage Attorneys:** Users can add new attorneys, edit existing profiles, and delete attorneys as needed.
2. **Set Up Pricing Maps:** Users can define pricing maps that link attorneys to specific prices based on various criteria, such as the type of violation or the court involved.
3. **View and Edit Price Maps:** Users can view existing price maps, make necessary adjustments, and ensure that pricing reflects current legal standards and practices.
4. **Data Retrieval:** The application fetches data from the backend API, ensuring that users always have access to the latest information.

## Prerequisites 📋

- Node.js (version 20.x or later)
- MongoDB (local, remote instance, or dockerized)

## Installation 🛠️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samtarbury/attorney-crud.git
   cd attorney-crud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://your-mongo-db-uri
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Contributing 🤝

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push your branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
