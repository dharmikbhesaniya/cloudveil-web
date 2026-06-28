# Implementation Plan: Hero Cleanroom Air Shower (Particle Repeller)

This plan outlines the implementation of **Concept 11: The Cleanroom Air Shower (Particle Repeller)** inside the Hero section of the landing page.

Instead of a dark vignette overlay, this concept visualizes the security difference by displaying floating tracking scripts (represented as microscopic dust particles) that get repelled from the browser mockup by an expanding circular force-field wave, leaving the secure container sitting in a completely clean, sterile zone.

---

## 1. Visual Behavior & Interaction

```
          Left Column (Tagline / CTAs)      |       Right Column (Browser Mockup)
                                            |
         [Microscopic dust particles]       |             +-------------------+
         (Drifting tracker scripts)         |             |  Browser Mockup   |
                                            |             |                   |
                     o     o                |             |  Active scan runs |
                 o      o     o             |             +-------------------+
                                            |
                                            |       Circular Force-Field Wave 
                                            |       expands outwards (Purge)
                                            |
                                            |       Repels particles outside 
                                            |       a 200px boundary.
```

### 1. The Background Dust Grid
*   A lightweight 2D Canvas is placed absolutely behind the hero layout contents:
    `position: absolute; inset: 0; pointer-events: none; z-index: 1;` (sits behind text and mockups, above the main beige background).
*   On mount, it spawns a grid of 60–80 tiny, warm-gray particles (`rgba(120, 120, 120, 0.25)`) that float around the screen with a gentle random Brownian drift.

### 2. The Cleanroom Air-Shower Sweep
*   **Active Scan Run (Boot -> Scan -> Alert):** The particles drift naturally across the entire screen, including over the browser mockup box, representing exposed tracking.
*   **Obfuscation Cycle (Purge Phase):** As the browser mockup triggers its log clearing, a clean, white concentric wave ring (radius expanding from 0px to 250px) pushes outwards from the center of the mockup container.
*   **The Repulsion Physics:** Any particle hit by this expanding wave is accelerated away. The wave sweeps a circular perimeter around the browser mockup box.
*   **Isolated State (Secure Phase):** The wave dissipates, but the boundary remains active. Any particles drifting near the mockup's 200px perimeter bounce off and float away, leaving the secure cloud browser sitting in a completely clear, clean, and sterile section of the screen.

---

## 2. Proposed Changes

### [Component: web/src/sections/hero]

#### [MODIFY] [HeroSection.tsx](file:///Users/dharmikbhesaniya/Project/inhouse/privecy-project/web/src/sections/hero/HeroSection.tsx)
*   **Background Canvas:** Insert an absolute `<canvas>` element inside the hero `<section>` wrapper.
*   **Particle Engine:**
    *   Implement a `CleanroomParticle` class that tracks position, velocity, and boundary deflection logic.
    *   Link the sweep coordinates and repulsion triggers directly to the `scanPhase` state hooks.
    *   Keep the calculation lightweight (runs on client mount inside a single `requestAnimationFrame` loop).

---

## 3. Verification Plan

### Automated Tests
*   Compile checks:
    ```bash
    npm run build
    ```

### Manual Verification
*   **Performance:** Check that the background canvas maintains a smooth 60fps frame rate without impacting scroll transitions.
*   **Boundary Collisions:** Verify that particles bounce cleanly off the circular perimeter around the browser container once secured.
