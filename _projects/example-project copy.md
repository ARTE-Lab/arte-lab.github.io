---
title: "Example Project Page: A Reusable Homepage For Research Outputs"
subtitle: "An example paper homepage for demos, videos, BibTeX, and related work sections"
description: "Example paper page showing how ARTE Lab can host individual project homepages inside the research section."
project_badge: "Example Paper"
teaser: images/network.jpg
venue: "ARTE Lab Demo"
year: 2026
authors:
  - name: "First Author"
    affiliation: "ARTE Lab"
  - name: "Second Author"
    affiliation: "Collaborator University"
links:
  - label: "Paper"
    url: "https://arxiv.org/"
    icon: "far fa-file-pdf"
  - label: "Code"
    url: "https://github.com/"
    icon: "fas fa-code"
  - label: "Demo"
    url: "https://example.com/"
    icon: "fas fa-play"
abstract: "Use this page as a starting point for each new paper or project. The hero area handles title, authors, venue, teaser image, and action buttons. The Markdown body below is where you can write method summaries, add figures, embed videos, or describe datasets."
video_embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
video_carousel:
  - title: "Method Overview"
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    caption: "Short teaser or overview video."
  - title: "Qualitative Results"
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    caption: "Swap this with a second video, or use an mp4 path instead."
related_works:
  - title: "Older Related Project"
    url: "https://example.com/older-project"
    meta: "Conference 2024"
    description: "A concise sentence explaining why this prior work matters."
  - title: "Companion Dataset"
    url: "https://example.com/dataset"
    meta: "Dataset Release"
    description: "Useful when you want to link benchmarks, datasets, or companion papers."
citation: |
  @article{arte2026example,
    title={Example Project Page},
    author={First Author and Second Author},
    journal={Replace With Venue},
    year={2026}
  }
---

## How To Reuse This Page

1. Copy this file into `_projects/` and rename it, for example `_projects/my-new-paper.md`.
2. Update the front matter fields at the top: title, teaser, authors, links, abstract, videos, and citation.
3. Put project assets into a stable place such as `images/projects/my-new-paper/`.
4. Add `page: /research/my-new-paper/` to the corresponding entry in [`_data/research-input.yml`](../_data/research-input.yml) so the research card opens this page.

## Suggested Sections

- Overview or motivation
- Method
- Main results
- Qualitative examples
- Video, demos, or carousel clips
- Data and code availability

## Media Embeds

You can keep using normal Markdown and HTML here. For example:

```html
<figure>
  <img src="/images/projects/my-new-paper/result.png" alt="Result figure">
  <figcaption>Short explanation of the figure.</figcaption>
</figure>
```

```html
<iframe
  width="100%"
  height="480"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Project video"
  frameborder="0"
  allowfullscreen>
</iframe>
```
