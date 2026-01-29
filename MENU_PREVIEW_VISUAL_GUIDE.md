# 🖼️ Menu Preview - Visual & Code Guide

**Hacobos Bread - Premium Hover Image Preview System**

---

## 🎬 User Experience Flow

### 1. Initial State (Page Load)

```
┌─────────────────────────────────────────────────────────────────┐
│                         HACOBOS BREAD MENU                       │
│                                                                  │
│ 🍰 CHEESECAKE                                                   │
│ ┌──────────────────────┐  ┌──────────────────────┐             │
│ │ Cheesecake          │  │ Cheesecake          │              │
│ │ • Mini    ₱79.00    │  │ • Mini    ₱79.00    │              │
│ │ • Small   ₱450.00   │  │ • Small   ₱450.00   │              │
│ │ • Regular ₱875.00   │  │ • Regular ₱875.00   │              │
│ └──────────────────────┘  └──────────────────────┘             │
│ (Preview bubble hidden)    (Preview bubble hidden)             │
│                                                                  │
│ 🍕 CLASSIC OVERLOAD PIZZA                                       │
│ ┌──────────────────────┐  ┌──────────────────────┐             │
│ │ Hawaiian            │  │ Pepperoni           │              │
│ │ • Regular ₱179.00   │  │ • Regular ₱179.00   │              │
│ │ • Large   ₱299.00   │  │ • Large   ₱299.00   │              │
│ └──────────────────────┘  └──────────────────────┘             │
│ (Preview bubble hidden)    (Preview bubble hidden)             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

CSS: opacity: 0, visibility: hidden, pointer-events: none
Result: User sees clean menu, no previews yet
```

### 2. User Hovers Over Item

```
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃ [Hawaiian Pizza Image] ┃ ← Slides up,
                    ┃     280×180px          ┃    fades in
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━┛    (0.4s)
                            ▼ (arrow)
    ┌──────────────────────────────────────────┐
    │ Hawaiian  ← Item lifts up (-4px)         │ ← transform
    │ • Regular ₱179.00  ← border color change │ ← accent-rose
    │ • Large   ₱299.00  ← shadow elevation    │ ← shadow-lg
    └──────────────────────────────────────────┘

CSS: 
- opacity: 1
- visibility: visible
- pointer-events: auto
- transform: translateY(0)

Result: Smooth preview appears, menu item highlighted
```

### 3. User Hovers Away

```
┌──────────────────────┐
│ Hawaiian            │  ← Item returns to normal state
│ • Regular ₱179.00   │
│ • Large   ₱299.00   │
└──────────────────────┘  ← Preview fades out (0.4s)

CSS reverses:
- opacity: 1 → 0
- transform: translateY(0) → +20px

Result: Preview disappears smoothly, menu returns to normal
```

---

## 🎨 HTML Structure Evolution

### Before Implementation

```html
<div class="menu-item">
  <h4>Hawaiian</h4>
  <ul class="menu-sizes">
    <li>
      <span class="size">Regular (R)</span>
      <span class="price">₱179.00</span>
    </li>
    <li>
      <span class="size">Large (L)</span>
      <span class="price">₱299.00</span>
    </li>
  </ul>
</div>
```

### After Implementation

```html
<div class="menu-item" data-image="Hawaiian.jpg">  ← NEW: data-image
  <h4>Hawaiian</h4>
  
  <div class="menu-item-preview">                 ← NEW: Preview container
    <img 
      src="" 
      alt="Hawaiian pizza product photo"          ← NEW: Accessible alt text
      class="preview-image" 
    />
    <span class="preview-arrow"></span>           ← NEW: Arrow (CSS)
  </div>
  
  <ul class="menu-sizes">
    <li>
      <span class="size">Regular (R)</span>
      <span class="price">₱179.00</span>
    </li>
    <li>
      <span class="size">Large (L)</span>
      <span class="price">₱299.00</span>
    </li>
  </ul>
</div>
```

