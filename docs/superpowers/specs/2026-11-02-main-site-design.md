# stradascholar.com main site: design

Date: 2026-11-02. Status: draft for approval.

## Intent

Lucas Rodrigues (YouTube: [@stradascholar](https://www.youtube.com/@stradascholar)) builds and maintains BMWs in his garage near Ottawa and documents them on YouTube. A viewer who wants more than the video comes to the site to see the **whole build of a car**: what was done, every part and tool that went in, a link to buy each one, and a jump to the moment in the video where it appears. Buy links become affiliate links once Lucas joins the programs, so the site is also how the channel earns beyond YouTube.

Reference site: [thicwhips.com](https://thicwhips.com/) (structure and feel; see "Reference notes").

## Repo layout

The repo (`github.com/tsmvp/stradascholar`) will hold several projects. This document covers only the **main website**. A later project, the **ingest service**, will watch the channel and update car content automatically; the content format below is the contract between them.

```
content/            car data and photos (shared by the site and the ingest service)
site/               the website
docs/superpowers/   designs and plans
```

## Goals

- One page per car that grows over time. Not a chronological blog.
- Launch with the three current cars, backfilled from the four existing videos.
- Each car page lists every part and tool mentioned, with a buy link and a timestamped video link.
- A content format simple enough for a person or a program to edit: change a file, push, redeploy, done.
- Photos are files in the repo; adding, replacing or deleting one updates the site on the next deploy.
- Deployed on the existing Proxmox VM behind Traefik, at `stradascholar.com` and `www.stradascholar.com`.

## Non-goals (for now)

- The ingest service (separate design later).
- Prices. They go stale.
- Comments, accounts, newsletter, search engine, analytics, contact form.
- An admin UI or a draft/review step. Changes go live when pushed and deployed.

## Anti-goals

- Looking like a generic template or a parts spam site. It should feel like Lucas's garage.
- Invented content. Every part, claim and number comes from Lucas's videos and descriptions.
- Dead or wrong buy links. A part with no confident link shows "No link" instead of a guess.

## Cars at launch

| Slug | Car | Source videos |
|---|---|---|
| `m3` | 2013 BMW M3 (E92) Frozen Blue, competition package, one of the last 150; GTS-inspired | `2yfzwYiONtw` |
| `1m` | 2009 BMW 135i (E82) with full OEM 1M exterior, LCI, N54 single turbo (~550 whp) | `YE4NMkFtxJY` |
| `x5m` | 2011 BMW X5 35d (E70), 432,000 km, $4,200, converted to X5M look ("world's first diesel X5M") | `GZ7XEOMd3QQ`, `Hcu7Na9ciYo` |

The i3 seen in X5 Episode 2 is not on the site.

Transcripts, descriptions and chapters for these videos were pulled with yt-dlp during brainstorming and are the source for the backfill.

## Look and feel (decided with mockups)

- **Dark by default**, near-black background, the BMW M tricolour stripe (`#81C4FF`, `#16588E`, `#E7222E`) at the top of every page, red for buy buttons and calls to action, light M blue for labels and video links.
- **Light/dark switch** in the header on every page. The visitor's choice is remembered in the browser.
- Condensed italic uppercase headings (Barlow Condensed in the mockup), plain sans body text.
- Works on phones: car pages and the parts table must read well at phone width.

## Menu

A top menu on every page, like thicwhips: **Home, Builds, Guides, Tutorials, Coding, Detailing, Fitment, Gear & Tools, Videos**, plus the light/dark switch. It must work on phones and foldables: a compact menu button that opens the full list on narrow screens, the full row on wide screens, and nothing cut off or overflowing at in-between widths (folded and unfolded foldables, small tablets). The current page is highlighted.

## Pages

1. **Home.** Hero photo with headline, the three car cards (photo, chassis/engine tag, name, one-line hook), latest videos, short "about Lucas" strip with a link to the channel.
2. **Car page** (one per car), as in the approved mockup:
   - Hero photo, tag line (year, chassis, engine), headline.
   - Jump menu: Overview, Parts & tools, Wheels & suspension, Gallery, Videos.
   - Stat strip (e.g. power, part count, tool count, video count, all-in cost); stats are per-car values from the content, plus counts the site computes.
   - Overview text and a spec block.
   - **Parts & tools table**: name, brand, category, "▶ m:ss" link that opens YouTube at that second, and a red **Shop** button, or a plain "No link" when there is none. Category filter chips. Tools are in the same table under a Tools category.
   - Wheels & suspension block (wheels, tires, suspension, studs, etc.).
   - Gallery: every photo in the car's folder except the hero.
   - Videos: every video featuring the car, newest first, with thumbnail, title and date.
3. **Builds.** Cards for the three car pages. (No separate Vehicles page: with one car per chassis it would repeat Builds.)
4. **Tutorials.** The how-to segments already in the videos, each with its car, a title, a link that opens the video at the start of the segment, and the tools and parts used. At launch, from the X5 videos: brake light switch diagnosis, oil change, front brakes, rear brakes, rain trays, side skirt and trim removal, front bumper and fender removal, rear bumper brackets with push clips, vinyl wrap technique (glassing, avoiding fingers and creases).
5. **Fitment.** Each car's wheels, tires and suspension side by side, taken from the cars' wheels & suspension blocks.
6. **Gear & Tools.** All cars' parts and tools in one table with car, category and part/tool filters; tools first.
7. **Videos.** All videos, newest first, each tagged with its car.
8. **Guides, Coding, Detailing.** A short "coming soon" page with a link to the channel. They fill in as content arrives.
9. **About & disclosure** (linked from the footer, not the top menu). Short bio of Lucas, channel link, Nick P (@NicholasPetrachuk) credited as collaborator, and the affiliate disclosure (including the Amazon Associates wording once that program is active). The bio is built only from what Lucas says about himself in his videos: into cars since childhood thanks to his dad, former automotive business owner, mechanically inclined and prefers fixing things himself; channel is about car projects, keeping cars on the road, maintenance and how-tos. Nick is a friend since skateboarding days about 16 years ago, fabricates and welds on the builds, and runs his own channel with a single-turbo E30. Header uses a text wordmark until Lucas supplies a logo.

## Content format

All content lives in `content/`. One folder per car:

```
content/cars/<slug>/car.yaml
content/cars/<slug>/photos/hero.jpg
content/cars/<slug>/photos/*.jpg|png|webp
```

`car.yaml` holds everything about a car. Fields (the builder picks exact names and validates them with a schema so a bad file fails the build with a clear error):

- **Identity:** slug, name, year, chassis code, engine, headline, one-line hook for cards, display order on home.
- **Overview:** a few paragraphs (Markdown allowed).
- **Spec:** ordered list of label/value pairs.
- **Stats:** ordered list of label/value pairs shown in the strip.
- **Wheels & suspension:** ordered list of label/value pairs.
- **Videos:** none here; videos are tagged with the car in `content/videos.yaml` (below). Thumbnails come from YouTube by ID.
- **Parts:** list where each entry has:
  - name, brand (optional), category, kind (`part` or `tool`)
  - optional note (e.g. "fabricated, steel arches welded on")
  - optional video reference: video ID and time in seconds
  - optional links: list of `{store, url}` (e.g. `{store: amazon, url: ...}`); empty means "No link"
- **Tutorials:** list where each entry has title, short summary, video ID, start second, and the names of the parts and tools used (matching entries in Parts).

The ingest service will add videos and parts to these files and commit; people can also edit them by hand.

**Videos list (builder's call, made in review).** All channel videos live in one site-level file, `content/videos.yaml`: YouTube ID, title, publish date, optional car slug. The Videos page and Home show every entry; a car page shows the ones tagged with its slug. Car files reference videos by ID only, so a video not about a car (e.g. the i3 in a future video) still appears on the Videos page.

### Affiliate links

Links are stored as **plain store URLs**. Affiliate IDs live in one site config file (per store: e.g. Amazon tag, FCP Euro referral, Rakuten for ECS/Turner) and are applied when the site is built. Lucas has not signed up yet; until IDs are filled in, links go out plain. Filling in an ID later converts every link for that store with no content changes. Buy links open in a new tab with `rel="sponsored noopener"`.

## Photos

- Whatever is in a car's `photos/` folder appears on its page. `hero.*` is the header image; all others make up the gallery, in filename order.
- The build resizes and converts photos (responsive sizes, modern format), so full-size camera or phone shots can be dropped in as-is.
- **Launch photos are pulled from the videos** (Lucas will supply real photos later and they simply replace these files). Download each video at its highest available resolution and extract candidate frames (scene changes plus regular intervals), then pick the best: sharp, well-lit, car-centric (exterior three-quarter, side, rear, engine bay, interior, key parts). Target per car: one hero and 6 to 12 gallery shots, without near-duplicates. The site-wide home hero is one of these.

## Backfill (launch content)

Write the three `car.yaml` files from the four transcripts and descriptions:

- Every part, tool and product named, with brand and category, and the second in the video where it is mentioned or shown (from the transcript timing).
- Buy links: find the product page at a well-known store (Amazon, FCP Euro, ECS Tuning, Turner Motorsport, Bimmerworld, or the maker's site). If the exact product cannot be confirmed, leave the link empty. Store region: **US** (amazon.com, FCP Euro, ECS Tuning, Turner Motorsport, and US makers' sites).
- Overview, spec, stats and wheels/suspension taken only from what Lucas says or writes (e.g. 1M all-in cost ~$25,000 CAD self-built; X5 bought for $4,200 with 432,000 km).

## Tech

- **Site:** Astro (current version), static output. Content collections with a schema for `car.yaml`; Astro's image pipeline for photo resizing. Plain CSS, no UI framework. Tiny inline script for the theme switch and table filters.
- **Serving:** static files in a small web server container (e.g. nginx or Caddy), multi-stage Docker build (build with Node, serve static).
- **Deploy:** same pattern as RG-Capital, wrapped in one script (`deploy.sh`) that rsyncs the repo to `deploy@192.168.98.118:stradascholar/` and runs `docker compose -f compose.yaml -f compose.proxmox.yaml up -d --build`. Every content change is committed and pushed to GitHub and then deployed with this script; the ingest service will call the same script. No CI or webhook for now. Traefik labels: network `traefik-network`, entrypoint `websecure`, certresolver `ionos`, rule for `stradascholar.com` and `www.stradascholar.com`. No `.env` is needed for the site itself.
- **DNS:** `stradascholar.com` uses IONOS name servers (good for the `ionos` DNS challenge). Its A record currently points to an IONOS parking IP (74.208.236.153); it and `www` must point to the same public IP as `rgcapital.ca` (router). The builder documents this; the user changes it at IONOS.
- `.superpowers/` is git-ignored.
- README kept short: run locally, content format summary, deploy commands.

## Left to the builder

- Exact YAML field names and schema, file names, component structure.
- Exact fonts and spacing, within the approved direction.
- Which frames make the cut, within the photo guidance above.
- Category list (start from: Engine, Drivetrain, Exhaust, Suspension, Brakes, Wheels & tires, Exterior, Interior, Electrical, Maintenance, Tools).
- How `www` relates to the apex (redirect one to the other).

## Reference notes (thicwhips.com, 2026-11-02)

Car is the entry point. Home: photo hero, featured build cards, vehicle tiles, next-step panels. Build page: jump menu, stat strip, overview with spec block, fitment cards, searchable parts table (part, part number, category, price, shop, install video), recommended mods, maintenance, gallery. Shop buttons use Amazon tags, Rakuten deep links for ECS/Turner, referral parameters for others, and a "No affiliate available" badge; footer has a privacy and affiliate disclosure link.
