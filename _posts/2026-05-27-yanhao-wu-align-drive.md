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

Congratulations to the Team on Achieving State-of-the-Art in Autonomous Driving! We are thrilled to announce that our recent joint work with Horizon Robotics, led by [Yanhao Wu](https://arte-lab.github.io/members/Yanhao-Wu.html), has achieved Top-1 performance on both the Bench2drive and the newly released [Fail2Drive](https://simonger.github.io/fail2drive/). Notably, our approach demonstrated exceptional resilience, proving to have the best generalization ability among competing methods.

Discover how we did it in our paper: [*AlignDrive: Aligned Lateral-Longitudinal Planning for End-to-End Autonomous Driving*](/research/aligndrive/) ([arXiv](https://arxiv.org/abs/2601.01762), For a deeper dive into the methodology and to view our qualitative results, please visit our official [project homepage](https://yanhaowu.github.io/AlignDrive/).

AlignDrive takes aim at a subtle but important planning mismatch in autonomous driving: where to go and how fast to move should be decided together. The method conditions longitudinal prediction on the planned drive path, so speed reasoning becomes tied to the vehicle's lateral choices and surrounding-agent interactions. It also uses planning-focused augmentation to expose the model to rare safety-critical cases, improving robustness on challenging closed-loop benchmarks.

{% include gallery.html
  image1="news-imgs/aligndrive-2026/teaser.png"
  tooltip1="AlignDrive teaser"
  image2="news-imgs/aligndrive-2026/method.png"
  tooltip2="AlignDrive method overview"
%}
