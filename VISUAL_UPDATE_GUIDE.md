# 📸 HTML/CSS Updates - Visual Guide

## Update 1: Navbar Brand - Before & After

### BEFORE

```
┌─────────────────────────────────────────┐
│ 🍕 Hacobos Bread   Home About Menu      │
│                                         │
└─────────────────────────────────────────┘

   Pizza emoji + text
```

### AFTER

```
┌─────────────────────────────────────────┐
│ [Profile.jpg] Hacobos Bread   Home About│
│     (circular)                   Menu    │
└─────────────────────────────────────────┘

   Circular profile image + text (clickable)
```

### What Changed

- **Before**: 🍕 emoji + h1 text
- **After**: [Profile.jpg image] + brand text
- **Styling**:
  - Image is circular (50% border-radius)
  - Height: 38px
  - Clickable link to #home
  - Hover effect (0.8 opacity)

### HTML Structure

```html
<!-- BEFORE -->
<div class="navbar-brand">
  <h1>🍕 Hacobos Bread</h1>
</div>

<!-- AFTER -->
<a class="navbar-brand" href="#home">
  <img
    src="images/Profile.jpg"
    alt="Hacobos Bread"
    height="38"
    class="navbar-logo"
  />
  <span class="navbar-brand-text">Hacobos Bread</span>
</a>
```

### CSS Classes

```css
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 1.6rem;
}

.navbar-logo {
  height: 38px;
  width: auto;
  border-radius: 50%; /* Circular! */
  object-fit: cover;
}

.navbar-brand:hover {
  opacity: 0.8; /* Subtle hover effect */
}
```

---

## Update 2: About Section - Before & After

### BEFORE

```
ABOUT US
═══════════════════════════════════════════

About Text              ┌─────────────────┐
About Text              │                 │
About Text              │  Static Image   │
About Text              │  (placeholder)  │
About Text              │                 │
                        └─────────────────┘

   Single static image
```

### AFTER

```
ABOUT US
═══════════════════════════════════════════

About Text              ┌──────────────────────┐
About Text              │  [Area1.jpg]   ►    │
About Text              │ ◄              ◄    │
About Text              │  (Auto-slides)      │
About Text              │  Area 1 / 4 images  │
                        └──────────────────────┘

   Interactive carousel with 4 images
   - Auto-play functionality
   - Previous/Next buttons
   - Smooth transitions
```

### What Changed

- **Before**: Single placeholder image
- **After**: Bootstrap 5 carousel with 4 images
- **Images**: Area1.jpg, Area2.jpg, Area3.jpg, Area4.jpg
- **Active**: Area1.jpg (first image shown)
- **Height**: 400px minimum
- **Features**:
  - ◄ Previous button (left arrow)
  - ► Next button (right arrow)
  - Auto-play every 5 seconds
  - Smooth transitions
  - Rounded corners
  - Professional shadow

### HTML Structure

```html
<!-- BEFORE -->
<div class="about-image">
  <img
    src="https://via.placeholder.com/400x300?text=Hacobos+Bread"
    alt="Hacobos Bread Café Interior"
  />
</div>

<!-- AFTER -->
<div class="about-image">
  <div id="aboutCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <!-- Slide 1 - Active -->
      <div class="carousel-item active">
        <img
          src="images/Area1.jpg"
          class="d-block w-100"
          alt="Area landscape 1"
        />
      </div>

      <!-- Slide 2 -->
      <div class="carousel-item">
        <img
          src="images/Area2.jpg"
          class="d-block w-100"
          alt="Area landscape 2"
        />
      </div>

      <!-- Slide 3 -->
      <div class="carousel-item">
        <img
          src="images/Area3.jpg"
          class="d-block w-100"
          alt="Area landscape 3"
        />
      </div>

      <!-- Slide 4 -->
      <div class="carousel-item">
        <img
          src="images/Area4.jpg"
          class="d-block w-100"
          alt="Area landscape 4"
        />
      </div>
    </div>

    <!-- Previous Button -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#aboutCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <!-- Next Button -->
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#aboutCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
```

### CSS Classes Added

```css
#aboutCarousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: var(--bg-medium);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.carousel-control-prev,
.carousel-control-next {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%; /* Circular buttons */
  width: 44px;
  height: 44px;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: rgba(0, 0, 0, 0.6); /* Darker on hover */
}

.carousel-control-prev {
  left: 15px;
}

.carousel-control-next {
  right: 15px;
}
```

---

## Bootstrap 5 Integration

### CSS Added to `<head>`

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

### JavaScript Added Before `</body>`

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Bootstrap Utilities Used

- `.d-block` - Display as block element
- `.w-100` - Width 100%
- `.carousel` - Main carousel container
- `.carousel-slide` - Animation effect
- `.carousel-item` - Individual slide
- `.carousel-item.active` - Current slide

---

## 🎬 Carousel In Action

### Sequence of Images

