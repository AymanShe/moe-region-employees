# UX Engagement Roadmap (No Audio)

Roadmap for evolving the MOE employee map from utility to an engaging, game-inspired experience—without adding sound effects.

---

## Vision
- Deliver a living, exploratory interface that keeps the map present while revealing employee data in a cinematic, game-like way.
- Encourage multi-region discovery with smooth transitions, unobtrusive guidance, and persistent progress cues.

---

## Experience Pillars
1. **Layered Interaction:** Keep the map visible; surface region details through side panels, overlays, or carousels instead of full-screen modals.
2. **Micro-animations:** Use subtle movement, pulsing glows, parallax, and easing curves to make interactions feel responsive and tactile.
3. **Living Atmosphere:** Introduce dynamic backgrounds (time-of-day gradients, ambient particles, glow effects) that react to user actions.
4. **Exploration Feedback:** Celebrate progress (e.g., viewing new regions) via achievement toasts, progress tracking, and contextual facts.
5. **Accessibility First:** All UX engagement enhancements must remain keyboard- and screen-reader-friendly, with reduced motion options where possible.

---

## Milestone Plan

### Milestone 1 – Interaction Flow (1–2 sprints)
- Replace modal-first flow with a persistent detail panel or card stack that slides in while the map remains visible.
- Add region-to-region navigation controls (arrows, swipe gestures) so users can browse without closing the panel.
- Introduce short region highlight animation: focused path scales slightly, adds glow, dims non-selected regions.
- Ensure accessibility hooks (`aria-live`, focus trapping, `prefers-reduced-motion`) honor the new layout.

### Milestone 2 – UX Atmosphere & Motion (1 sprint)
- Add animated background layers (e.g., soft radial gradient behind selected region, low-opacity particles).
- Apply staged entry animation for employee cards (staggered fade/slide-in with easing).
- Enhance CTA buttons (CV download) with hover/active transitions (glow border, icon trails) while retaining RTL/contrast requirements.
- Implement “stateful HUD” elements: subtle map compass, floating counts, or status badges kept in one corner.

### Milestone 3 – Exploration & Progression (1 sprint)
- Track visited regions in local storage; show progress badge or progress circle overlay.
- Unlock achievement-style toasts when users visit all regions; add contextual facts about each region in the detail panel.
- Provide day/night theming toggle or time-based gradient shift for the background.
- Offer optional mini-map overview or breadcrumb so power users can jump across regions quickly.

### Milestone 4 – Polish & Performance (ongoing)
- Audit animations for CPU/GPU cost; leverage `will-change`, requestAnimationFrame, and CSS transforms.
- Provide reduced-motion preferences and skip animations when accessibility settings demand it.
- Add unit/UI tests for the new navigation flow, ensuring keyboard and screen-reader behavior remain intact.
- Review visual design with stakeholders, iterate on color, texture, and motion timing for brand alignment.

---

## Implementation Notes
- **Tech Stack:** Favor CSS animations and GPU-friendly transforms; use lightweight JS animation libraries only if necessary.
- **Assets:** Prepare SVG glow layers, particle sprites, day/night gradient palettes, achievement iconography.
- **Data Layer:** Extend region JSON with optional lore/fact fields to enrich the contextual storytelling component.
- **Testing:** Expand QA checklist to cover animation timing, reduced-motion behavior, local storage progression, and responsive layout under the new side-panel design.

---

## Next Steps
1. Prototype the persistent side panel and region highlight animation.
2. Align with stakeholders on visual direction (color palettes, particle density, lore content).
3. Schedule accessibility review once the new navigation flow is coded.
4. Update `plan.md` or status docs once milestones start, using this roadmap as reference.
