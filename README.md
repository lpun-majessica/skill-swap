# SkillSwap

SkillSwap is a responsive web application designed to connect people based on the skills they want to teach and learn. Built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**, it supports both dark and light modes for an enhanced user experience.

## Author

- Nguyen Thi Ngoc Anh
- Nguyen Nhu Ha
- Nguyen Pham Anh Thu
- Nguyen Thi Cam Thach
- Le Thi Diem My
- Le Phuong Uyen Nhi

## Getting Started

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Goal

SkillSwap enables users to showcase a skill they can teach and one they want to learn. It facilitates mutual skill exchange by connecting users with shared interests.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: `React Context API` via `useContext`
- **Mock Backend**: Local JSON file
- **Storage**: `localStorage` for session persistence

---

## Test Accounts

Use the following usernames to log in:

1. `alexj`
2. `bella.design`

---

## Pages Overview

### Landing Page

- Public welcome page with a call-to-action for login/signup.

<img src="public/demo/homepage-light.jpeg" alt="Homepage Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/homepage-dark.jpeg" alt="Homepage Dark" width="45%" style="display:inline-block;">

### Login Page

- Enter a test account username.
- Saves the current user to `localStorage` for session persistence.

<img src="public/demo/login-page-light.jpeg" alt="Login Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/login-page-dark.jpeg" alt="Login Dark" width="45%" style="display:inline-block;">

### Explore Page

- **Features**:
  - Users sorted by match status and number of compatible skills.
  - Highlight users with at least one match in both "teach" and "learn".
- **Filters**:
  - By skill to teach or learn.
  - By username or name (search).
- **Actions**:
  - Send connection requests.
  - Accept/reject invitations.
  - Cancel sent requests.

<img src="public/demo/explore-light.jpeg" alt="Explore Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/explore-dark.jpeg" alt="Explore Dark" width="45%" style="display:inline-block;">

### My Network Page

- Displays connections categorized as:
  - My Connections
  - Pending Requests (sent)
  - Invitations (received)
- Supports filters and search.

<img src="public/demo/my-network-light.jpeg" alt="My Network Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/my-network-dark.jpeg" alt="My Network Dark" width="45%" style="display:inline-block;">

### Settings Page

- Allows users to edit:
  - Name
  - Date of birth
  - Bio
  - Skills to Teach
  - Skills to Learn

<img src="public/demo/settings-light.jpeg" alt="Settings Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/settings-dark.jpeg" alt="Settings Dark" width="45%" style="display:inline-block;">

### User Profile Page

- View another user’s full profile.
- Displays mutual skills.
- Includes an action button (connect / pending / connected / respond).

<img src="public/demo/user-profile-light.jpeg" alt="User Profile Light" width="45%" style="display:inline-block; margin-right:5%;">
<img src="public/demo/user-profile-dark.jpeg" alt="User Profile Dark" width="45%" style="display:inline-block;">

---

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dark/Light Mode**: Seamless theme switching.
- **Skill Matching**: Intuitive logic to connect users with shared interests.
- **Persistent Sessions**: User data stored in `localStorage`.
