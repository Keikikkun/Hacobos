# Script.js Quick Reference

## Feature Demonstrations & Test Instructions

---

## 1️⃣ NAVBAR SCROLL EFFECT

### How It Works

As you scroll past the hero section, the navbar shadow deepens from `--shadow-sm` to `--shadow-md`.

### Visual Change

```
BEFORE SCROLL (0px):
┌─────────────────────────────┐
│ Navbar (subtle shadow)      │
└─────────────────────────────┘
   Box-shadow: 0 2px 8px rgba(0,0,0,0.06)

AFTER SCROLL (50px+):
┌─────────────────────────────┐
│ Navbar (deeper shadow)      │  ← Visibly elevated
└─────────────────────────────┘
   Box-shadow: 0 4px 16px rgba(0,0,0,0.08)
```

### How to Test

1. Open website in desktop browser
2. Start at top of page
3. Scroll down slowly and watch navbar
4. See shadow deepen when you pass 50px scroll mark

### Keyboard Test

- Scroll test works with mouse, touchpad, keyboard (arrow keys)

### Accessibility

- Purely visual, no impact on assistive technology

---

## 2️⃣ MOBILE MENU TOGGLE

### How It Works

On mobile (<768px), a hamburger button appears in navbar. Click to open/close menu.

### Visual Change (Mobile)

```
DESKTOP (>768px):
┌──────────────────────────────────────┐
│ [Logo] Hacobos Bread   Home About    │
│                         Menu Location│
└──────────────────────────────────────┘
  Menu always visible

MOBILE (<768px) - CLOSED:
┌───────────────────┐
│ [Logo] Hacobos ☰  │  ← Hamburger button
└───────────────────┘

MOBILE (<768px) - OPEN:
┌───────────────────┐
│ [Logo] Hacobos ☰  │
├───────────────────┤
│ Home              │
│ About             │  ← Menu items appear
│ Menu              │
│ Location          │
└───────────────────┘
```

### How to Test

**Test 1: Mobile View**

1. Resize browser to <768px width
2. Hamburger (☰) button appears in navbar
3. Click hamburger → menu opens
4. Click hamburger again → menu closes
5. Click a menu item → menu closes automatically

**Test 2: Keyboard (Mobile)**

1. Resize to <768px
2. Press Tab → focus on hamburger button (you see focus ring)
3. Press Enter → menu opens (aria-expanded="true")
4. Press Tab → cycles through menu links
5. Press Escape → menu closes, focus returns to hamburger

**Test 3: Focus Trapping (Accessibility)**

1. Resize to <768px
2. Open menu (click hamburger or press Enter)
3. Press Tab on last menu link → focus jumps to first link (trapped!)
4. Press Shift+Tab on first menu link → focus jumps to last link (trapped!)
5. This prevents focus leaving menu while it's open

### Keyboard Shortcuts

| Key       | Action         | Notes                            |
| --------- | -------------- | -------------------------------- |
| Click     | Toggle menu    | Works on touch devices too       |
| Enter     | Toggle menu    | When hamburger has focus         |
| Escape    | Close menu     | Focus returns to hamburger       |
| Tab       | Cycle links    | Only cycles within open menu     |
| Shift+Tab | Cycle backward | Jumps to last link when at first |

### Accessibility Features

- `aria-label="Toggle navigation menu"` → screen readers know button purpose
- `aria-expanded="true/false"` → screen readers know menu state
- Focus trap → keyboard users can't accidentally tab out of menu
- Auto-close → menu closes when link clicked (better UX)

---

## 3️⃣ SMOOTH SCROLL & FOCUS MANAGEMENT

### How It Works

When you click an anchor link (like `#about`, `#menu`), the page smoothly scrolls to that section. After scroll ends, focus moves to the section heading.

### Visual Change

