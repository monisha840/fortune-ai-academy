# Landing Page CMS: step-by-step guide

How to manage the price, batch, reviews and other facts shown on the course
landing pages, without touching any code.

**Who this is for:** whoever looks after the website content. No technical
knowledge needed beyond logging in to the admin panel.

**The 7 pages you can manage**

| Page | Address |
|---|---|
| UI/UX Design | `/courses/ui-ux-design` |
| Digital Marketing | `/courses/digital-marketing` |
| Fashion CADD | `/courses/fashion-cadd` |
| Textile & Garment Design | `/courses/textile-garment-design` |
| Packaging Design | `/courses/packaging-design` |
| Graphic Designing | `/courses/graphic-designing` |
| Video Editing | `/courses/video-editing` |

---

## The one rule to remember

> **Anything you leave blank is simply not shown on the page.**

There are no placeholders on the live site. If you do not enter a price, no
price box appears. If a course has no approved reviews, there is no reviews
section. So you can fill things in gradually, and the page always looks
finished.

---

## Part 1: One-time setup (do this once)

You only need to do this the first time. If someone has already done it, skip to
Part 2.

1. Open your **Supabase** project and go to **SQL Editor**.
2. Open the file `course_landing_migration.sql` (it is in the project folder)
   and copy everything in it.
3. Paste it into the SQL Editor and click **Run**.
4. You should see "Success". It is safe to run more than once, and it does not
   change anything that already exists.

**How to tell it worked:** open **Admin → Landing Pages**. If the amber notice
*"The landing-page tables are not in the database yet"* is gone, you are done.

---

## Part 2: Find your way around

1. Log in at `/admin/login`.
2. In the left menu click **Landing Pages**.
3. You will see one card per course page. Each card shows:
   - **View** opens the live page in a new tab.
   - **Edit** opens the editor for that page.
   - A row of coloured chips: a **green** chip means that item is set, an
     **amber** chip is still missing and needed before launch, and a **grey**
     chip is optional.
   - A line such as *"4 of 9 set up. Needs: price, faq answers reviewed"* that
     tells you what is still missing.

Click **Edit** on a page. The editor has 8 tabs across the top:

| Tab | What it controls |
|---|---|
| Offer & batch | Price, discounts, EMI, mode, city, batch date, seats, timings |
| Quick facts | Duration, salary range, career roles |
| Social proof | Rating, learners trained, placement % |
| Syllabus & tools | Course modules and the tools list |
| FAQ | The questions and answers |
| Market facts | The headline figures and the sources line |
| Reviews | Learner reviews |
| Student work | Shows the student projects (managed in Gallery) |

> **Saving:** most tabs share one **Save changes** button in the bar at the
> bottom of the screen. Two tabs save themselves: **Quick facts** has its own
> *Save quick facts* button, and **Reviews** saves each review as you add or edit
> it. The bottom bar always tells you whether you have unsaved changes.

---

## Part 3: Get a page ready to launch

Work through these in order. A page is launch-ready when the four **amber**
items are done.

### Step 1: Check the duration (Quick facts)

1. Open the **Quick facts** tab.
2. Check **Duration**, **Salary range** and **Career roles**.
3. Fix anything wrong, then click **Save quick facts**.

> These come from your **Courses** list, so changing them here also updates the
> course cards and the footer.

**If you see a warning that the course cannot be found:** the course title in
the Courses list is different from the one this page expects. Go to **Courses**
and make the title match exactly (see the table at the bottom of this guide).

### Step 2: Add the price (Offer & batch)

1. Open the **Offer & batch** tab.
2. Type the **Price (₹)** as a plain number with no commas, for example
   `24999`.
3. *(Optional)* Type the **MRP (₹)**, the original higher price, for example
   `34999`. The page will show it struck through with a **"Save 29%"** badge.
   The MRP must be higher than the price, otherwise it is ignored.
4. *(Optional)* Add a **Price note** such as `Inclusive of GST`, and an **EMI
   note** such as `EMI from ₹3,500 / month`.
