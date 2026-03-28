# Beirut Bites — Restaurant Landing Page

A premium, fully responsive landing page for a fictional Lebanese restaurant, built with plain HTML, CSS, and vanilla JavaScript. No frameworks or build tools required — open `index.html` in any browser.

## Project Structure

```
beirut-bites/
├── index.html    # Markup and page structure
├── styles.css    # All styling and animations
├── script.js     # All interactivity and JS logic
└── README.md
```

## Sections

| Section | Description |
|---|---|
| Announcement Banner | Dismissible top bar with animated gradient — highlights lunch hours, Jazz Nights, and the tasting menu |
| Navigation | Fixed navbar with scroll-triggered background, active section highlighting, and a mobile hamburger menu |
| Hero | Full-screen gradient with canvas particle animation, large headline, and two CTAs |
| Menu | Tabbed layout across three categories — Appetizers, Mains, Desserts — with animated card entrances and a Chef's Pick badge |
| About | Two-column layout with story text, animated stat counters (40+ dishes, 500+ guests, 3 awards), and a "15+ Years" badge |
| Gallery | CSS grid of five color-coded tiles with hover caption overlays |
| Reservation | Contact info alongside a validated booking form with a confirmation state |
| Testimonials | Three customer review cards with star ratings |
| Footer | Brand info, navigation links, opening hours, address, and social links |

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--burgundy` | `#722F37` | Primary brand color |
| `--burgundy-dk` | `#4e1f25` | Dark backgrounds, footer |
| `--gold` | `#d4a843` | Accents, highlights, prices |
| `--gold-lt` | `#e8c46a` | Hover states, gradients |
| `--cream` | `#faf6ef` | Page background |
| `--cream-dk` | `#f0e8d8` | Card backgrounds, gallery section |

Fonts: **Playfair Display** (headings) · **Lato** (body) — loaded from Google Fonts.

## Features

- Smooth scroll-reveal animations via `IntersectionObserver`
- Animated number counters in the About section (cubic ease-out)
- Canvas particle system in the hero (55 floating geometric symbols)
- Tab switching with re-triggered CSS animations on menu cards
- Reservation form with inline validation and success state
- Sticky "back to top" button that appears after 500px of scroll
- Fully responsive — tested at 1200px, 960px, and 680px breakpoints

## Usage

No installation needed. Just open the file:

```bash
# macOS / Linux
open index.html

# Windows
start index.html
```

Or serve locally with any static server:

```bash
npx serve .
# or
python -m http.server 8080
```
