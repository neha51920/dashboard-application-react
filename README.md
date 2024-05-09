# Dashboard Application

This is a dashboard application built using ReactJS and Node.js. It allows users to visualize data and perform various tasks as described in the task description.

## Features

- **State Selection**: Users can select a state from a dropdown menu, which is fetched from the Node.js API.
- **Time Selection**: Users can select a time range using dropdowns, with minimum and maximum dates dynamically bound based on state selection.
- **Data Visualization**: Data fetched from the API is visualized using cards and charts on the dashboard.
- **Navigation Bar**: Users can expand and collapse the left side navigation bar.
- **Theme Switching**: Users can switch between Light and Dark themes from the sidebar.
- **Responsive Layout**: The layout adapts according to the device width.

## Installation and Setup

### Backend (Node.js API)

1. Navigate to the `NodeJS API` directory.
2. Run `npm install` to install all required packages.
3. Run the API using `npm start`. The API will be hosted on port `4000`.

### Frontend (ReactJS)

1. Navigate to the root directory.
2. Run `npm install` to install all dependencies.
3. Run the frontend using `npm start`.

## API Endpoints

- **GET `/getAll`**: Get all users data.
- **GET `/getStoreData/:store`**: Retrieve user details based on a specific store and time range.
  - Parameters:
    - `store`: The name of the store.
    - `start`: Start date for data retrieval.
    - `end`: End date for data retrieval.
## Folder Structure
```
dashboard-app/
│
├── NodeJS API/ # Backend Node.js API
│ ├── data/ # Data storage file
│ │ └── sales.js # Data storage file
│ ├── index.js
│ ├── package.json
│
├── public/
├── src/ # Frontend ReactJS source code
│ ├── assets/
│ ├── components/ # React components
│ ├── layout/ # Default layout
│ ├── scss/ # CSS
│ ├── views/ # Element component
│ ├── ...
├── _nav.js
├── app.js
├── index.js
├── routes.js
├── store.js
├── package.json
├── vite.config.mjs
└── README.md # Documentation file
```
## Dependencies

- Frontend:
  - ReactJS
  - CoreUI
  - react-chartjs-2
- Backend:
  - Node.js
  - Express

