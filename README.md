# **Blogzap**

A full-featured blogging platform built with Node.js, Express, MongoDB, Cloudinary & EJS.
Write, upload, publish, and explore blogs with a clean UI and production-ready architecture.

## 🌐 Live Website

You can access the live production deployment here:
👉 [Blogzap](https://blogzap.onrender.com/)

No local setup required to use the platform — just sign up, write, and publish.

## 🚀 Features

✍️ Create and publish blogs with title, content, summary & cover image

🖼️ Cloud image uploads (Cloudinary v2)

🔍 Search by title, description, or content

📄 Pagination with query-based navigation

👤 Auth protected blog creation (user roles)

🧭 Clean routing

❌ Global 404 page for invalid links & ObjectId validation

📱 Fully responsive with Bootstrap

## 🛠️ Tech Stack

| Layer           | Tools                                       |
| --------------- | ------------------------------------------- |
| Backend         | Node.js, Express.js                         |
| Frontend        | EJS + Bootstrap                             |
| Database        | MongoDB                                     |
| Image Hosting   | Cloudinary v2                               |
| Upload Handling | Multer (memory storage + Cloudinary stream) |

## 📦 Local Installation (Optional)

If you want to run Blogzap locally or contribute:

#### Clone the repo

```
git clone https://github.com/your-username/blogzap.git
cd blogzap
```

#### Install dependencies

```
npm install
```

#### Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGO_URI="your-mongodb-url-with/blogzap"
CLOUDINARY_URL="cloudinary://<api_key>:<api_secret>@<cloud_name>"
SESSION_SECRET="your-session-secret"
```

#### Run the Server

```
npm start
```

Local server will start at:

```
http://localhost:3000
```

## 📂 Project Structure

```
blogzap/
 ├─ controllers/
 ├─ middleware/
 ├─ models/
 ├─ routes/
 ├─ services/
 ├─ public/
 ├─ views/
 │   ├─ components/
 │   ├─ 404.ejs
 │   ├─ blog.ejs
 │   ├─ addBlog.ejs
 │   ├─ home.ejs
 ├─ app.js
 └─ README.md
```

## 🧠 Core Workflow

> Login → Write → Upload → Publish → Browse → Search → Navigate

## 🏷️ Versioning

Current stable versions:

| Version    | Description                                    |
| ---------- | ---------------------------------------------- |
| **v1.0.0** | First Stable Release                           |
| **v1.1.0** | Redirect fixes, missing imports, global footer |

## 🔮 Roadmap

- Blog editing & deletion

- User profile pages

- Comment & reaction system

- JWT API endpoints

- SEO improvements & metadata

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!
Please open an issue before submitting a PR.

## 🛡️ License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.  
You are free to use, modify, and distribute this software, including for commercial purposes, **as long as any modifications or derivative works are also open-sourced under the GPL-3.0 license**.


## ⭐ Show Support

If you like this project:

> ⭐ Star this repo on GitHub

It helps with visibility & motivation.

# 💙 Thank you for checking out Blogzap

**Start writing. Start sharing. Start building.**
