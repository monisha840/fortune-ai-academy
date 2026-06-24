# dataLayer event snippets — review & place

These are ready-to-use dataLayer pushes. Place each one in the matching action handler in your site and verify before relying on it. This file does not wire them up automatically.

> Each snippet must run at the moment the event actually happens — inside **your** form submit handler (after validation), button click handler, etc. This guide does **not** edit any of your existing code; you place each snippet yourself and confirm it fires (e.g. with GTM Preview or by logging `window.dataLayer`).

---

## `generate_lead` — _key event_

**Why:** A user submitted a lead generation form (e.g., 'SECURE MY SPOT').

**Fires when:** the “generate_lead” conversion completes.

**TODO:** place this in the code that runs when the conversion completes (e.g. the success / thank-you step), then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'generate_lead',
  'form_name': 'Secure My Spot',
  'course_interest': 'Web Design Training',
  'lead_source': 'website form',
});
```

---

## `contact` — _key event_

**Why:** A user initiated direct contact (e.g., clicked email, phone, or demo request).

**Fires when:** the “contact” conversion completes.

**TODO:** place this in the code that runs when the conversion completes (e.g. the success / thank-you step), then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'contact',
  'contact_type': 'phone',
});
```

---

## `page_view`

**Why:** A user viewed a page.

**Fires when:** a page loads.

**TODO:** place this in your page-load / route-change code (or rely on GTM’s All Pages trigger — often no code needed), then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'page_view',
  'page_location': '',
  'page_path': '',
  'page_title': '',
});
```

---

## `scroll`

**Why:** A user scrolled to 90% of the page height.

**Fires when:** the “scroll” interaction happens (e.g. a click or scroll).

**TODO:** place this in the relevant click / scroll handler, then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'scroll',
  'percent_scrolled': 0,
});
```

---

## `click`

**Why:** A user clicked on an element.

**Fires when:** the “click” interaction happens (e.g. a click or scroll).

**TODO:** place this in the relevant click / scroll handler, then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'click',
  'link_url': '',
  'link_text': '',
  'link_id': '',
});
```

---

## `form_submit`

**Why:** A user submitted any form on the website.

**Fires when:** the “form_submit” form is submitted (after validation passes).

**TODO:** place this in your form’s submit handler, AFTER validation succeeds (never before validation), then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'form_submit',
  'form_id': '',
  'form_name': 'Secure My Spot',
  'form_destination': '',
});
```

---

## `form_start`

**Why:** A user started interacting with a form.

**Fires when:** the “form_start” form is submitted (after validation passes).

**TODO:** place this in your form’s submit handler, AFTER validation succeeds (never before validation), then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'form_start',
  'form_id': '',
  'form_name': 'Secure My Spot',
});
```

---

## `view_contact_page`

**Why:** A user viewed the contact us page.

**Fires when:** the “view_contact_page” interaction happens (e.g. a click or scroll).

**TODO:** place this in the relevant click / scroll handler, then **verify** it fires before relying on it.

```js
dataLayer.push({
  'event': 'view_contact_page',
  'page_location': '',
});
```
