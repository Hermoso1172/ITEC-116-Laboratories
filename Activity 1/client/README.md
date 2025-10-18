<h1> To-Do List Frontend: ReactJS </h1>

## About

Frontend for the to-do app.

## Installation

1. Install dependencies
   ```bash
   $ npm i
   ```
2. Start the project:
   ```bash
   $ npm run dev
   ```
3. Access the project at: <a href="http://localhost:5173">http://localhost:5173</a>

## Built With
#### Platform (<a href="https://react.dev/">React.js</a> + <a href="https://react.dev/">Javascript</a>)
<ul>
  <li>
    <a href="https://vite.dev/">Vite</a>
  </li>
  <li>
    <a href="https://tailwindcss.com/">Tailwind CSS</a>
  </li>
  <li>
    <a href="https://reactrouter.com/">React Router</a>
  </li>
</ul>

#### Libraries Used
<ul>
  <li>Icons: <a href="https://lucide.dev/">Lucide Icons</a></li>
</ul>

## Directory Stucture
```
.
└── client/
    ├── public                        # Static files
    ├── src/                          # Main source code folder/
    │   ├── assets                    # Images, icons, fonts, or other static media used in the app
    │   ├── components                # Reusable UI components
    │   ├── pages/
    │   │   ├── Tasks.jsx             # Main page of the todo app - Shows the list of all tasks
    │   │   └── ByCategory.jsx        # Shows the list of all tasks filtered by a specific category             
    │   ├── App.css                   # Styling specific to the App component
    │   ├── App.jsx                   # Root component — defines routes
    │   ├── index.css                 # Global CSS resets or shared styles
    │   ├── main.css                  # Global or custom styles
    │   └── main.jsx                  # Entry point — renders <App /> into the DOM via ReactDOM
    ├── .gitignore                    # Files/folders to be ignored by Git
    ├── README.md                     # Project documentation
    ├── eslint.config.js              # ESLint configuration
    ├── index.html                    # Main HTML template
    ├── package-lock.json             # Auto-generated dependency lock file
    ├── vite.config.js                # Vite configuration file
    └── package.json                  # Project metadata and dependencies
```
