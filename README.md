# hapines_f

A private, one-page farewell site. Password-protected, one intended visitor.

Built with Next.js (App Router), React, Tailwind CSS, and Framer Motion.

---

## 1. Before you do anything else

**Do not put the video, the password, or her name/email into a chat with an AI, including this one, if you want them to stay completely private.** Everything below is designed so those things live only in your own project files and your own Vercel account — set them directly, not through me.

## 2. Add your video

Put your file at:

```
public/video/message.mp4
```

(An `.mp4` with H.264 video + AAC audio plays everywhere.) If it's not 16:9, open `components/VideoSection.tsx` and change the `aspect-video` class to match your video's shape (e.g. `aspect-[9/16]` for portrait), otherwise it'll be cropped. See `public/video/README.txt` for a one-line `ffmpeg` compression command if the file is large — delete that file once your video is in place.

## 3. Set your password

Copy the env template:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```
SITE_PASSWORD=whatever-you-want
```

This stays in `.env.local`, which is git-ignored — it will never be committed or visible in the deployed site's source code (it's checked on the server, in `app/api/verify-password/route.ts`).

**Note on how strong this protection is:** this is a polite, private gate — enough to keep the link from being casually stumbled on or indexed (the page also ships with `noindex` meta tags and a `robots.txt` that disallows everything). It is not bank-grade security: anyone with the password, or anyone determined enough to read the page's client-side code after unlocking it, can see the content. For something this personal that should be more than enough, but if you want a second layer, Vercel's own [Deployment Protection](https://vercel.com/docs/deployment-protection) (password protection at the platform level, available on some plans) can sit in front of this as well — worth checking Vercel's current docs since these features do change.

## 4. (Optional) Let the contact form actually reach you

Without any setup, the "Send" button still always shows "Thank you." — she never sees an error — but the message goes nowhere. To actually receive it by email:

1. Create a free account at [resend.com](https://resend.com) and get an API key.
2. In `.env.local`, set:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=you@yourdomain.com
   ```
3. `CONTACT_FROM_EMAIL` can stay blank — it'll default to Resend's shared sending address, which works immediately with no domain setup. If you'd rather send from your own address, verify a domain in Resend and set `CONTACT_FROM_EMAIL` to something like `hapines_f <hello@yourdomain.com>`.

If you'd prefer a different provider (Postmark, SendGrid, a plain `mailto:` fallback, etc.), the only place that needs to change is `app/api/contact/route.ts`.

## 5. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 6. Deploy to Vercel

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
   - `node_modules` and `.next` are already git-ignored, so the repo stays small — as long as your video isn't huge (see the note in `public/video/README.txt` about Git LFS or external hosting for large files).
2. Go to [vercel.com](https://vercel.com), **Add New → Project**, and import that repository. Vercel auto-detects Next.js — no build settings to change.
3. Before the first deploy, add your environment variables under **Project Settings → Environment Variables**:
   - `SITE_PASSWORD` (required)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (optional, for the contact form)
4. Deploy.

### Custom domain (hapinesf.com or hapinesf.de)

1. Buy the domain from any registrar (Namecheap, Porkbun, IONOS, etc. — `.de` domains sometimes need a registrar with German/EU presence, e.g. IONOS or INWX). I couldn't get a reliable, live availability check from here — the registrar's own search is the accurate source.
2. In your Vercel project, go to **Settings → Domains** and add `hapinesf.com` (or `.de`).
3. Vercel will show you the exact DNS records to add (typically an `A` record for the root domain and a `CNAME` for `www`). Add those at your registrar's DNS settings.
4. DNS propagation is usually minutes, sometimes up to ~48 hours.

## Project structure

```
app/
  layout.tsx              → global metadata (title, noindex robots tags), no external fonts
  page.tsx                → server component, just renders the client experience
  globals.css              → Tailwind + reduced-motion handling
  icon.svg                 → minimal favicon
  api/
    verify-password/route.ts → checks the password server-side against SITE_PASSWORD
    contact/route.ts         → emails the contact form via Resend, if configured
components/
  HomeExperience.tsx        → orchestrates the 3 stages (gate → message → content)
  PasswordGate.tsx           → first screen: logo, subtitle, password input, shake on error
  BlurredBackground.tsx      → soft ambient blur behind the password card
  BeforeYouContinue.tsx      → "Before you continue..." message + Continue button
  VideoSection.tsx           → centered video, custom play button, no autoplay
  ContactSection.tsx         → message form → "Thank you." on submit
  Footer.tsx                 → signature + closing quote
public/
  video/message.mp4          → add your video here (see step 2)
  robots.txt                 → disallows all crawling
```

## Design notes

- Typography uses the system font stack (San Francisco / Segoe UI / Roboto depending on OS) rather than a loaded web font — it renders instantly, needs no external network request, and gives the same native, quiet feeling Apple's own pages have.
- All section reveals, page transitions, and hovers are opacity/scale fades only — no bounce, no springs.
- `prefers-reduced-motion` is respected globally (see `globals.css`).
- Colors are Tailwind's `neutral` scale throughout — no blue- or warm-tinted grays — plus pure white and near-black, per the brief.

## If you want to change the copy later

Every piece of text lives directly in its component file as plain JSX — there's no CMS or content file to hunt through. Search for the sentence you want to change in the relevant `components/*.tsx` file and edit it directly.
