# 📸 Instagram Stories Viewer - React

A polished Instagram-style stories viewer built with **React**, **Framer Motion**, and **TypeScript**. This project mimics Instagram’s stories UX, allowing users to click through user stories, with animated transitions, progress bars, and close friends features.

## 🚀 Features

- Instagram-like user story viewer
- Animated transitions with Framer Motion
- Click-through stories and auto-reset
- Progress bar for story advancement
- "Close Friends" badge (green star icon)
- Fully responsive UI (mobile-first)
- Testable with Jest and React Testing Library
- Clean, modular TypeScript codebase
- Manual and automatic story advancement (5s)
- Horizontally scrollable story list
- Stories fetched from external JSON file
- Loading state and transition effects

## 🧰 Tech Stack

- ⚛️ React
- ⛓ TypeScript
- 🎞 Framer Motion (only for animations)
- 🧪 Jest + React Testing Library
- 💅 Tailwind CSS

## 📁 Project Structure

```
src/
├── assets/               # Static assets (images, data)
│   └── index.tsx         # Exports logo, profile pictures, storiesData
├── components/
│   ├── StoryViewer.tsx   # Main story viewing component
│   ├── StoriesSection.tsx# Horizontal list of story thumbnails
│   ├── Skeleton.tsx      # To Add lazy load shimmer for posts section in the rest of Home page
│   └── TopProgressBar.tsx# Progress bar for story advancement
├── interface/            # TypeScript interfaces
├── App.tsx               # App entry point
├── __tests__/            # Unit tests
└── index.tsx             # ReactDOM render entry
```

## 🧪 Running Tests

This project uses `jest` and `@testing-library/react` for unit and E2E-style tests.

```bash
# Checkout to development branch
git checkout story-viewer

# Install dependencies
npm install

# Run tests
npm run test
```

Ensure you are mocking `getBoundingClientRect` and static asset imports correctly.

## 🏗 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Ensure `storiesData.json` exists in the `assets/` directory and is exported via `index.tsx`.

## 💼 Design Decisions

- **Mobile-first approach**: Layouts and dimensions tailored for mobile viewports only.
- **No external libraries for story logic**: Manual implementation of auto-play and click navigation to meet assignment requirements.
- **Component reusability**: Split logic into StoryViewer, StoriesSection, and TopProgressBar.
- **Testability**: Data-testid attributes and mocks used to simulate realistic user flows.

## 🔗 Deployment

[Live Demo](https://your-deployment-link.com)&#x20;

## 🖼 Sample `storiesData.json`

```json
[
  {
    "username": "john_doe",
    "profilePic": "profile-pic-1.jpg",
    "isClose": true,
    "hasWatched": false,
    "stories": [
      {
        "src": "story-1.jpg",
        "time": "2h"
      },
      {
        "src": "story-2.jpg",
        "time": "1h"
      }
    ]
  }
]
```

## 🙌 Acknowledgements

- [Instagram](https://instagram.com) for the UX inspiration
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide Icons](https://lucide.dev/) for consistent iconography

---

> Crafted with ❤️ by Ishant Sehrawat
