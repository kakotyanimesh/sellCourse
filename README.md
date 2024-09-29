# EduNexus - Course Selling Web App

TThis project is a full-stack course-selling web application where users can sign up as either students or educators. Educators can create and manage courses, while students can browse, purchase, and view courses. The project is built as an assignment by **[Harkirat Singh](https://www.youtube.com/@harkirat1)**.

## Features

### For Students:
- Sign up and log in
- View available courses
- Purchase courses
- View purchased courses

### For Educators:
- Sign up and log in
- Create new courses
- Update existing courses
- View a list of created courses

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Rate Limiting**: Express Rate Limit
- **Validation**: Zod for request validation
- **Styling**: Tailwind CSS

## Installation

### Prerequisites:
- Node.js
- MongoDB

### Steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/edunexus.git
    ```

2. Navigate to the project directory:
    ```bash
    cd edunexus
    ```

3. Install dependencies for both backend and frontend:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory of the backend with the following contents:

    ```env
    mongoUrl=''
    jwt_secret_user=''
    jwt_secret_admin=a''
    PORT=
    ```

5. Start the backend server:
    ```bash
    npm run dev
    ```

6. Navigate to the `frontend` folder and run the React app:
    ```bash
    cd frontend
    npm start
    ```

## Deployment

### Backend (Render.com):
1. Set your MongoDB URL and JWT secrets in the Render environment variables.
2. Set the start command as:
    ```bash
    npm run dev
    ```

### Frontend (Vercel or Netlify):
1. Build the frontend app:
    ```bash
    npm run build
    ```

2. Deploy the `build` folder to Vercel/Netlify.

## API Endpoints

### Admin (Educator)
- **POST** `/api/v1/admin/signup`: Educator signup
- **POST** `/api/v1/admin/signin`: Educator login
- **POST** `/api/v1/admin/createCourse`: Create a new course
- **PUT** `/api/v1/admin/updateCourse`: Update an existing course
- **GET** `/api/v1/admin/course/bulk`: View all created courses

### User (Student)
- **POST** `/api/v1/user/signup`: Student signup
- **POST** `/api/v1/user/signin`: Student login
- **GET** `/api/v1/course/preview`: Preview available courses
- **POST** `/api/v1/course/buyCourse`: Purchase a course
- **GET** `/api/v1/user/userCourse`: View purchased courses

## Folder Structure
├── backend │ ├── controllers │ ├── middlewares │ ├── models │ ├── routes │ ├── index.js │ └── .env ├── frontend │ ├── public │ ├── src │ ├── components │ ├── App.js │ └── index.js


## Future Improvements
- Add payment integration for course purchases.
- Implement better course categorization and search filters.
- Add course reviews and ratings.

## License
This project is an assignment and is not open for distribution.

---

*Assignment by **[Harkirat Singh](https://www.youtube.com/@harkirat1)**.*
