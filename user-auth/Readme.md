# login-page
login page which uses react for frontend for UI styling and form validation and node/express js for backend Api integration

# to run it locally in your system
 1-clone the repo
 2-Navigate to the Frontend-react folder in your terminal -- run "npm install" then "npm run dev"
 3-Navigate to the Backend-node folder -- create .env file and set your ACCESS_TOKEN_SECRET="your secret key" and then in your terminal run "npm install" then "npm run dev"
 

user auth/
|--Backend-node/

│   ├──login details/
│   ├──regex/
│   ├──server.js #entry point
│   ├──bcrypting.js #bcrypt details
│   ├──jwttokens.js  #jsonwebtoken generation and functionality
│-- package.json        # Dependencies & scripts  




|--Frontend-react/
│-- src/

│   ├──assets/
│   ├── components/     # UI components  
│   ├── main.js          # Main App component  
│   ├── App.js        # Entry point  
│-- public/             # Static assets  
│-- package.json        # Dependencies & scripts  