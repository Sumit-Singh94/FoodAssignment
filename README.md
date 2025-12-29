FoodAssignment 

Overview

This project involves the design and implementation of a web-based Foods page using the Foods public API. The application enables users to search, filter, sort, and examine detailed information about food products through an intuitive and responsive user interface. The solution emphasizes modular architecture, effective API integration, and adherence to modern front-end development practices.

Objective

The primary objective of this assignment is to develop a client-side web application that allows users to explore food product data by leveraging real-world, publicly available datasets. The application is expected to support product discovery, detailed inspection, and efficient navigation while maintaining usability across different screen sizes.

Technologies Used

ReactJS – For building a component-based user interface

React Router – For handling client-side routing and navigation

Tailwind CSS – For implementing a responsive and lightweight design system

Food API – For retrieving real-time food product data

Methodology
Application Architecture

The application follows a component-based architecture to promote modularity and reusability. Core components include:

Home Component
Responsible for displaying the product list along with search, filtering, sorting, and pagination functionalities.

ProductCard Component
Represents an individual product in a summarized card format and facilitates navigation to the detailed view.

ProductDetail Component
Displays comprehensive information about a selected product, including ingredients, nutritional values, and labels.

Client-side routing is implemented using dynamic routes, enabling the application to render detailed product pages based on unique product identifiers (barcodes).

API Integration Approach

The Food API is utilized through multiple endpoints to fulfill application requirements:

Product Search and Listing
Products are retrieved using the search endpoint with pagination support.

Category Filtering
Categories are dynamically fetched from the categories endpoint and used to filter products via category-specific API calls.

Barcode-Based Search
A dedicated input allows users to fetch an exact product directly using its barcode.

Product Details Retrieval
The product detail page fetches complete information using the barcode extracted from the URL.

This approach ensures efficient data retrieval while minimizing unnecessary API calls.

State Management

State management is handled using React’s built-in useState and useEffect hooks. Application state includes:

Product data

Pagination state

Search query

Barcode input

Selected category

Sorting preference

State transitions are managed carefully to prevent conflicting filters and to ensure predictable application behavior.

User Interface and Responsiveness

The user interface is designed with a light, minimal aesthetic to enhance readability and usability. A mobile-first approach is adopted, ensuring that the application functions effectively across a range of devices and screen sizes. Key UI considerations include:

Responsive grid layouts

Sticky filter controls for improved navigation

Clear visual hierarchy for product information

Time Analysis

The estimated time required to complete the assignment is summarized below:

The	Estimated Time was 5 days.

Implemented Features

Product listing with pagination

Search functionality by product name

Barcode-based product search

Category-based filtering using API data

Sorting by product name and nutritional grade

Detailed product view including:

Product image

Ingredients list

Nutritional values

Product labels

Fully responsive user interface

Conclusion

This project demonstrates the practical application of modern front-end development techniques, including component-based design, dynamic routing, and API-driven data handling. The solution effectively meets the assignment requirements while maintaining code clarity, scalability, and user accessibility.