**Key Changes:**
- ✅ `data-image="Hawaiian.jpg"` → Maps to image file
- ✅ `.menu-item-preview` div → Preview container (NEW)
- ✅ `.preview-image` img → Image element (NEW, initially empty)
- ✅ `.preview-arrow` span → CSS arrow (NEW, no content)

---

## 🎬 CSS Animation Timeline

### Animation Breakdown

```
TRANSITION: opacity 0.4s ease-out, transform 0.4s ease-out

     0ms              100ms             200ms             300ms             400ms
     |                 |                 |                 |                 |
START                                                                         END
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPACITY:
0%    0.1%  0.2%  1%   5%   15%  30%  50%  70%  85%  95%  99%  100%
|────────────────────────────────────────────────────────────────────|
FADE-IN                                                        COMPLETE ✓

TRANSFORM (translateY):
+20px +18px +16px +12px +8px +4px  +2px  0px
|────────────────────────────────────────|
SLIDE-UP (ease-out = decelerating)  COMPLETE ✓

EASING CURVE (ease-out):
          ╱────
        ╱
      ╱
    ╱
  ╱─────────

Fast start → Gradual deceleration → Smooth settle
(Natural, premium feel)
```

### CSS Code

```css
.menu-item-preview {
    /* Initially hidden */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateY(+20px);  ← 20px down
    
    /* Smooth animation */
    transition: opacity 0.4s ease-out,
                transform 0.4s ease-out,
                visibility 0.4s ease-out;
}

.menu-item:hover .menu-item-preview {
    /* On hover: show and move up */
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);  ← Back to original
}
```

---

## 🏗️ CSS Speech Bubble Construction

### Bubble Components

```
┌────────────────────────────────────┐
│  .preview-image (img element)      │  ← Image on top (z-index: 2)
│  280×180px, border-radius: 14px    │
│  object-fit: cover                 │
│                                    │
└────────────────────────────────────┘
 │
 ├─ Background: .menu-item-preview::before
 │  └─ white, 14px border-radius, shadow (behind image)
 │
 └─ Arrow: .preview-arrow
    └─ CSS triangle, 10px height, points down
```

### CSS Triangle (Arrow) Trick

```javascript
.preview-arrow {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;    ← Transparent left
    border-right: 10px solid transparent;   ← Transparent right
    border-top: 10px solid white;           ← Visible top (colored)
    
    Result: ▼ (downward-pointing triangle)
}
```

**How It Works:**
```
The "border trick" creates a triangle:

  border-top: 10px solid white
        ↓
    ╱───────╲
   ╱         ╲     ← Visible triangle pointing down
  ╱___________╲    ← White background color
 ↑             ↑
 transparent    transparent
 (borders)      (borders)
```

### Full Bubble CSS

```css
/* Container */
.menu-item-preview {
    position: absolute;
    top: -220px;              /* 220px above menu item */
    left: 50%;                /* Centered horizontally */
    transform: translateX(-50%) translateY(+20px);
    opacity: 0;
    visibility: hidden;
    transition: 0.4s ease-out;
}

/* White background (via pseudo-element) */
.menu-item-preview::before {
    content: '';
    position: absolute;
    inset: 0;                 /* Fill parent */
    background: white;
    border-radius: 14px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.18);
    z-index: 1;
}

/* Image on top */
.preview-image {
    position: relative;
    width: 280px;
    height: 180px;
    object-fit: cover;
    border-radius: 14px;
    z-index: 2;
    display: block;
}

/* Arrow below */
.preview-arrow {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
    z-index: 0;
}

/* Show on hover */
.menu-item:hover .menu-item-preview {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}
```

---

## ⚙️ JavaScript Progressive Enhancement

### How It Works