5. A line under the fields shows exactly how the price will appear. Check it.

### Step 3: Add the batch details (Offer & batch)

All of these are optional. Fill in what you know.

| Field | Example | What visitors see |
|---|---|---|
| Mode | Online Live | A small tag |
| City / branch | Tiruppur | A small tag |
| Batch name | November batch | A small tag |
| Batch start date | pick a date | Shown as `3 Nov 2026` |
| Seats left | 6 | "Only 6 seats left for the November batch" |
| Class timings | Mon to Fri, 10 AM to 1 PM | A small tag |

Good to know:

- If you set both a **Batch name** and a **Batch start date**, the name is the
  one shown.
- **The date hides itself automatically** once it has passed, so you never show
  an old date.
- **Seats left = 0** shows *"This batch is full. Join the waitlist for the next
  one."* Leave it blank to hide the seats line.

### Step 4: Review the FAQ answers

The answers that came with the site are *placeholders* written from the page
itself. They need your approval.

1. Open the **FAQ** tab.
2. Read each answer. Change it to the exact wording you want to give.
3. Use the **arrows** to reorder, the **bin** to remove, and **Add question** to
   add more.
4. Every row needs both a question and an answer.

> Until you edit this tab, the page keeps using the shipped answers. As soon as
> you edit it, your version is used. **Reset to shipped default** puts the
> original back.

### Step 5: Add the market sources (Market facts)

The market chart quotes figures that need a named source.

1. Open the **Market facts** tab.
2. Under **Headline figures**, check each figure and what it means. Change or
   remove any you cannot support (up to 4 are shown).
3. Under **Sources line**, write where each figure comes from, for example
   *"Sources: UI/UX market size and 32% CAGR: MindInventory, UI/UX Statistics
   2026; salary data: Product Leadership."*
4. This appears in small print under the chart.

> Four pages (Fashion CADD, Textile, Packaging, Video Editing) currently ship
> **without** named sources. Add them before launch.

### Step 6: Save

Click **Save changes** in the bottom bar. You will see a green *"Saved"* message.
Then click **View live page** (top right of the editor) and check it.

> The **Save changes** button is greyed out when there is nothing to save or when
> a field has an error. Red text under a field tells you what to fix.

---

## Part 4: Optional extras

### Show a rating and learner numbers (Social proof)

Open **Social proof** and fill in any of:

| Field | Example | Shown as |
|---|---|---|
| Average rating (0 to 5) | 4.8 | ★ 4.8/5 |
| Number of reviews behind the rating | 120 | from 120 reviews |
| Learners trained | 1000 | 1,000+ learners trained |
| Placement assistance % | 90 | 90% placement assistance |

A rating needs the number of reviews too. **Only enter figures you can prove.**

### Add a learner review (Reviews)

