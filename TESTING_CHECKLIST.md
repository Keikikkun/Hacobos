# ✅ Testing & Verification Checklist

**Hacobos Bread | Three Performance Enhancements**

Complete this checklist to verify all features work correctly.

---

## QUICK START - Test These First

### Task 1: Scroll Reveals ✨

**What to do:**

1. Open `index.html` in browser
2. Scroll down slowly
3. Watch sections fade in + slide up

**Expected result:**

- [ ] About section fades in
- [ ] Menu items fade in as you scroll
- [ ] Location section fades in
- [ ] Smooth, not jarring
- [ ] No layout shift

**Test code (paste in DevTools console):**

```javascript
// Check how many elements have reveal class
console.log(
  "Reveal elements:",
  document.querySelectorAll(".reveal-on-scroll").length,
);
console.log(
  "Visible elements:",
  document.querySelectorAll(".reveal-on-scroll.is-visible").length,
);

// Should show: "Reveal elements: 11", then increase as you scroll
```

---

### Task 2: Smooth Scroll Navigation 🎯

**What to do:**

1. Click navbar links (#home, #about, #menu, #location)
2. Watch page scroll smoothly (not instant jump)
3. Notice focus moves to section heading

**Expected result:**

- [ ] Smooth scroll animation (not instant)
- [ ] Takes ~500ms to scroll
- [ ] Focus moves to heading after scroll
- [ ] Keyboard users can tab from heading
- [ ] Back button works

**Test code (DevTools console):**

```javascript
// Check scroll behavior
console.log(
  "Scroll behavior:",
  window.getComputedStyle(document.documentElement).scrollBehavior,
);
// Should output: "smooth"

// Manually test focus movement
document.querySelector('a[href="#menu"]').click();
setTimeout(() => {
  console.log("Current focus:", document.activeElement.textContent);
}, 600);
// Should show focus moved to "Our Menu" heading
```

---

### Task 3: Menu Preview Fallback 📷

**What to do:**

1. Hover over menu items with images
2. Images should load and show
3. Delete one image from `/images/Menu/` folder
4. Hover that menu item
5. Should show placeholder (not break)

**Expected result:**

- [ ] Normal items show product images
- [ ] Missing items show emoji placeholder (📷)
- [ ] Placeholder is same size/shape as image
- [ ] No console errors
- [ ] No layout shift

**Test code (DevTools console):**

```javascript
// Check how many images loaded
const menuItems = document.querySelectorAll(".menu-item[data-image]");
const withImages = Array.from(menuItems).filter(
  (item) => item.querySelector(".preview-image").src,
);
console.log(`Images loaded: ${withImages.length}/${menuItems.length}`);

// Check for errors
const errorImages = document.querySelectorAll(".preview-image.has-error");
console.log(`Placeholder shown for: ${errorImages.length} items`);
```

---

## DESKTOP TESTING

### Chrome / Edge / Brave

- [ ] Open DevTools (F12)
- [ ] Device: Desktop
- [ ] Throttle: No throttle (6x CPU)
- [ ] Test scroll reveals: smooth animation
- [ ] Test smooth scroll: click link, watch scroll
- [ ] Test menu preview: hover items, images load
- [ ] Check Performance tab: no red warnings
- [ ] Check Console: zero errors

### Firefox

- [ ] Open DevTools (F12)
- [ ] Test scroll reveals: working
- [ ] Test smooth scroll: working
- [ ] Test menu preview: working
- [ ] Performance: green lights

### Safari (macOS)

- [ ] Open Web Inspector (Cmd+Option+I)
- [ ] Test all three features
- [ ] Verify smooth (Safari 15.4+)

---

## MOBILE TESTING

### iOS (iPhone / iPad)

- [ ] Open in Safari
- [ ] Scroll page: reveals working
- [ ] Tap navbar links: smooth scroll working
- [ ] Tap menu items: preview appears on tap
- [ ] Focus management: works with external keyboard

### Android (Chrome)

- [ ] Open in Chrome
- [ ] Scroll page: reveals working
- [ ] Tap navbar links: smooth scroll working
- [ ] Tap menu items: preview appears on tap
- [ ] All three features working

---

## ACCESSIBILITY TESTING

### Keyboard Navigation

- [ ] Tab through page: focus visible
- [ ] Navbar links visible with focus
- [ ] Press Enter on link: scrolls to section
- [ ] Focus moves to section heading after scroll
- [ ] Continue tabbing: normal order
- [ ] No keyboard trap
- [ ] Shift+Tab: reverse navigation works

**Test (DevTools):**

```javascript
// Simulate keyboard navigation
document.querySelector('a[href="#menu"]').focus();
// Press Enter to click
// Watch focus move and scroll complete
```

### Screen Reader (NVDA / JAWS / VoiceOver)

- [ ] Enable screen reader
- [ ] Navigate to navbar
- [ ] Screen reader announces: "Navigation menu"
- [ ] Tab to links: reads "Home link", "About link", etc.
- [ ] Click link: page scrolls
- [ ] Screen reader announces: "Our Menu heading level 2"
- [ ] Can continue reading from target section

### Motion Preferences

**Windows / macOS:**

1. Enable "Reduce Motion" in OS settings
   - Windows 11: Settings > Ease of Access > Display > Show animations
   - macOS: System Preferences > Accessibility > Display > Reduce motion

2. Refresh browser page

3. Verify:
   - [ ] Scroll reveals DON'T animate (instant visibility)
   - [ ] Smooth scroll DON'T animate (instant jump)
   - [ ] Menu preview still works (no animation change)
   - [ ] All functionality preserved

**Test (DevTools):**

```javascript
// Check if browser recognizes motion preference
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
console.log("Prefers reduced motion:", prefersReduced);
```

---

## PERFORMANCE TESTING

### Lighthouse (Chrome DevTools)

1. Open DevTools (F12)
2. Lighthouse tab → Generate report (Desktop)
3. Check scores:
   - [ ] Performance: 90+
   - [ ] Accessibility: 95+
   - [ ] Best Practices: 95+
4. Check metrics:
   - [ ] Cumulative Layout Shift (CLS): 0
   - [ ] First Contentful Paint: <2s
   - [ ] Largest Contentful Paint: <2.5s

### Core Web Vitals

1. DevTools → Experience tab
2. Check:
   - [ ] CLS (Layout Shift): 0 (GOOD)
   - [ ] FID (Interaction): <100ms (GOOD)
   - [ ] LCP (Loading): <2.5s (GOOD)

### Paint Flashing (DevTools)

1. DevTools → Rendering tab
2. Check "Paint flashing"
3. Scroll page
4. Verify:
   - [ ] Minimal green flashes (repaints)
   - [ ] No full-page repaints
   - [ ] Only animated areas flash

### JavaScript Performance

1. DevTools → Performance tab
2. Record 5 seconds of scrolling
3. Stop recording
4. Analyze:
   - [ ] No red bars (warnings)
   - [ ] Frame rate: 60 FPS (smooth)
   - [ ] JS execution: <100ms per frame

---

## VISUAL TESTING

### No Layout Shift

**Test scroll reveals:**

- [ ] Scroll down slowly
- [ ] No elements shifting position
- [ ] No "jumpy" content
- [ ] Page layout stable

**Test smooth scroll:**

- [ ] Click menu link
- [ ] Page scrolls smoothly
- [ ] No page height change
- [ ] No sudden jumps

**Test menu preview:**

- [ ] Hover menu item
- [ ] Bubble appears above item
- [ ] Other items don't move
- [ ] CLS = 0

### Animation Quality

**Scroll reveals:**

- [ ] Fade-in: smooth, not abrupt
- [ ] Slide-up: 40px motion, smooth
- [ ] Duration: ~500ms
- [ ] Easing: smooth curve (not linear)

**Smooth scroll:**

- [ ] Duration: ~500-800ms
- [ ] Not too fast, not too slow
- [ ] Natural acceleration/deceleration

**Menu preview:**

- [ ] Fade-in: ~300ms
- [ ] Smooth, no flicker
- [ ] Consistent across items

---

## ERROR TESTING

### Missing Images

1. Delete `images/Menu/Hawaiian.jpg`
2. Refresh page
3. Hover Hawaiian item
4. Verify:
   - [ ] Placeholder shows (📷)
   - [ ] Console shows ONE warning (not repeated)
   - [ ] Other items still work
   - [ ] No layout break

### Network Issues

1. DevTools → Network tab
2. Throttle: "Slow 3G"
3. Refresh and scroll
4. Verify:
   - [ ] Animations still work
   - [ ] Images eventually load
   - [ ] No console errors
   - [ ] Graceful fallback if timeout

### JavaScript Disabled

1. DevTools → Settings → Disable JavaScript
2. Refresh page
3. Verify:
   - [ ] Page loads normally
   - [ ] Reveal animations DON'T show (OK)
   - [ ] Links still work (instant jump to section)
   - [ ] Menu items display without preview
   - [ ] No console errors about missing JS

---

## CODE VALIDATION

### HTML Validation

1. Copy entire `index.html` to https://validator.w3.org/
2. Verify:
   - [ ] No HTML errors
   - [ ] All `reveal-on-scroll` classes present
   - [ ] All `data-image` attributes valid
   - [ ] No syntax errors

### CSS Validation

1. Copy `styles.css` to https://jigsaw.w3.org/css-validator/
2. Verify:
   - [ ] No CSS errors
   - [ ] `@keyframes revealFadeSlideUp` valid
   - [ ] `.is-visible` rule valid
   - [ ] `.preview-image.has-error` valid

### JavaScript Lint

1. Copy `script.js` to https://jshint.com/
2. Verify:
   - [ ] No high-severity errors
   - [ ] No undefined variables
   - [ ] Consistent formatting

---

## CROSS-BROWSER TESTING

### Desktop Browsers

| Browser      | Scroll Reveals | Smooth Scroll | Menu Preview | Notes        |
| ------------ | -------------- | ------------- | ------------ | ------------ |
| Chrome 120+  | ✅             | ✅            | ✅           | Full support |
| Firefox 121+ | ✅             | ✅            | ✅           | Full support |
| Safari 17.2+ | ✅             | ✅            | ✅           | Full support |
| Edge 121+    | ✅             | ✅            | ✅           | Full support |
| IE 11        | ⚠️ No          | ⚠️ Instant    | ✅           | Graceful     |

### Mobile Browsers

| Device  | Browser    | Scroll Reveals | Smooth Scroll | Menu Preview |
| ------- | ---------- | -------------- | ------------- | ------------ |
| iPhone  | Safari 17+ | ✅             | ✅            | ✅ Tap       |
| iPhone  | Chrome     | ✅             | ✅            | ✅ Tap       |
| iPad    | Safari 17+ | ✅             | ✅            | ✅ Tap       |
| Android | Chrome     | ✅             | ✅            | ✅ Tap       |
| Android | Firefox    | ✅             | ✅            | ✅ Tap       |

---

## EDGE CASES

### What if user scrolls very fast?

- [ ] Animations don't queue up
- [ ] All reveals visible instantly at end
- [ ] No duplicate animations
- [ ] No console errors

**Test:**

```javascript
// Programmatically scroll fast
window.scrollBy(0, 5000);
// Verify elements are marked visible
```

### What if user clicks link while page scrolling?

- [ ] Smooth scroll cancels
- [ ] New smooth scroll starts
- [ ] Focus moves to new target
- [ ] No conflicts

### What if image fails while loading?

- [ ] Error caught immediately
- [ ] Placeholder shown
- [ ] No retry attempts
- [ ] No console spam

### What if user has both JS disabled AND reduced motion?

- [ ] Page fully functional (no JS)
- [ ] Reveals don't show (but content visible)
- [ ] Links work (instant scroll)
- [ ] Menu items accessible without preview

---

## FINAL VERIFICATION

### Pre-Launch Checklist

- [ ] All desktop browsers tested ✅
- [ ] All mobile browsers tested ✅
- [ ] Keyboard navigation verified ✅
- [ ] Screen reader tested ✅
- [ ] Motion preferences respected ✅
- [ ] No console errors ✅
- [ ] CLS = 0 ✅
- [ ] Performance excellent ✅
- [ ] All images load correctly ✅
- [ ] Fallback placeholders work ✅
- [ ] HTML valid ✅
- [ ] CSS valid ✅
- [ ] JS lint clean ✅

### Sign-Off

**✅ Ready for Production** if:

- All checkboxes above checked
- No unexpected behavior observed
- Performance metrics green
- Accessibility verified
- All edge cases handled

---

## Questions During Testing?

Check **PERFORMANCE_ENHANCEMENTS.md** for:

- Detailed implementation explanation
- How each feature works
- Troubleshooting guide
- Code examples

Check **script.js** for:

- Comments explaining each feature (Sections 6, 7, 8)
- Event listeners and logic

Check **styles.css** for:

- Animation keyframes
- CSS classes and their purpose
- Media queries for accessibility
