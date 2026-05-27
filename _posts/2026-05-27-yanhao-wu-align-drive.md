---
title: Yanhao Wu introduces AlignDrive for coordinated autonomous-driving planning
author: Yanhao Wu
member-page: Yanhao-Wu
category: news
tags:
  - autonomous driving
  - end-to-end planning
  - arXiv
  - AlignDrive
---

[Yanhao Wu](https://arte-lab.github.io/members/Yanhao-Wu.html), advised by Prof. Tong Zhang, has released [*AlignDrive: Aligned Lateral-Longitudinal Planning for End-to-End Autonomous Driving*](/research/aligndrive/). The paper is on [arXiv](https://arxiv.org/abs/2601.01762), with additional demos on the [project page](https://yanhaowu.github.io/AlignDrive/) and in the [teaser video](https://yanhaowu.github.io/AlignDrive/static/videos/Teaser_video/AlignDrive.mp4).

AlignDrive takes aim at a subtle but important planning mismatch in autonomous driving: where to go and how fast to move should be decided together. The method conditions longitudinal prediction on the planned drive path, so speed reasoning becomes tied to the vehicle's lateral choices and surrounding-agent interactions. It also uses planning-focused augmentation to expose the model to rare safety-critical cases, improving robustness on challenging closed-loop benchmarks.

{% include gallery.html
  image1="news-imgs/aligndrive-2026/teaser.png"
  tooltip1="AlignDrive teaser"
  image2="news-imgs/aligndrive-2026/method.png"
  tooltip2="AlignDrive method overview"
%}
