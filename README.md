# SwiftShip

This repository contains the backend API and frontend mobile app for SwiftShip. 

---

## 1. Start the Database
The project uses a Dockerized PostgreSQL database to ensure everyone is using the same version without conflicts. 
From the root of the project, run:
```bash
docker compose up -d
```
*(This starts PostgreSQL 15 on port 5433 with the database `swiftship_db`)*

---

## 2. Start the Backend API (NestJS)
Open a new terminal window, navigate to the `api` folder, install dependencies, and start the server:
```bash
cd api
npm install
npm run start
```
*(The API runs on port 3001. You can verify it's working by going to `http://localhost:3001/api/status` in your browser).*

---

## 3. Start the Frontend App (React Native Expo)
Open another terminal window, navigate to the `mobile` folder, install dependencies, and start the Expo packager:
```bash
cd mobile
npm install
npx expo start
```
Once the Expo packager is running, you can:
- Press **`i`** to open it in an iOS Simulator (if you are on a Mac).
- Press **`a`** to open it in an Android Emulator.
- Press **`w`** to open it in your web browser.
