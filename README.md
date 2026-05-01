# Tiles Gallery

Tiles Gallery is a premium web application to showcase and explore an exclusive collection of artisan tiles. From classic ceramics to modern marble, find the perfect aesthetic for your next project.

## Live Demo
*Live URL to be added upon deployment (e.g., Vercel, Render)*

## Key Features

- **Responsive Design**: Fully responsive UI built with Tailwind CSS and DaisyUI, ensuring a seamless experience across desktop, tablet, and mobile devices.
- **Authentication**: Secure user authentication (Login/Register) utilizing Better-Auth with MongoDB Adapter, including Google OAuth integration.
- **Interactive Gallery**: Browse tiles with a built-in search functionality to easily find specific styles or categories.
- **Detailed Tile View**: View high-resolution images, specifications, stock status, and detailed descriptions of each tile.
- **User Profiles**: Logged-in users can view their profile and update their display name and profile picture.
- **Continuous Marquee**: A smooth, auto-playing marquee highlighting new arrivals and featured categories using SwiperJS.
- **Protected Routes**: Next.js middleware ensures private routes like `/my-profile` and `/tile/[id]` are only accessible to authenticated users, while logged-in users are redirected away from authentication pages.

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Authentication**: Better-Auth (MongoDB Adapter)
- **Database**: MongoDB (via `mongodb` Node driver)
- **Icons**: Lucide React
- **Animations/Sliders**: SwiperJS

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (Atlas or local)
- Google OAuth credentials (for social login)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tiles-gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env.local` file in the root directory:
   ```env
   # Database connection
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tiles-gallery
   
   # Better Auth Secret (generate a random string)
   BETTER_AUTH_SECRET=your_secret_key
   
   # App URL (your local dev server or production URL)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design Choices

- **DaisyUI**: Chosen for its rich set of accessible, semantic HTML components built on top of Tailwind CSS, which significantly accelerates development while maintaining a unique design.
- **Next.js API Routes for Data**: Instead of a traditional `json-server` (which presents deployment challenges on serverless platforms like Vercel), this project uses Next.js App Router API endpoints (`/api/tiles`) to serve the mock JSON data. This ensures 100% compatibility with platforms like Vercel and Render without throwing errors on route reloads.

## Author
Built for Assignment 8.
