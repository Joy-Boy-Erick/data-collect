# DataCollectApp - Laravel Backend

This is the Laravel backend for the DataCollectApp. It provides a REST API for managing patients and payments, with session-based authentication for the admin user.

## Project Overview

- **Purpose**: A simple application to record patient payment amounts by date.
- **Authentication**: Session-based auth for a single admin user.
- **API Endpoints**: Provides endpoints for login, logout, and CRUD operations on patients and payments.
- **Database**: MySQL.

---

## 🚨 Security Warning

This project includes a default admin account with a simple password for development purposes only.

- **Username**: `Admin`
- **Password**: `12345`

**NEVER use these credentials in a production environment.**

### How to Change the Admin Password

You can change the password using Artisan Tinker:

```bash
php artisan tinker
```

Then run the following commands, replacing `'new-strong-password'` with your desired password:

```php
$user = App\Models\User::where('username', 'Admin')->first();
$user->password = Illuminate\Support\Facades\Hash::make('new-strong-password');
$user->save();
exit;
```

---

## Local Development Setup

You can set up the project using either a native local server environment (like Valet, XAMPP, or the built-in Artisan server) or Docker.

### Option A: Native Setup (macOS/Linux/WSL)

**Prerequisites:**
- PHP 8.1+
- Composer
- Node.js & npm
- MySQL

**Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd DataCollectApp
    ```

2.  **Install PHP Dependencies:**
    ```bash
    composer install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    npm install
    npm run dev
    ```

4.  **Environment Configuration:**
    - Copy the example `.env` file:
      ```bash
      cp .env.example .env
      ```
    - Create a new MySQL database for the project (e.g., `datacollectapp`).
    - Update the following lines in your `.env` file with your database credentials:
      ```env
      DB_CONNECTION=mysql
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_DATABASE=datacollectapp
      DB_USERNAME=root
      DB_PASSWORD=your_db_password
      ```

5.  **Application Setup:**
    - Generate an application key:
      ```bash
      php artisan key:generate
      ```
    - Run database migrations and seed the admin user:
      ```bash
      php artisan migrate --seed
      ```
    - Link the storage directory:
      ```bash
      php artisan storage:link
      ```

6.  **Serve the Application:**
    - Use the Artisan development server:
      ```bash
      php artisan serve
      ```
    - Your application will be available at `http://127.0.0.1:8000`.

### Option B: Docker Compose Setup

**Prerequisites:**
- Docker
- Docker Compose

**Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd DataCollectApp
    ```

2.  **Environment Configuration:**
    - Copy the example `.env` file. The default settings are configured to work with Docker.
      ```bash
      cp .env.example .env
      ```

3.  **Build and Run Containers:**
    - Start the services in detached mode:
      ```bash
      docker-compose up -d --build
      ```

4.  **Install Dependencies:**
    - Install PHP dependencies inside the `app` container:
      ```bash
      docker-compose exec app composer install
      ```
    - Install Node dependencies:
      ```bash
      docker-compose exec app npm install
      docker-compose exec app npm run dev
      ```
      
5.  **Application Setup:**
    - Generate an application key:
      ```bash
      docker-compose exec app php artisan key:generate
      ```
    - Run database migrations and seeders:
      ```bash
      docker-compose exec app php artisan migrate --seed
      ```
    - Link storage:
      ```bash
      docker-compose exec app php artisan storage:link
      ```

6.  **Access the Application:**
    - **Web Application**: [http://localhost:8080](http://localhost:8080)
    - **phpMyAdmin**: [http://localhost:8081](http://localhost:8081) (Use `db` as the host, `sail` as the user, and `password` as the password).

---
