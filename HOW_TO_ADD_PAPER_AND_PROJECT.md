# How To Add A Paper Or Project Page

This repository now supports two layers for research outputs:

1. A card on the main research page
2. An optional standalone project page at `/research/<slug>/`

For most new papers, the recommended workflow is:

1. Create a new file in `_projects/`
2. Add images or videos under `images/projects/<slug>/`
3. Add one matching entry to `_data/research-input.yml`
4. Add the same entry to `_data/research-output.yml`
5. Commit and push

This keeps the workflow simple and does not require running the citation builder locally.

## 1. Create A New Project Page

Copy the example page:

```bash
cp _projects/example-project.md _projects/my-new-paper.md
```

Rename `my-new-paper` to your own slug. This slug becomes the page URL:

```text
/research/my-new-paper/
```

Then edit the new file and replace the front matter fields at the top.

### Important Front Matter Fields

```yml
title: "My New Paper"
subtitle: "One sentence summary"
description: "Short description for search engines and sharing cards."
project_badge: "CVPR 2026"
teaser: images/projects/my-new-paper/teaser.jpg
venue: "CVPR"
year: 2026
authors:
  - name: "Alice Zhang"
    affiliation: "ARTE Lab"
  - name: "Bob Li"
    affiliation: "Collaborator University"
links:
  - label: "Paper"
    url: "https://arxiv.org/abs/xxxx.xxxxx"
    icon: "far fa-file-pdf"
  - label: "Code"
    url: "https://github.com/your-org/your-repo"
    icon: "fas fa-code"
abstract: "Short abstract or summary."
```

## 2. Add Images

Create a folder for the project assets:

```text
images/projects/my-new-paper/
```

Put images there, for example:

```text
images/projects/my-new-paper/teaser.jpg
images/projects/my-new-paper/pipeline.png
images/projects/my-new-paper/result-1.png
```

Use them in the project page like this:

```yml
teaser: images/projects/my-new-paper/teaser.jpg
```

Inside the Markdown body:

```html
<figure>
  <img src="/images/projects/my-new-paper/pipeline.png" alt="Method pipeline">
  <figcaption>Overview of the method.</figcaption>
</figure>
```

You can also use plain Markdown:

```md
![Main result](/images/projects/my-new-paper/result-1.png)
```

## 3. Add Videos

There are two supported ways.

### Option A: Embedded Video

Use this when you have a YouTube embed link:

```yml
video_embed: "https://www.youtube.com/embed/VIDEO_ID"
```

### Option B: Video Carousel

Use this when you want multiple videos:

```yml
video_carousel:
  - title: "Teaser"
    embed: "https://www.youtube.com/embed/VIDEO_ID_1"
    caption: "Short teaser video."
  - title: "Qualitative Results"
    embed: "https://www.youtube.com/embed/VIDEO_ID_2"
    caption: "More results."
```

You can also host a local mp4:

```yml
video_carousel:
  - title: "Demo"
    mp4: "images/projects/my-new-paper/demo.mp4"
    caption: "Local demo video."
```

Recommendation:

- Prefer YouTube or another hosted platform for large videos
- Use local mp4 only for short clips

## 4. Add BibTeX

The page supports a copy button automatically when `citation` is present:

```yml
citation: |
  @inproceedings{zhang2026paper,
    title={My New Paper},
    author={Alice Zhang and Bob Li},
    booktitle={CVPR},
    year={2026}
  }
```

## 5. Add Related Works

These show up in the dropdown section:

```yml
related_works:
  - title: "Previous Work A"
    url: "https://example.com/a"
    meta: "NeurIPS 2024"
    description: "Why it is related."
  - title: "Companion Dataset"
    url: "https://example.com/dataset"
    meta: "Dataset"
    description: "Shared benchmark or data release."
```

## 6. Add The Research Card

After creating `_projects/my-new-paper.md`, add one entry to `_data/research-input.yml`.

Example:

```yml
- id: my-new-paper-2026
  title: "My New Paper"
  authors:
    - "Alice Zhang"
    - "Bob Li"
  publisher: "CVPR"
  date: 2026-06-01
  link: https://arxiv.org/abs/xxxx.xxxxx
  page: /research/my-new-paper/
  image: images/projects/my-new-paper/teaser.jpg
  tags:
    - vision
    - diffusion
    - editing
  extra-links:
    - type: source
      link: https://github.com/your-org/your-repo
      text: Code
```

Then add the same entry to `_data/research-output.yml`.

Right now the site reads the research cards directly from `_data/research-output.yml`, so keeping both files aligned is the simplest approach.

## 7. What Each Field Does

- `id`: unique identifier for this paper
- `title`: card title
- `authors`: author list shown on the card
- `publisher`: conference, journal, or project type
- `date`: controls sorting on the research page
- `link`: external paper link such as arXiv or DOI
- `page`: internal project page URL
- `image`: thumbnail shown on the card
- `tags`: keywords shown on the card
- `extra-links`: additional buttons such as code, data, demo, or website

If `page` is present, the research card opens the internal project page first.

## 8. Recommended Folder Layout

For a new paper named `my-new-paper`, use:

```text
_projects/my-new-paper.md
images/projects/my-new-paper/teaser.jpg
images/projects/my-new-paper/pipeline.png
images/projects/my-new-paper/result-1.png
images/projects/my-new-paper/demo.mp4
```

## 9. Minimal Working Example

Files to create or edit:

```text
_projects/my-new-paper.md
_data/research-input.yml
_data/research-output.yml
images/projects/my-new-paper/teaser.jpg
```

Minimum needed for the card and page to work well:

- one project page file
- one teaser image
- one research entry with `page: /research/my-new-paper/`

## 10. Quick Checklist

- Created `_projects/<slug>.md`
- Added `teaser` image
- Added project assets under `images/projects/<slug>/`
- Added `page: /research/<slug>/` in the research data
- Updated both `_data/research-input.yml` and `_data/research-output.yml`
- Committed and pushed to GitHub

## 11. Current Example

You can use these existing files as references:

- [`_projects/example-project.md`](_projects/example-project.md)
- [`_data/research-input.yml`](_data/research-input.yml)
- [`_data/research-output.yml`](_data/research-output.yml)
- [`_layouts/project.html`](_layouts/project.html)
