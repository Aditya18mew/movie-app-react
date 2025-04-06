# User-Auth

  Overview-->
The user-auth Page is a user authentication module designed to manage user registration and login functionality in a secure and scalable manner. Built as a full-stack solution, the frontend is developed using React, while the backend is structured using Node.js and Express.js. MongoDB, integrated via Mongoose, serves as the primary data store for user credentials and session data.




 

 Tech Stack-->

Frontend->
-React.js
-CSS
-Axios (for API requests)

Backend->
-Node.js
-Express.js
-MongoDB & Mongoose
-bcryptjs (for hashing passwords)
-jsonwebtoken (for token generation)

project structure-->

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



Installation & Setup

Prerequisites->
-Node.js installed
-MongoDB running locally or through a cloud provider (like MongoDB Atlas)

Backend Setup->
-Navigate to the Backend-auth folder
-Run npm install to install dependencies
-create .env file and set your ACCESS_TOKEN_SECRET="your secret key"
-Start the server using npm start

Frontend Setup->
-Navigate to the Frontend-auth folder
-Run npm install to install dependencies
-Start the app with npm run dev