# Blog Platform

A full-stack blog platform built using **Next.js** and **MongoDB Atlas**, with rich text editing, dynamic routing, and admin control — fully deployed on **Vercel**.

---

## 🔗 Live Demo

🌐 [https://blog-sooty-zeta-46.vercel.app](https://blog-sooty-zeta-46.vercel.app)

---

## ✨ Features

- ✅ Create, Edit, Delete blog posts (Admin-only)
- ✅ Rich text input using React Quill
- ✅ Dynamic slug-based URLs for SEO
- ✅ MongoDB Atlas integration via Mongoose
- ✅ Public blog viewer per post
- ✅ SEO meta tags on each post page
- ✅ Fully deployed on Vercel

---

## 🧭 Working URLs

| Feature            | Live URL                                                  |
|--------------------|-----------------------------------------------------------|
| 🏠 Homepage         | `/` → [Open](https://blog-sooty-zeta-46.vercel.app/)     |
| ✍️ Create Post      | `/admin/create` → [Open](https://blog-sooty-zeta-46.vercel.app/admin/create) |
| 📋 Admin Dashboard  | `/admin` → [Open](https://blog-sooty-zeta-46.vercel.app/admin) |
| 🔎 View Blog Post   | `/posts/my-first-blog` → [Open](https://blog-sooty-zeta-46.vercel.app/posts/my-first-blog) |

---

## ⚙️ Tech Stack

- **Frontend + Backend**: Next.js (Pages Router)
- **Database**: MongoDB Atlas (via Mongoose)
- **Rich Editor**: React Quill
- **Hosting**: Vercel
- **Languages**: JavaScript (no TypeScript)

---

## 📁 Folder Structure

pages/
├── api/posts/ # API Routes (create, edit, delete, get)
├── admin/ # Admin UI pages
├── posts/[slug].js # Public post viewer
├── index.js # Home page with useful links
models/Post.js # Mongoose schema
lib/dbConnect.js # MongoDB connection logic


---

## 🚀 How to Run Locally

```bash
git clone https://github.com/ApabritaSarkar/blog
cd blog
npm install
# Add your Mongo URI in .env.local
npm run dev

👤 Author
Built by Apabrita Sarkar as a learning + intern project.
If you liked this, feel free to ⭐ the repo!