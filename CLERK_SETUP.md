# Clerk Authentication Setup Guide

## Quick Setup Steps

1. **Create Clerk Account**
   - Go to [https://clerk.com](https://clerk.com)
   - Sign up for a free account

2. **Create Application**
   - Click "Add Application"
   - Choose "JavaScript" as framework
   - Name your app (e.g., "PM Internship AI")

3. **Get API Keys**
   - Copy your Publishable Key from the dashboard
   - Replace `pk_test_your-clerk-publishable-key-here` in `auth.js` with your actual key

4. **Configure Domain**
   - In Clerk dashboard, go to "Domains"
   - Add your domain (for local development: `http://localhost:3000` or your local server)

5. **Test Authentication**
   - Open your application
   - Click "Sign In" button
   - Complete the sign-up/sign-in flow

## Features Added

- ✅ Sign In/Sign Out functionality
- ✅ User profile management
- ✅ Protected internship applications
- ✅ Authentication state management
- ✅ Responsive auth UI

## Usage

Users must sign in to:
- Apply for internships
- Access personalized features

The authentication is seamlessly integrated with your existing UI and maintains the dark/light mode theming.