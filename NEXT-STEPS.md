# Next Steps - MOE Region Employees Project

**Last Updated:** 2025-10-30  
**Current Focus:** Phase 2.5 – Milestone 3 (Future Enhancements) · Status: Awaiting Scope

---

## 🎯 Immediate Priorities

### Phase 2.5 Milestone 3 – Future Enhancements
**Goal:** Align on the next UX priorities before committing implementation effort.

**Estimated Effort:** TBD

**Action Queue:**
1. Gather stakeholder input on remaining wish-list items (reset flow, additional ambience, etc.).
2. Decide whether any local-storage tracking should remain and, if so, outline reset behaviour.
3. Document agreed scope in `plan.md` and `PROJECT-STATUS.md` before resuming development.

---

## 🛠 Implementation Checklist

### 1. Layout & Structure
- [x] Draft wireframe or quick prototype reference.
- [x] Add persistent panel/container markup to `index.html`.
- [x] Ensure responsive behavior (desktop side panel, mobile overlay/card stack).

### 2. Interaction Logic
- [x] Extend `EmployeeMapApp` to open regions within the panel instead of the Bootstrap modal.
- [x] Preserve modal for employee-level details (unless a panel sub-view is preferred).
- [x] Implement region carousel controls (Prev/Next buttons + arrow keys + swipe).
- [x] Store current region index for navigation continuity.

### 3. Visual Treatments
- [x] Add CSS animations for panel entrance/exit and employee card staging.
- [x] Highlight active SVG path with glow/pulse while dimming others via CSS classes.
- [x] Respect `prefers-reduced-motion` by disabling transitions when requested.

### 4. Accessibility & QA
- [ ] Update focus order to include the new panel without trapping users.
- [ ] Ensure announcements fire via `AccessibilityManager` (`aria-live` updates).
- [ ] Keyboard test: open region, navigate between regions, exit back to map.
- [ ] Mobile test: verify swipe navigation, touch targets, viewport stability.
- [ ] Regression test to confirm legacy modal flow still works if panel fails to load.

---

## ✅ Recently Completed
- Phase 1 regression, accessibility, error-handling, and mobile test suites (all green).
- Milestone 1 accessibility + mobile QA passed; documentation updated accordingly.
- Persistent region panel with navigation controls, map highlighting, and swipe gestures implemented.

---

## 📂 Reference Materials
- `plan.md` → Phase 2.5 section for milestone overview and dependencies.
- `UX-ENGAGEMENT-ROADMAP.md` → Inspiration, experience pillars, and detailed rationale.
- `PROJECT-STATUS.md` → Historical context and remaining backlog items.

---

## 🔄 Upcoming Considerations
- Coordinate with stakeholders on chosen panel layout and animation intensity.
- Capture region “lore” copy needs so data updates are ready for Milestone 3.
- Schedule accessibility review once the new flow is functional on dev branch.
