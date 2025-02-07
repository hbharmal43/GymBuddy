# GymBuddy: Your Workout Partner Finder

GymBuddy is a web application designed to connect students at the University of Texas at Arlington (UTA) with compatible workout partners. By fostering fitness accountability and providing essential tools like profile matching, a chat feature, a streak counter, and a weekly program planner, GymBuddy creates a community-driven platform for achieving fitness goals.

---

## 🚀 Features

1. **Profile Swiping**  
   - Tinder-like swiping feature to find workout partners based on preferences (Beginner/Intermediate).  
   - Match users based on fitness goals and preferences.

2. **Chat Functionality**  
   - Real-time chat for matched users to coordinate workout plans.  
   - Simple and intuitive interface for seamless communication.

3. **Streak Counter**  
   - Tracks daily logins to encourage consistency in fitness habits.  
   - Displays the number of consecutive days logged into the app.

4. **Weekly Program Planner**  
   - Allows users to plan and organize workouts for the week.  
   - Visualizes a schedule for better time management.

5. **Profile Management**  
   - UTA students can create accounts using their @mavs.uta.edu email for security.  
   - Users can update their bio, profile picture, and fitness preferences.  

6. **Secure Login**  
   - Restricts access to UTA students only by verifying university email addresses.  

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js**: For building the user interface.
- **Tailwind CSS**: For designing a responsive and minimalistic UI.
- **Zustand**: For state management.

### **Backend**
- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for handling routes and APIs.
- **Socket.io**: Enables real-time chat functionality.
- **MongoDB**: Database for storing user profiles, messages, and workout plans.
- **Cloudinary**: For secure storage of profile pictures.

---

## 🖥️ Local Development

Follow these steps to run the project locally:

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- MongoDB server setup locally or on the cloud (e.g., MongoDB Atlas).
- A Cloudinary account for image storage.

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/gymbuddy.git
   cd gymbuddy
## Install Dependencies

To get started, install the required dependencies by running the following command:
npm install

Set Up Environment Variables
1. Create a .env file in the root directory.
2. Add the following variables to the file:

  MONGO_URI=your_mongodb_connection_string
  CLOUDINARY_URL=your_cloudinary_url
  JWT_SECRET=your_jwt_secret

Start the Development Server
Run the following command to start the development server:

npm run dev

Access the Application
Once the server is running, open your browser and navigate to:

http://localhost:3000

📧 Contact
For questions, suggestions, or contributions, please reach out to:

Project Manager: Hasnain Bharmal
Email: hasnainbharmal4@gmail.com
🖼️ Screenshots
Home Page

Weekly Planner

🛡️ License
This project is licensed under the MIT License.