1. Open the **Reviews** tab and click **Add review**.
2. Fill in the **learner name** and the **quote** (10 to 600 characters, in the
   learner's own words). Role, company, rating (1 to 5) and photo are optional.
3. Click **Save review**.
4. **The review is hidden by default.** Switch **Show on the landing page** on
   (or use the *Hidden / Visible* switch in the list) when you are ready to
   publish it.

Use real, verifiable feedback only.

### Add or change syllabus modules (Syllabus & tools)

1. Open **Syllabus & tools**.
2. Under **Modules**, click **Add module**, type a title, and (optionally) list
   the topics, one per line.
3. A module that has topics becomes expandable on the page.
4. Under **Tools**, type one tool per line (or separate with commas).

> Two pages (Textile & Garment, Video Editing) were built without a module list.
> They show the tools only until you add modules here.

### Show student projects (Student work)

Student work is managed in the **Gallery**, not on this screen.

1. Go to **Gallery** and click to add an item.
2. Set **Type** to **Portfolio**.
3. Set the **Course** to this course (the exact title, e.g. *UI/UX Design*).
4. Upload the image or video and save.

It appears on the landing page automatically, up to 9 items in display order.
The **Student work** tab in the editor shows you what is currently linked.

---

## Part 5: Everyday tasks (quick recipes)

| I want to… | Do this |
|---|---|
| Change the price for a new batch | Landing Pages → Edit → **Offer & batch** → change Price (and MRP) → **Save changes** |
| Announce a new batch | **Offer & batch** → change *Batch name* or *Batch start date* → set *Seats left* → **Save changes** |
| Show the batch is full | **Offer & batch** → *Seats left* = `0` → **Save changes** |
| Stop showing seats | **Offer & batch** → clear *Seats left* → **Save changes** |
| Remove a discount | **Offer & batch** → clear *MRP* → **Save changes** |
| Publish a review | **Reviews** → switch the review to **Visible** |
| Hide a review without deleting it | **Reviews** → switch it to **Hidden** |
| Change the course duration | **Quick facts** → change Duration → **Save quick facts** |
| Put the original text back | In **FAQ**, **Syllabus & tools** or **Market facts**, click **Reset to shipped default**, then **Save changes** |

---

## When something does not look right

| What you see | Why, and what to do |
|---|---|
| Amber notice: *"landing-page tables are not in the database yet"* | The one-time setup (Part 1) has not been run |
| The price does not appear | The field is empty, or you have not clicked **Save changes**. Check for red error text |
| The MRP or "Save %" does not appear | MRP must be **higher** than the price |
| Duration, salary or roles do not appear | The course title in **Courses** does not match this page. Fix it (table below) |
| A review is not on the page | It is set to **Hidden**. Switch it to **Visible** |
| The batch date has disappeared | The date has passed. Set a new one, or use *Batch name* instead |
| Student work is not showing | The Gallery item's *Type* is not **Portfolio**, or its *Course* does not match exactly |
| I saved, but the live page looks the same | Refresh the page. Visitors see a change the next time they open or refresh the page |
| *Save changes* is greyed out | Nothing has changed, or a field has an error (read the red text) |
| Saving shows an error | Make sure you are logged in as an admin. If it persists, tell the developer the exact message |

---

## Launch checklist

Tick these off for each page before sharing it with students.

- [ ] **Price** is set
- [ ] **Duration** shows correctly (Quick facts)
- [ ] **Market sources** are named
- [ ] **FAQ answers** have been read and approved
- [ ] Batch / seats are up to date *(if you use them)*
- [ ] Reviews are real, and approved ones are marked Visible *(if you use them)*
- [ ] **View live page** looks right on a phone and on a computer

---

## Reference: course titles must match exactly

These pages find their duration, student work and enquiry tagging by the course
**title**. The title in **Courses** must be exactly:

| Landing page | Title in Courses |
|---|---|
| ui-ux-design | UI/UX Design |
| digital-marketing | Digital Marketing |
| fashion-cadd | Fashion CADD |
| textile-garment-design | Textile & Garment Design |
| packaging-design | Packaging Design |
| graphic-designing | Graphic Designing |
| video-editing | Video Editing |

## Reference: where each fact comes from

| Fact | Where to edit it |
|---|---|
| Duration, salary, career roles | **Courses** (or the *Quick facts* tab, same data) |
| Price, MRP, EMI, mode, city, batch, seats, timings | **Landing Pages → Offer & batch** |
| Rating, learners trained, placement % | **Landing Pages → Social proof** |
| Modules, topics, tools | **Landing Pages → Syllabus & tools** |
| FAQ | **Landing Pages → FAQ** |
| Headline figures and sources | **Landing Pages → Market facts** |
| Learner reviews | **Landing Pages → Reviews** |
| Student projects | **Gallery** (type *Portfolio*) |
| Placed students, hiring partners | **Testimonials** / **Hiring Partners** (shared by all pages) |

## What you cannot change here

The headline wording, the order of sections, the animated visuals and the page
design are part of the website itself. Ask the developer if those need to
change. The page title and description used in search results and link previews
are also fixed at build time.
