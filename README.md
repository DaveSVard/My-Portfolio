# 🚀 My Portfolio Website

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-David%20Vardanyan-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, interactive portfolio website showcasing my skills, projects, and passion for frontend development. Built with cutting-edge technologies and featuring smooth animations, 3D elements, and interactive games.

</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Theme** - Seamless theme switching with persistent preferences
- **Responsive Design** - Fully optimized for all device sizes
- **Interactive Cursor** - Custom cursor effects for enhanced user experience
- **Smooth Animations** - Framer Motion powered page transitions and micro-interactions

### 🎭 **Advanced Animations**
- **Page Switch Animations** - Stairs and transition effects between pages
- **Scroll Animations** - Reveal effects and parallax scrolling
- **Canvas Reveal Effects** - Three.js powered visual effects
- **Digital Rain Effect** - Matrix-style animated background
- **Text Flip Animations** - Dynamic text transitions
- **Card Rotations** - Interactive 3D card effects

### 🎮 **Interactive Elements**
- **Classic Tetris Game** - Fully playable Tetris game (desktop only)
- **3D Computer Model** - Interactive Three.js model on contact page
- **Skills Timeline** - Scroll-triggered animated timeline
- **Animated Stats** - Count-up animations for statistics

### 📧 **Contact System**
- **Contact Form** - Validated form with Zod schema validation
- **Email Integration** - Nodemailer-powered email sending
- **Social Links** - Direct links to GitHub and LinkedIn

### 🎯 **Performance Optimizations**
- **Code Splitting** - Optimized bundle splitting for faster loads
- **Dynamic Imports** - Lazy loading for heavy components
- **Image Optimization** - Next.js image optimization with AVIF/WebP
- **SSR/SSG** - Server-side rendering for better SEO

---

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 16.1** - React framework with App Router
- **React 19.0** - Latest React features
- **TypeScript 5.0** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Custom Theme System** - Dynamic color theming

### **Animation & 3D**
- **Framer Motion 11.3** - Production-ready motion library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F

### **Form & Validation**
- **Zod 4.1** - TypeScript-first schema validation
- **React Hook Form** - Performant forms with easy validation

### **Backend & Email**
- **Next.js API Routes** - Serverless API endpoints
- **Nodemailer** - Email sending functionality

### **Fonts**
- **JetBrains Mono** - Monospace font for code
- **Prata** - Serif font for headings

### **Icons**
- **React Icons** - Comprehensive icon library

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # SMTP Configuration for Contact Form
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   SMTP_FROM=your-email@example.com
   CONTACT_EMAIL=your-contact@example.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run develop      # Start development server with Webpack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📁 Project Structure

```
My-Portfolio/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── contact/          # Contact form endpoint
│   ├── contact/              # Contact page
│   ├── games/                # Games section
│   │   └── tetris/           # Tetris game page
│   ├── skills/               # Skills page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
│
├── components/               # React components
│   ├── atoms/                # Basic UI components
│   │   ├── AnimatedCard.tsx
│   │   ├── CanvasRevealEffect.tsx
│   │   ├── DigitalRain.tsx
│   │   ├── InteractiveCursor.tsx
│   │   └── ...
│   ├── molecules/            # Composite components
│   ├── organisms/            # Complex components
│   │   ├── PageSwitchAnimation.tsx
│   │   └── StairsAnimation.tsx
│   ├── pages/                # Page components
│   │   ├── Homepage/
│   │   ├── Skills/
│   │   ├── Contact/
│   │   └── Games/
│   ├── templates/            # Layout templates
│   │   └── Header/
│   └── providers/            # Context providers
│       ├── ThemeProvider.tsx
│       └── ColorThemeProvider.tsx
│
├── constants/                # Configuration & constants
│   ├── homepage.ts
│   ├── skills.tsx
│   ├── contact.tsx
│   └── theme.ts
│
├── lib/                      # Utility functions
│   ├── motion.ts             # Animation utilities
│   ├── mouseAnimation.ts     # Mouse tracking
│   └── utils.ts              # General utilities
│
├── public/                   # Static assets
│   ├── assets/               # Images & logos
│   └── models/               # 3D models (GLB files)
│
└── types/                    # TypeScript types
    └── type.ts
```

---

## 📄 Pages

### 🏠 **Homepage** (`/`)
- Hero section with animated introduction
- Digital rain and circle animations
- Statistics showcase with count-up animations
- About section with dynamic text

### 💼 **Skills** (`/skills`)
- Skills hero with animated text flip
- Interactive timeline with scroll animations
- Technology cards with canvas reveal effects
- Categorized skill sets

### 🎮 **Games** (`/games`)
- Game showcase grid
- Classic Tetris game (desktop only)
- Game information modals
- Responsive game cards

### 📧 **Contact** (`/contact`)
- Interactive 3D computer model
- Contact form with validation
- Social media links
- Email and phone information

---

## 🎨 Key Components

### **Animation Components**
- `PageSwitchAnimation` - Page transition effects
- `StairsAnimation` - Staircase transition animation
- `CanvasRevealEffect` - Three.js canvas effects
- `DigitalRain` - Matrix-style rain effect
- `ContainerTextFlip` - Text rotation animation

### **Interactive Components**
- `InteractiveCursor` - Custom cursor effects
- `AnimatedCard` - Hover and interaction effects
- `CardRotateAnimationWrapper` - 3D card rotations
- `InViewContainer` - Scroll-triggered animations

### **UI Components**
- `ThemeSwitch` - Dark/light mode toggle
- `ThemeSettingsModal` - Theme customization
- `Button`, `Input`, `Textarea` - Form components
- `Sheet` - Slide-out panels

---

## 🔧 Configuration

### **Theme Configuration**
The portfolio uses a custom theme system with:
- Dynamic color theming
- CSS variables for theming
- Persistent theme preferences
- Smooth theme transitions

### **Animation Configuration**
Animations are configured in `lib/motion.ts`:
- Fade in/out animations
- Opacity transitions
- Scroll-triggered animations
- Custom easing functions

### **Webpack Optimization**
The project includes custom webpack configuration for:
- Code splitting
- Bundle optimization
- Vendor chunk separation
- Performance improvements

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Some features (like Tetris game) are desktop-only for optimal experience.

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_SECURE` | Use TLS/SSL (true/false) | Yes |
| `SMTP_USER` | SMTP username | Yes |
| `SMTP_PASS` | SMTP password | Yes |
| `SMTP_FROM` | From email address | Yes |
| `CONTACT_EMAIL` | Contact form recipient | Yes |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is private and personal. All rights reserved.

---

## 👤 Author

**David Vardanyan**

- 🌐 Portfolio: https://my-portfolio-mauve-iota.vercel.app/
- 💼 LinkedIn: [David Vardanyan](https://www.linkedin.com/in/david-vardanyan-738b95336/)
- 🐙 GitHub: [@DaveSVard](https://github.com/DaveSVard)
- 📧 Email: vardanyan003@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Three.js](https://threejs.org/) - 3D graphics library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Aceternity UI](https://ui.aceternity.com/) - UI components inspiration

---

<div align="center">

**Made with ❤️ by David Vardanyan**

⭐ Star this repo if you find it interesting!

</div>
