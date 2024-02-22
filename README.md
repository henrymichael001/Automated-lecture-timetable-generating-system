# Automated Timetable Generation System

## Description
This project is an automated timetable generation system, built using the MERN (MySQL, Express, ReactJS, Node.js with TypeScript) stack. It simplifies the process of creating and managing timetables, making it efficient and user-friendly. 

## User Perspective
From a user perspective, this system provides the following components:
1. **Timetable Creation**: Users can easily create and customize timetables for various purposes, such as school, university, or work schedules.
2. **Course/Event Management**: Users can add, edit, and delete courses or events within the timetable, specifying details like name, date, time, and location.
3. **Schedule Optimization**: The system can intelligently optimize timetables to avoid clashes, ensuring an efficient and conflict-free schedule.
4. **Export and Sharing**: Users can export their timetables in various formats (e.g., PDF, CSV) and share them with others.

## Developer Perspective
From a developer's perspective, the application is built using the following technologies:
- **MySQL**: As the database management system.
- **Express**: For building the backend server.
- **ReactJS**: For the frontend user interface.
- **Node.js with TypeScript**: To provide a robust and statically-typed server environment.
- **Prisma**: Used as an ORM (Object-Relational Mapping) tool to interact with the database.

- XAMPP Server (for mysql)
- Nodejs (comes installed with npm)
- Visual Studio Code

## Getting Started
To set up the application on your local machine, follow these steps:

### Prerequisites
- Node.js and npm should be installed.
- MySQL should be installed and running.
- Git for cloning the repository.

### Installation
1. Clone the repository:
   ```shell
   git clone https://github.com/spiffgreen/atgs.git
   ```

2. Navigate to the project directory:
   ```shell
   cd atgs
   ```

3. Install server and client dependencies (a script has been setup already for that):
   ```shell
   npm run setup
   ```

### Database Setup
1. Create a MySQL database for the application.

2. Configure the database connection in the server's `.env` file, providing your MySQL credentials.

3. Run database migrations to create tables:
   ```shell
   cd server
   npx prisma migrate dev
   ```

### Running the Application
1. Start in development mode:
   ```shell
   npm run dev
   ```

2. Start in production mode:
   ```shell
   npm run start # This is after running build command i.e npm run build
   ```

3. Access the application in your web browser at url shown in your terminal.

## Usage
- Visit the web application and start creating your timetables.
- Customize and manage your courses/events within the timetable.
- Optimize your schedules to eliminate conflicts.
- Export and share your timetables as needed.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing
Feel free to contribute to this project. We welcome contributions that make the system more robust and user-friendly. Please read our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## Contact
If you have any questions or issues, please contact us at [heney4real@gmail.com](heney4real@gmail.com) or 07013941478.

Enjoy using the Automated Timetable Generation System!