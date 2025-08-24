<div align="center">

```
 ____   _   __  __  ____   _   _  __      __
|  _ \ | | |  \/  |/ __ \ | | | | \ \    / /
| | | ||_/ | \  / | |  | || | | |  \ \  / /
| | | |    | |\/| | |  | || | | |   \ \/ /
| |_| |    | |  | | |__| || |_| |    \  /
|____/     |_|  |_|\____/  \___/      \/ 
```
**Smart Room Automation**

</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  Welcome to the frontend repository for D-Mouv, an innovative project designed to automate electrical systems within a room. This application, built with <b>React Native Expo</b>, serves as the user interface to control and monitor a device that intelligently turns on lights and fans upon detecting motion.
</p>

---

### **Table of Contents**
* [About The Project](#-about-the-project)
* [Screenshots](#-screenshots)
* [Key Features](#-key-features)
* [Tech Stack](#️-tech-stack)
* [Getting Started](#-getting-started)
* [Project Structure](#-project-structure)
* [Contributing](#-contributing)
* [License](#-license)
* [Contact](#-contact)

---

## 🚀 About The Project

D-Mouv (Detection Movement) is a smart solution for energy efficiency and comfort. When the sensor detects movement or the presence of a person in the room, the system automatically activates electrical devices like lights and fans. This repository specifically contains the code for the mobile application (frontend), which features a clean, intuitive, and user-friendly interface.

---

## 📸 Screenshots

*(Add screenshots of your application here to give a visual representation of the project.)*

| Dashboard | History Page |
| :---: | :---: |
| <img src="https://placehold.co/300x600/EFEFEF/333?text=Dashboard+Screen" width="300"> | <img src="https://placehold.co/300x600/EFEFEF/333?text=History+Screen" width="300"> |

---

## ✨ Key Features

* **Control Dashboard:** The main interface for monitoring the status of devices (lamp & fan).
* **Activity History:** View logs or history of when motion was detected and devices were activated.
* **Security Notifications:** Receive real-time notifications when activity is detected.
* **Schedule Settings:** Set schedules for when devices should automatically turn on or off.
* **Team Page:** A page to display the members of the research team involved.

---

## 🛠️ Tech Stack

This project is built using modern technologies for cross-platform mobile app development:

* **React Native**
* **Expo Framework**
* **TypeScript**

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

1. **Install Dependencies**
   Make sure you have Node.js and npm installed.
   ```bash
   npm install
   ```

2. **Start the Application**
   Use the command below to start the Metro Bundler.
   ```bash
   npx expo start
   ```
   From here, you can choose to open the app in an Android emulator, iOS simulator, or on a physical device using the Expo Go app.

---

## 📂 Project Structure

The project is organized with a clear and scalable structure to separate concerns.

```
/
├── api/              # API layer configuration (e.g., api.ts)
├── app/              # Main directory for all screens and file-based routes
│   ├── (auth)/       # Screens and logic related to authentication
│   ├── (tabs)/       # Layout and screens for the main tab navigator
│   │   ├── _layout.tsx
│   │   ├── account-settings.tsx
│   │   ├── fan-control.tsx
│   │   ├── index.tsx (Home)
│   │   ├── lamp-control.tsx
│   │   └── notifications.tsx
│   └── _layout.tsx     # Root layout of the app
├── assets/           # Static assets like fonts, icons, and images
├── components/       # Reusable UI components used across the app
│   ├── home/
│   ├── modal/
│   └── navigation/
├── constants/        # Global constants (Colors, Data, etc.)
├── context/          # React Context providers for global state management
└── hooks/            # Custom React hooks for shared logic
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Contact

This application was designed and developed by the Frontend team from the Research Division.

* **Hilmy Baihaqi**
* **Aurelia Aisya Rachma**

Thank you for visiting our repository!
