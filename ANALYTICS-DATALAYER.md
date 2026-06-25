# dataLayer event snippets — review & place

These are ready-to-use dataLayer pushes. Place each one in the matching action handler in your site and verify before relying on it. This file does not wire them up automatically.

> Each snippet must run at the moment the event actually happens — inside **your** form submit handler (after validation), button click handler, etc. This guide does **not** edit any of your existing code; you place each snippet yourself and confirm it fires (e.g. with GTM Preview or by logging `window.dataLayer`).
>
> Any **SUGGESTED file** below is a best-effort guess from reading your repo to help you find the right place faster — **always verify it before placing**; the file was not modified.

---

## `generate_lead` — _key event_

**Why:** A user successfully submits a 'SECURE MY SPOT' lead generation form.

**Fires when:** the “generate_lead” conversion completes.

**TODO:** place this in the code that runs when the conversion completes (e.g. the success / thank-you step), then **verify** it fires before relying on it.

**SUGGESTED file:** `src/pages/Contact.tsx` _(medium confidence — verify before placing)_ — Place the push where the form is submitted, inside the matching submit/click handler (after it succeeds). _Alternatives:_ `src/components/ui/form.tsx`, `src/components/TransformSection.tsx`, `src/components/admin/AdminLeads.tsx`.

```js
dataLayer.push({
  'event': 'generate_lead',
  'form_purpose': 'SECURE MY SPOT',
  'lead_course': 'Web Design Course',
});
```
