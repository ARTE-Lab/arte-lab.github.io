---
title: "AlignDrive: Aligned Lateral-Longitudinal Planning for End-to-End Autonomous Driving"
subtitle: "A unified planning framework for end-to-end autonomous driving"
description: "Project page for arXiv:2601.01762."
project_badge: "arXiv 2026"
teaser: assets/cv/aligndrive-teaser-v11.png
venue: "arXiv preprint"
year: 2026
authors:
  - name: "Yanhao Wu"
  - name: "Haoyang Zhang"
  - name: "Fei He"
  - name: "Rui Wu"
  - name: "Yanhu Shan"
  - name: "Congpei Qiu"
  - name: "Liang Gao"
  - name: "Wei Ke"
  - name: "Tong Zhang"
links:
  - label: "Paper"
    url: "https://arxiv.org/abs/2601.01762"
    icon: "far fa-file-pdf"
  - label: "Project Page"
    url: "https://yanhaowu.github.io/AlignDrive/"
    icon: "fas fa-globe"
  - label: "Code"
    url: "https://github.com/YanhaoWu/AlignDrive"
    icon: "fas fa-code"
video_carousel:
  - title: "Teaser Video"
    mp4: "https://yanhaowu.github.io/AlignDrive/static/videos/Teaser_video/AlignDrive.mp4"
    caption: "A driving demonstration of the AlignDrive planner."
abstract: "AlignDrive studies how an end-to-end driving system can make path and speed decisions as one coordinated process. Instead of predicting lateral motion and longitudinal motion as two loosely connected outputs, the framework first reasons about the driving path and then predicts longitudinal displacement along that path. This path-conditioned formulation makes speed planning more interaction-aware and reduces unnecessary geometric ambiguity. The work also introduces planning-oriented data augmentation for rare, safety-critical situations, helping the model learn safer responses in challenging Bench2Drive and Fail2Drive scenarios."
citation: |
  @misc{wu2026aligndrivealignedlaterallongitudinalplanning,
        title={AlignDrive: Aligned Lateral-Longitudinal Planning for End-to-End Autonomous Driving},
        author={Yanhao Wu and Haoyang Zhang and Fei He and Rui Wu and Yanhu Shan and Congpei Qiu and Liang Gao and Wei Ke and Tong Zhang},
        year={2026},
        eprint={2601.01762},
        archivePrefix={arXiv},
        primaryClass={cs.RO},
        url={https://arxiv.org/abs/2601.01762},
  }
---

{% include figure.html
  image="assets/cv/aligndrive-method-v2.png"
  caption="AlignDrive organizes end-to-end planning around a predicted drive path, then performs longitudinal reasoning along that path and augments training with safety-critical interactions."
  width="100%"
%}