```
BEFORE CLICK:
User sees: [#menu] link in navbar
Page: Scrolled to top

AFTER CLICK (instant):
User sees: Page animating scroll to menu section

AFTER SCROLL COMPLETE (~600ms):
User sees: Menu section now in view
Screen readers: Announce "Our Menu" heading (because focus moved)
```

### How to Test

**Test 1: Smooth Scroll (Desktop)**

1. Click "Home" link in navbar → page jumps to hero (instant or smooth depending on browser)
2. Click "About" link → watch page scroll smoothly to About section
3. Click "Menu" link → watch page scroll smoothly to Menu section
4. Click "Location" link → watch page scroll smoothly to Location section

**Test 2: Focus Management**

1. Click "About" link
2. Wait for scroll to finish
3. Press Tab → focus outline appears on "About Us" heading
4. This means screen readers will announce the section (accessibility win!)

**Test 3: Old Browser Fallback (if using IE11 or very old Safari)**

1. Page might scroll instantly instead of smoothly (browser doesn't support native smooth scroll)
2. Script detects this and animates the scroll in JavaScript
3. Click still works the same way to user

### Keyboard Test

- Click with keyboard: Tab to navbar link, press Enter
- Same behavior as mouse click

### Accessibility Features

- Focus moved to target section (screen readers announce heading)
- Scroll doesn't get stuck (uses requestAnimationFrame)
- Works in old browsers (fallback animation provided)

---

## 4️⃣ CAROUSEL KEYBOARD NAVIGATION

### How It Works

The "About Us" carousel (4 images) responds to keyboard input:

- **Arrow Left**: Previous image
- **Arrow Right**: Next image
- **Home**: First image
- **End**: Last image

Also:

- **Hover**: Pauses auto-play (gives you time to read alt text)
- **Leave hover**: Auto-play resumes

### Visual Change

```
IMAGE 1/4 (Area1.jpg - ACTIVE)
┌──────────────────┐
│ Area 1           │
│   [◄ image ►]    │
│                  │
└──────────────────┘
Auto-playing, every 5 seconds rotates

PRESS → (Arrow Right):
┌──────────────────┐
│ Area 2           │
│   [◄ image ►]    │  ← Changed to next image
│                  │
└──────────────────┘

PRESS Home:
┌──────────────────┐
│ Area 1           │
│   [◄ image ►]    │  ← Jumped back to first
│                  │
└──────────────────┘
```

### How to Test

**Test 1: Keyboard Navigation**

1. Scroll to "About Us" section (carousel with 4 images)
2. Click anywhere on carousel (or press Tab until carousel has focus)
3. Press **Right Arrow** → next image appears
4. Press **Right Arrow** again → continues to next image
5. Press **Left Arrow** → goes back to previous image
6. Press **Home** → jumps to first image
7. Press **End** → jumps to last image

**Test 2: Carousel Auto-Play**

1. Look at carousel (images auto-play every 5 seconds)
2. Move mouse over carousel → auto-play **pauses**
3. Move mouse away → auto-play **resumes**
4. This prevents images changing while user is reading

**Test 3: Focus & Screen Readers**

1. When image changes, focus moves to current image
2. Screen reader users hear alt text announced
3. Try with screen reader (NVDA, JAWS, VoiceOver): Image alt text announced on slide change

**Test 4: Bootstrap Controls Still Work**

1. Click **Previous** (◄) button → works as before
2. Click **Next** (►) button → works as before
3. Keyboard shortcuts are _in addition to_ mouse/touch controls

### Keyboard Shortcuts

| Key             | Action              |
| --------------- | ------------------- |
| → (Right Arrow) | Next image          |
| ← (Left Arrow)  | Previous image      |
| Home            | Jump to first image |
| End             | Jump to last image  |

### Accessibility Features

- Keyboard navigation (no mouse required)
- Focus moved to current image (screen readers announce)
- Pause on hover (respects user attention)
- Bootstrap controls still accessible
- Works with Bootstrap's native carousel (no conflicts)

---

## 5️⃣ BACK-TO-TOP BUTTON

### How It Works

A minimal circular button appears in the bottom-right corner when you scroll down 300px. Click to smoothly scroll back to top.

### Visual Change

```
AT TOP (scroll 0px):
                      No button visible

AFTER SCROLLING 300px+:
                      ┌─────┐
                      │  ↑  │  ← Back-to-top button
                      │     │     (circular, premium styling)
                      └─────┘

ON HOVER:
                      ┌─────┐
                      │  ↑  │  ← Darker background
                      │     │     Deeper shadow
                      └─────┘

CLICK:
Page smoothly scrolls to top (600ms animation, unless user prefers reduced motion)
Button fades out when scroll returns to top
```

### How to Test

**Test 1: Button Visibility**

1. Start at top of page
2. No back-to-top button visible
3. Scroll down 300px or more
4. Button appears in bottom-right corner (fades in smoothly)
5. Scroll back to top
6. Button disappears (fades out)

**Test 2: Smooth Scroll to Top**

1. Scroll down to bottom of page
2. Click back-to-top button (↑)
3. Page smoothly animates back to top (~600ms)
4. Button fades out when you reach top

**Test 3: Keyboard Navigation**

1. Scroll down 300px+ (button appears)
2. Press Tab repeatedly until back-to-top button has focus
3. Button shows focus outline (visible ring)
4. Press Enter → smooth scroll to top
5. Accessibility maintained!

**Test 4: Motion Preference Respect**

1. Open System Settings → Accessibility → "Reduce motion" / "Prefers reduced motion"
2. Scroll down and click back-to-top button
3. Page scrolls **instantly** to top (no animation)
4. Respects user's motion sensitivity

**Test 5: Mobile**

1. Resize to mobile (<768px)
2. Button is slightly smaller (40×40px instead of 44×44px)
3. Positioned: `bottom: 1.5rem, right: 1.5rem` (safe from notches)
4. Still accessible and easy to tap

### Button States

| State                  | Visual       | Behavior                                 |
| ---------------------- | ------------ | ---------------------------------------- |
| **Below 300px scroll** | Hidden       | `opacity: 0, visibility: hidden`         |
| **Above 300px scroll** | Visible      | `opacity: 1, visibility: visible`        |
| **Hover**              | Darker       | Background changes to `--primary-medium` |
| **Focus**              | Gold outline | Keyboard users see focus ring (4px gold) |
| **Click**              | Animates     | Smooth scroll animation to top           |

### Accessibility Features

- `aria-label="Back to top"` (screen readers know purpose)
- Visible focus indicator (keyboard users see outline)
- Respects `prefers-reduced-motion` (instant scroll, no animation)
- Only appears after meaningful scroll (reduces clutter)
- Touch-friendly size (44×44px minimum, 40×40px on mobile)

---

## 🧪 Complete Test Scenario

### Test All Features in One Session (5 minutes)

**Setup:** Desktop browser, page is loaded

1. **Navbar Scroll Effect** (30 seconds)
   - Observe navbar shadow at top
   - Scroll down 50px
   - Notice shadow deepens
   - ✅ Pass

2. **Mobile Menu** (1 minute)
   - Resize to 768px width (mobile)
   - See hamburger button appear
   - Click → menu opens
   - Click → menu closes
   - Resize back to desktop
   - Hamburger disappears
   - ✅ Pass

3. **Smooth Scroll** (1 minute)
   - Click "Menu" link
   - Watch page scroll smoothly
   - Wait for scroll to finish
   - Press Tab → focus should be on "Our Menu" heading
   - ✅ Pass

4. **Carousel Keyboard** (1 minute)
   - Scroll to "About Us" section
   - Click on carousel or Tab to focus it
   - Press → (right arrow) → next image appears
   - Press ← (left arrow) → previous image appears
   - Press Home → first image appears
   - Mouse over carousel → auto-play pauses
   - Mouse away → auto-play resumes
   - ✅ Pass

5. **Back-to-Top Button** (1 minute)
   - Scroll down 300px
   - Button appears in bottom-right
   - Click button
   - Page smoothly scrolls to top
   - Button fades out
   - ✅ Pass

**Total time:** ~5 minutes  
**Result:** All features working! ✨

---

## ❌ Common Issues & Fixes

### Problem: Hamburger button doesn't appear on mobile

**Diagnosis:** Resize window to <768px. If button still doesn't appear:

- Check browser console (F12) for JavaScript errors
- Verify `script.js` is loaded (F12 → Network tab → look for script.js)
- Verify CSS breakpoint is `@media (max-width: 768px)`

**Fix:**

```html
<!-- In index.html, verify this line exists: -->
<script src="script.js" defer></script>
```

### Problem: Back-to-top button always hidden

**Diagnosis:** You haven't scrolled 300px yet

- Scroll down further (larger page on mobile might require 300px+ to appear)
- Check browser console for errors

**Fix:** This is normal behavior. Button only appears after meaningful scrolling.

### Problem: Carousel keyboard shortcuts don't work

**Diagnosis:** Bootstrap 5 JS not loaded

- Open DevTools → Console tab
- Type: `typeof bootstrap`
- Should return `"object"`
- If `"undefined"`, Bootstrap JS didn't load

**Fix:**

```html
<!-- Verify this line exists before script.js: -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Problem: Smooth scroll not working

**Diagnosis:** Could be old browser OR script not loaded

- Test: Open DevTools → Console tab
- Try: `document.documentElement.style.scrollBehavior = 'smooth'`
- If you get error, browser doesn't support native smooth scroll (that's ok, fallback works)

**Fix:** Script provides fallback animation. This is expected on older browsers.

### Problem: Focus indicators not visible

**Diagnosis:** Depends on browser

- Chrome: `outline: 2px solid var(--primary-medium)`
- Firefox: System default outline
- Safari: Blue default outline

**Fix:** This is browser behavior. Focus indicators are always there (try Tab key).

---

## 📊 Performance Checklist

- [ ] Script loads with `defer` attribute (not `async`)
- [ ] Page renders _before_ script runs (visual performance)
- [ ] No layout thrashing (DOM reads/writes batched)
- [ ] Passive listeners used on scroll events
- [ ] No polling or intervals (event-driven only)
- [ ] Minified script <1.5 KB
- [ ] CSS additions <2 KB
- [ ] Total overhead <3.5 KB (negligible)

---

## ♿ Accessibility Checklist

- [ ] Keyboard navigation works (Tab, Escape, Arrow keys)
- [ ] Focus visible on all interactive elements
- [ ] ARIA attributes present (`aria-label`, `aria-expanded`)
- [ ] Focus trap works in mobile menu
- [ ] Screen reader announces carousel slides
- [ ] `prefers-reduced-motion` respected (no animations)
- [ ] Color contrast maintained (existing colors used)
- [ ] Touch targets 44×44px minimum

---

## 🎬 Demo Script (for stakeholders/clients)

**"Here's what makes this website feel premium:"**

1. **Watch the navbar.** See how the shadow deepens when you scroll? That's visual feedback — tells users they're engaged with content.

2. **Resize to mobile.** Notice the elegant hamburger menu? Everything collapses gracefully. Click it — smooth interaction, professional feel.

3. **Click a menu link.** The page scrolls smoothly to that section — not jarring, not instant. Comfortable.

4. **Go to About Us.** See the image carousel? Try the arrow keys on your keyboard — no need for mouse. Accessible AND intuitive.

5. **Scroll down.** After scrolling a bit, a subtle "back to top" button appears. It's there when you need it, invisible when you don't — that's "quiet luxury."

**The result:** A website that feels premium, works perfectly on any device, and is accessible to everyone — even without JavaScript enabled.

---

**All features tested? Great! You're ready to deploy.** ✨
