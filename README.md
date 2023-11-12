# MEARN Stack Application Readme

## Backend Task

### Data Source

**Third-Party API URL:** PRIVATE

**Request Method:** GET

**Response Format:** JSON

### 🌱 Database Initialization

To set up the database, an API has been created to fetch JSON data from the third-party API and initialize the database with seed data. The table/collection structure is designed for efficiency.

#### Instruction

All APIs should take a month (expected value is any month between January to December) as input and match it against the field `dateOfSale`, regardless of the year.

### 📜 Transactions Listing

A comprehensive API is in place to list all transactions, supporting search and pagination on product transactions. The API matches search text on product title/description/price and returns the relevant product transactions. If the search parameter is empty, the API returns all records based on applied pagination (default values: `page = 1`, `per page = 10`).

### 📊 Statistical Insights

An API provides statistics, including the total sale amount, total number of sold items, and total number of unsold items for the selected month.

## Frontend Task

Utilizing the aforementioned APIs, the following components have been implemented on a single page. While the mockups serve as a guide, feel free to implement your own design to enhance the user experience.

### 📑 Transactions Table

- The project employs the transactions listing API to display transactions in a table.
- The month dropdown offers options from Jan to Dec, with March preselected by default.
- The table lists transactions for the selected month, irrespective of the year, using the API.
- A search transaction box dynamically filters transactions based on title/description/price.
- Clearing the search box resets the table to the initial list for the selected month using the API.
- Pagination is implemented, loading the next or previous page data from the API on user interaction.

### 📈 Transactions Statistics

- The project uses the created API to fetch data, displaying the total amount of sale, total sold items, and total unsold items for the selected month from the dropdown (located above the table).

### 📊 Transactions Bar Chart

- The bar chart visualizes the price range and the corresponding number of items for the selected month, independent of the year. The month selected from the dropdown above the table determines the data displayed in the chart.