```
Initial State (Auto-playing)
├─ 5 sec → Area1.jpg (VISIBLE)
├─ 10 sec → Transition to Area2.jpg
├─ 15 sec → Area2.jpg (VISIBLE)
├─ 20 sec → Transition to Area3.jpg
├─ 25 sec → Area3.jpg (VISIBLE)
├─ 30 sec → Transition to Area4.jpg
├─ 35 sec → Area4.jpg (VISIBLE)
└─ 40 sec → Transition back to Area1.jpg (LOOPS)
```

### User Interaction

- **Click ◄ Button** → Go to previous image (with smooth transition)
- **Click ► Button** → Go to next image (with smooth transition)
- **Auto-play** → Continues regardless (can be clicked during auto-play)

---

## 🎯 File Requirements

### Images Needed in `images/` folder

```
images/
├── Profile.jpg      (Navbar brand image - ~38px height)
├── Area1.jpg        (Carousel slide 1 - ACTIVE/FIRST)
├── Area2.jpg        (Carousel slide 2)
├── Area3.jpg        (Carousel slide 3)
└── Area4.jpg        (Carousel slide 4)
```

### Image Specifications

- **Profile.jpg**:
  - Best format: Square image (for circular display)
  - Recommended size: 100x100px or larger
  - Will be displayed as 38px circular

- **Area1.jpg - Area4.jpg**:
  - Recommended aspect ratio: 16:9 or 4:3
  - Minimum width: 400px
  - Can be landscape or portrait
  - Will scale to 100% width of container

---

## ✨ Visual Effects

### Navbar Logo

```
DEFAULT STATE        HOVER STATE
┌────────────────┐   ┌────────────────┐
│  [Profile]     │   │  [Profile]     │
│  Hacobos Bread │   │  Hacobos Bread │
└────────────────┘   └────────────────┘
  Opacity: 1.0        Opacity: 0.8
```

### Carousel Controls

```
DEFAULT STATE        HOVER STATE
┌──────────────┐     ┌──────────────┐
│  [◄ Image ►] │     │  [◄ Image ►] │
│ Semi-dark ▲  │  →  │  Dark ▲ ▼    │
│ Controls (◄►)│     │ Controls (◄►)│
└──────────────┘     └──────────────┘
  Background:        Background:
  rgba(0,0,0,0.3)   rgba(0,0,0,0.6)
```

---

## 🔄 Complete Update Summary

| Component             | Before          | After                | Benefit               |
| --------------------- | --------------- | -------------------- | --------------------- |
| **Navbar Brand**      | 🍕 emoji + text | [Profile.jpg] + text | Professional image    |
| **Navbar Brand Link** | Static text     | Clickable link       | Better UX             |
| **About Image**       | Single static   | 4-image carousel     | More engagement       |
| **Image Display**     | Fixed           | Auto-play slides     | Dynamic content       |
| **Navigation**        | None            | ◄ Prev, Next ►       | User control          |
| **Styling**           | Basic           | Rounded, shadow      | Premium look          |
| **Interactivity**     | None            | Hover effects        | Better feedback       |
| **Accessibility**     | Basic           | Alt text, ARIA       | Screen reader support |

---

## 📱 Responsive Design

### Desktop (1200px+)

```
┌─[Profile] Hacobos Bread─ Home About Menu────┐
│                                              │
│ About Text    ┌──────────────────────┐      │
│ About Text    │ Area 1/4  [◄   ►]   │      │
│ About Text    │                      │      │
│ About Text    │ (Full carousel view) │      │
│               └──────────────────────┘      │
└──────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌─[P] Hacobos─ Home About Menu──────┐
│                                    │
│ About                              │
│ Text    ┌───────────────────┐    │
│ About   │ Area 1/4 [◄  ►]  │    │
│ Text    │                   │    │
│         └───────────────────┘    │
└────────────────────────────────────┘
```

### Mobile (375px)

```
┌─[P] Hacobos─ Menu──┐
│                    │
│ About Text         │
│ ┌────────────────┐ │
│ │ Area 1/4       │ │
│ │ [◄] Image [►]  │ │
│ │                │ │
│ └────────────────┘ │
└────────────────────┘
```

---

## ✅ Testing Checklist

- [ ] Profile image displays in navbar (circular)
- [ ] Navbar brand is clickable (goes to #home)
- [ ] Carousel shows Area1.jpg first (active)
- [ ] Previous button shows Area4 from Area1
- [ ] Next button shows Area2 from Area1
- [ ] Carousel auto-plays every 5 seconds
- [ ] Images transition smoothly
- [ ] Buttons have hover effect (darker)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Alt text shows in browser inspector

---

## 🚀 Ready to Launch!

Your updates are complete:

- ✅ Navbar brand image implemented
- ✅ Carousel with 4 images added
- ✅ Bootstrap 5 integrated
- ✅ CSS styling applied
- ✅ Responsive design maintained
- ✅ Professional appearance preserved

**Place your images in the `images/` folder and the website is ready!** 🎉