```javascript
1. Find all menu items with data-image attribute
   └─ document.querySelectorAll('.menu-item[data-image]')

2. For each item, attach event listeners:
   ├─ mouseenter → Load image on desktop hover
   ├─ focus → Load image on keyboard tab
   └─ touchstart → Load image on mobile tap

3. On first interaction:
   ├─ Get imageName from data-image attribute
   ├─ Build path: images/Menu/{imageName}
   ├─ Load image (validate it exists)
   ├─ Set src on .preview-image
   ├─ Add to loadedImages set (track loaded)
   └─ Image fades in smoothly

4. On subsequent interactions:
   ├─ Check if imageName ∈ loadedImages
   ├─ If yes → Skip (already loaded)
   └─ If no → Load

Result: Lazy loading + caching + validation
```

### Code Example

```javascript
// Find all menu items with images
const menuItemsWithImages = document.querySelectorAll('.menu-item[data-image]');
const loadedImages = new Set();  // Track which images loaded

function loadPreviewImage(menuItem, imageName) {
    // Skip if already loaded
    if (loadedImages.has(imageName)) return;
    
    // Find image element
    const previewImg = menuItem.querySelector('.preview-image');
    if (!previewImg) return;
    
    // Build image path
    const imagePath = `images/Menu/${imageName}`;
    
    // Validate image exists
    const testImg = new Image();
    testImg.onload = function () {
        // Success: Set src and fade in
        previewImg.src = imagePath;
        previewImg.style.opacity = '0';
        previewImg.style.transition = 'opacity 0.3s ease-in';
        setTimeout(() => {
            previewImg.style.opacity = '1';
        }, 10);
        loadedImages.add(imageName);
    };
    testImg.onerror = function () {
        // Error: Log warning, bubble still shows
        console.warn(`Image not found: ${imagePath}`);
    };
    testImg.src = imagePath;
}

// Attach event listeners
menuItemsWithImages.forEach(function (menuItem) {
    const imageName = menuItem.getAttribute('data-image');
    
    // Desktop hover
    menuItem.addEventListener('mouseenter', function () {
        loadPreviewImage(menuItem, imageName);
    }, { passive: true });
    
    // Keyboard focus
    menuItem.addEventListener('focus', function () {
        loadPreviewImage(menuItem, imageName);
    }, { passive: true, capture: true });
    
    // Touch
    menuItem.addEventListener('touchstart', function () {
        loadPreviewImage(menuItem, imageName);
    }, { passive: true });
});

// Pre-load first 2 images (critical path)
const firstTwoImages = Array.from(menuItemsWithImages).slice(0, 2);
firstTwoImages.forEach(function (menuItem) {
    const imageName = menuItem.getAttribute('data-image');
    if (imageName) {
        const previewImg = menuItem.querySelector('.preview-image');
        previewImg.src = `images/Menu/${imageName}`;
    }
});
```

---

## 📐 Dimensions & Spacing Reference

### Bubble Dimensions

```
┌─────────────────────────────────┐
│         280 pixels width        │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │   Preview Image 280×180     ││ ← Image area
│  │   object-fit: cover         ││
│  │   border-radius: 14px       ││
│  │                             ││
│  └─────────────────────────────┘│
│    ▼ Arrow (10px height)        │
└─────────────────────────────────┘
    180 pixels height (image only)

Total Bubble Height: 180px (image) + 10px (arrow) = 190px

White Background:
- Same 280×180px as image
- 14px border-radius (soft corners)
- Shadow: 0 12px 32px rgba(0,0,0,0.18)
- All content centered
```

### Positioning

```
Menu Item Layout:

Page
  ↓
Menu Container
  ↓
Menu Item (position: relative)
  ├─ Content (h4, ul, span.price)
  │  └─ Position: relative (normal flow)
  │
  └─ Preview Bubble (position: absolute)
     └─ Top: -220px (above content)
     └─ Left: 50% (centered)
     └─ Transform: translateX(-50%) (compensate for centering)
     
Calculation:
- Menu item height: ~150px (typical)
- Preview height: 190px
- Desired gap above item: 30px
- Total offset: 190 + 30 = 220px above top

Result: Bubble hovers 30px above menu item
```

### Spacing Measurements

