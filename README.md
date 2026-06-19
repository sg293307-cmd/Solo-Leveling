# Solo Leveling - Habit Tracker

A modern, highly visual, and interactive web application designed to help you track your daily and weekly habits, level up your life, and monitor your health metrics. Built with React, Vite, Tailwind CSS, and Firebase.

## ✨ Features

*   **Authentication**: Secure user login and registration powered by Firebase Auth.
*   **Cloud Data Sync**: User data is isolated and safely stored in real-time using Firebase Cloud Firestore.
*   **Daily & Weekly Habit Tracking**: Easily add, manage, and toggle your daily and weekly habits.
*   **Health Metrics**: Log your daily sleep hours, mood rating, and energy levels to find correlations with your habits.
*   **Notes Panel**: Keep monthly contextual notes and goals.
*   **Rank Badge System**: A gamified ranking system to visually reward your consistency.
*   **Modern UI/UX**: Designed with beautiful glassmorphism components, neon accents, and smooth animations.
*   **Dark/Light Mode**: Toggleable themes that persist to your user profile.
*   **Toast Notifications**: Elegant real-time feedback for your actions.

## 🛠️ Technology Stack

*   **Frontend**: React 19, Vite
*   **Styling**: Tailwind CSS v4, Lucide React (Icons)
*   **Backend & Auth**: Firebase (Authentication & Cloud Firestore)
*   **Charts**: Chart.js & react-chartjs-2
*   **Notifications**: react-hot-toast

## 🚀 Getting Started

### Prerequisites
*   Node.js installed on your machine.
*   A Firebase account and project.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sg293307-cmd/Solo-Leveling.git
    cd "Solo Leveling"
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    Open `src/firebase.js` and ensure your Firebase project's configuration matches your Firebase Console settings:
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the MIT License.
