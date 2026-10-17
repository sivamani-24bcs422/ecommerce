# eCommerce Platform Project - MERN Stack

Welcome to the eCommerce Platform Project built using the MERN (MongoDB, Express.js, React, Node.js) Stack. This project provides a robust and full-featured online shopping platform with various functionalities to enhance the user experience.

**Live App Demo** : [https://mern-shop-abxs.onrender.com/](https://mern-shop-abxs.onrender.com/)</br>
Note: Please be aware that Render's free tier will automatically shut down after 15 minutes of inactivity. Consequently, the first request after reactivation may experience a delay, but subsequent requests will be faster.

## Features

- **Full-Featured Shopping Cart**: Seamless shopping cart functionality for users to add, remove, and manage products.
- **Product Reviews and Ratings**: Users can leave reviews and provide ratings for products.
- **Top Products Carousel**: Display a carousel of top-rated or featured products.
- **Product Pagination**: Navigate through products efficiently with pagination.
- **Product Search Feature**: Easily search for products based on keywords.
- **User Profile with Orders**: Users can create profiles and track their order history.
- **Admin Dashboard**: Comprehensive dashboard for administrators to manage admins, products, users, and orders.
- **Admin Admin Management**: Manage admin accounts.
- **Admin Product Management**: Add, edit, and delete products from the platform.
- **Admin User Management**: Manage user accounts.
- **Admin Order Details Page**: Access detailed information about each order.
- **Mark Orders as Delivered Option**: Ability to update order status to "delivered."
- **Checkout Process**: Seamless checkout with options for shipping and payment methods.
- **Razorpay Integration**: Secure payment processing through Razorpay.
- **Database Seeder**: Easily populate the database with sample products and users.

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher
- **MongoDB** — either a local installation or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- **Razorpay** account for payment processing — obtain Key ID and Key Secret from the [Razorpay Dashboard](https://razorpay.com/)
- **Brevo** (formerly Sendinblue) account for transactional emails — generate an SMTP key from the [Brevo SMTP & API settings](https://www.brevo.com/)

### Environment Variables

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your credentials:

   ```dotenv
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   MONGO_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   PAGINATION_MAX_LIMIT=12
   EMAIL_HOST=smtp-relay.brevo.com
   EMAIL_PORT=587
   EMAIL_USER=your_brevo_smtp_login
   EMAIL_PASS=your_brevo_smtp_password
   EMAIL_FROM=your_brevo_sender_email
   ```

   | Variable | Description |
   |---|---|
   | `NODE_ENV` | `development` or `production` |
   | `PORT` | Port the backend server listens on (default: `5000`) |
   | `JWT_SECRET` | Secret key for signing JSON Web Tokens |
   | `MONGO_URI` | MongoDB connection string |
   | `RAZORPAY_KEY_ID` | Razorpay Key ID |
   | `RAZORPAY_KEY_SECRET` | Razorpay Key Secret |
   | `PAGINATION_MAX_LIMIT` | Max products shown per page |
   | `EMAIL_HOST` | SMTP server host (Brevo default: `smtp-relay.brevo.com`) |
   | `EMAIL_PORT` | SMTP port (Brevo default: `587`) |
   | `EMAIL_USER` | Brevo SMTP login |
   | `EMAIL_PASS` | Brevo SMTP password |
   | `EMAIL_FROM` | Sender email address |

### Install Dependencies

From the project root, install both backend and frontend dependencies:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Run the Application

**Run both backend and frontend concurrently (recommended for development):**

```bash
npm run dev
```

This starts the backend on `http://localhost:5000` and the frontend on `http://localhost:3000`.

**Run only the backend:**

```bash
npm run server
```

**Run only the frontend:**

```bash
npm run client
```

### Build for Production

1. Create a production build of the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Set `NODE_ENV=production` in your `.env` file.

3. Start the server:

   ```bash
   npm start
   ```

   The backend will serve the built frontend from `frontend/build`.

### Seed the Database

Populate the database with sample users and products, or destroy all data:

```bash
# Import sample data
npm run data:import

# Destroy all data
npm run data:destroy
```

## Sample User Logins

After seeding the database with `npm run data:import`, the following accounts will be available:

- **Admin Dashboard:** `http://localhost:3000/admin/login`
  - Email: `admin@admin.com`
  - Password: `admin123`

- **Customer Login:** `http://localhost:3000/login`
  - John Doe — `john@email.com` / `john123`
  - Alice Smith — `alice@email.com` / `alice123`

Feel free to explore and customize this eCommerce platform for your specific needs. Happy coding🤩!

# Contributing to the eCommerce Platform Project

We welcome and appreciate contributions from the community to enhance and improve the eCommerce Platform Project. Whether you're a developer, designer, tester, or someone with valuable feedback, your input is valuable. Here's how you can contribute:

## Getting Started

1. Fork the repository to your GitHub account.

2. Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/MERN-eCommerce.git
   ```

3. Navigate to the project directory:

   ```bash
   cd MERN-eCommerce
   ```

4. Create a new branch for your contributions:

   ```bash
   git checkout -b feature/your-feature-name
   git checkout -b issues/your-issue-name
   ```

## Making Changes

1. Implement your changes and improvements.

2. Ensure that your changes adhere to the project's coding style and conventions.

3. Test your changes thoroughly to avoid introducing bugs.

4. Update the project documentation if necessary.

## Committing Changes

1. Commit your changes with a descriptive commit message:

   ```bash
   git add .
   git commit -m "Add your descriptive commit message here"
   ```

2. Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   git push origin issues/your-issue-name
   ```

## Creating a Pull Request (PR)

1. Visit your forked repository on GitHub.

2. Switch to the branch containing your changes.

3. Click on the "New Pull Request" button.

4. Provide a clear title and description for your pull request, explaining the purpose and scope of your changes.

5. Submit the pull request.

## Code Review

Your contribution will be reviewed by the project maintainers. Be prepared to address any feedback or suggestions to ensure the quality and compatibility of your changes.

## Thank You!

Thank you for considering contributing to the eCommerce Platform Project. Your efforts help make this project better for everyone. If you have any questions or need assistance, feel free to reach out through the issue tracker or discussions. Happy coding🤩!