| Measurement | Value | Notes |
|-------------|-------|-------|
| Preview width | 280px | Fixed, no scaling |
| Preview height | 180px | Image only (arrow: +10px) |
| Border radius | 14px | Soft, premium corners |
| Arrow height | 10px | Points downward |
| Arrow base | 20px | Width of triangle base |
| Gap above item | 30px | Space between arrow and item |
| Total bubble offset | -220px | From item top to bubble top |
| Animation distance | 20px | translateY slide distance |
| Shadow blur | 12px | Moderate depth blur |
| Shadow spread | 32px | Large shadow coverage |
| Shadow opacity | 0.18 | Subtle, premium feel |

---

## 🎯 State Machine Diagram

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    INITIAL STATE                       │
│              (Page Load, Not Interacting)               │
│                                                         │
│         opacity: 0                                     │
│         visibility: hidden                             │
│         pointer-events: none                           │
│         transform: translateY(+20px)                   │
│                                                         │
│              ↓                                          │
│         (User hovers / focuses / taps)                │
│              ↓                                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   ANIMATING STATE                       │
│                  (0ms - 400ms)                         │
│                                                         │
│    CSS transition in progress:                         │
│    ├─ opacity: 0 → 1 (fade-in)                        │
│    ├─ transform: translateY(+20px) → 0 (slide-up)     │
│    └─ ease-out easing (natural deceleration)           │
│                                                         │
│    JavaScript action:                                  │
│    ├─ Load image from data-image                      │
│    ├─ Validate exists                                  │
│    └─ Fade in image                                    │
│                                                         │
│              ↓                                          │
│         (Animation complete)                          │
│              ↓                                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   VISIBLE STATE                         │
│              (User Interacting)                         │
│                                                         │
│         opacity: 1                                     │
│         visibility: visible                            │
│         pointer-events: auto                           │
│         transform: translateY(0)                       │
│                                                         │
│         Image loaded and visible                       │
│         Menu item hover effect active                  │
│                                                         │
│              ↓                                          │
│         (User hovers away / loses focus)              │
│              ↓                                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   ANIMATING STATE (Reverse)            │
│                  (400ms - 800ms)                       │
│                                                         │
│    CSS transition in progress:                         │
│    ├─ opacity: 1 → 0 (fade-out)                       │
│    ├─ transform: translateY(0) → +20px (slide-down)   │
│    └─ ease-out easing                                  │
│                                                         │
│    JavaScript action: None                             │
│    (Image remains loaded for next interaction)         │
│                                                         │
│              ↓                                          │
│         (Animation complete)                          │
│              ↓                                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    HIDDEN STATE                         │
│                (Back to Initial State)                  │
│                                                         │
│    Ready for next interaction (cycle repeats)          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Implementation Checklist

### HTML Checklist
- [x] Add `data-image="FileName.jpg"` to `.menu-item`
- [x] Add `.menu-item-preview` div inside `.menu-item`
- [x] Add `.preview-image` img with empty src
- [x] Add `.preview-arrow` span (no content)
- [x] Add meaningful alt text to image
- [x] Verify all 9 items have data-image

### CSS Checklist
- [x] Add `.menu-item { position: relative; }`
- [x] Add `.menu-item-preview` styles (hidden by default)
- [x] Add `.menu-item-preview::before` (white bubble)
- [x] Add `.preview-image` styles (280×180px)
- [x] Add `.preview-arrow` styles (CSS triangle)
- [x] Add `:hover` trigger (show on hover)
- [x] Add `:focus-within` trigger (show on focus)
- [x] Add `prefers-reduced-motion` media query

### JavaScript Checklist
- [x] Find all `.menu-item[data-image]`
- [x] Create `loadPreviewImage()` function
- [x] Attach mouseenter listener (desktop)
- [x] Attach focus listener (keyboard)
- [x] Attach touchstart listener (mobile)
- [x] Validate image exists before loading
- [x] Track loaded images (avoid re-loading)
- [x] Pre-load first 2 images
- [x] Handle missing images gracefully

---

## 🚀 Deployment Ready!

All components visualized, documented, and tested. Ready for production deployment.

