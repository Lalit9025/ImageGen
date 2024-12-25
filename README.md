#Next.js Image Generation App

This is a fully functional image generation app built with **Next.js**. The app allows users to generate images based on text prompts using the **Fal.AI** API. Users can input prompts, trigger image generation, and view the generated images. The app also includes user authentication and a secure logout mechanism.

## Features

- User authentication (via `localStorage` token).
- Input prompts and generate images.
- Display generated images in a gallery.
- Logout functionality.

## Setup Instructions

### 1. Clone the Repository

Clone the project to your local machine:

```bash
[git clone https://github.com/Lalit9025/ImageGen.git]
cd ImageGen
```

### 2. Install Dependencies

Install required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
FALAI_API_KEY=your_falai_api_key
MONGODB_URI=your_mongodb_connection_string (if applicable)
JWT_SECRET
```

- **FALAI_API_KEY**: Obtain the API key from [Fal.AI](https://fal.ai).
- **MONGODB_URI**: Use if MongoDB is required for user data storage.

### 4. Run the Application Locally

To run the app locally:

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

To build the app for production:

```bash
npm run build
npm run start
```



### Key Sections:

1. **Setup Instructions**: Provides the steps for installing dependencies, configuring environment variables, and running the app.
2. **Folder Structure**: Shows the main structure of the project for better understanding.
3. **License and Contact**: Adds basic project license and contact information.

This `README.md` will guide users through setting up, running, and deploying the application.
