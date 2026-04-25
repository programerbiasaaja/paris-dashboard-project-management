# PARIS Project Management Admin Dashboard Context

This repository is the admin dashboard for the PARIS Project Management application.

## Product Context

- Default UI and copy decisions should reflect a professional internal tool for an Indonesian project management and executive dashboard.

## Working Assumptions

- Favor admin-oriented information architecture: dense but readable tables, filters, status badges, auditability, and quick access to operational actions.
- Use Bahasa Indonesia by default for user-facing copy unless the surrounding code clearly uses English.
- Prefer practical, business-focused naming over generic demo wording.
- Treat authentication, roles, permissions, and audit logging as important concerns when touching auth or sensitive workflows.
- When a requirement is ambiguous, assume the feature should support admin workflows first.

## Engineering Guidance

- Preserve consistency with the existing Next.js App Router structure in `src/app`.
- Keep route organization explicit when separating auth pages and authenticated/admin pages.
- Prefer reusable dashboard components and avoid purely decorative UI that does not help admin workflows.
- If a component or code block has the same purpose and can be reused across screens, place it in `src/components` instead of duplicating it inside route files or feature pages.
- Avoid creating multiple components that are visually and functionally identical; consolidate them into a shared component in `src/components`.
- Prefer using the Barrel Pattern / Barrel Export for shared modules, components, hooks, utilities, and types when it improves import consistency and discoverability. Avoid overdoing it for files that are truly isolated or only used once.
- For any UI styling work, use the existing color palette and design tokens defined in `src/app/globals.css` as the default reference first. If the needed color is not available or the UI requirement cannot be expressed cleanly with the existing tokens, hardcoded colors such as hex, rgb, rgba, hsl, or oklch may still be used when necessary.
- When building any form, default to `react-hook-form` with `zod` validation.
- When building any form UI, use the shared form primitives from `@/components/ui/form`:
  `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, and `FormMessage`.
- When creating TypeScript interfaces, types, or enums, use the project naming prefixes: interfaces must be named `I{Name}` (for example `IArticles`), types must be named `T{Name}` (for example `TUser`), and enums must be named `E{Name}` (for example `EPaymentStatus`).
- When creating sample data, use realistic PARIS Project Management business examples such as jamaah, bookings, package departures, invoices, manifests, visa progress, and operational SLA metrics.
- When defining enums that are intended for UI selection, filtering, badges, or display labels, also create a companion `{NameWithoutE}Labels` object with Bahasa Indonesia labels and a `{NameWithoutE}Options` export using `createSelectFromType({NameWithoutE}Labels)`. Example pattern: `EArticleCategory`, `ArticleCategoryLabels`, and `ArticleCategoryOptions`.

## Response Baseline For Future Tasks

- Assume this project is "PARIS Project Management Admin Dashboard" unless the user says otherwise.
- Do not require the user to restate that this is an internal admin dashboard context on future turns.
