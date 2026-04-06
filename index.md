---
layout: default
title: ARTE Group
---

<section class="home_hero">
  <div class="home_shell home_hero_shell">
    <div class="home_hero_copy">
      <p class="home_kicker">UCAS · LAMP Laboratory</p>
      <h1>ARTE Group</h1>
      <p class="home_subtitle">Autonomous Representation de Temps et Espace</p>
      <p class="home_intro">
        The ARTE Group is a research group affiliated with the LAMP Laboratory led by
        <a href="https://people.ucas.ac.cn/~qxye?language=en">Prof. Qixiang Ye</a>
        at the University of Chinese Academy of Sciences (UCAS).
      </p>
      <div class="home_actions">
        <a class="home_button home_button_primary" href="{{ '/research/' | relative_url }}">Representative Works</a>
        <a class="home_button home_button_secondary" href="#about">About</a>
      </div>
    </div>
  </div>
</section>

<section class="home_section home_section_dark" id="about">
  <div class="home_shell">
    <div class="home_section_heading">
      <p class="home_eyebrow">About</p>
      <h2>Building representations that understand how the physical world evolves.</h2>
    </div>
    <div class="home_about_grid">
      <p>
        Rather than treating the physical world as a static collection of observations, we
        study how intelligent systems can form compact, structured, and predictive
        representations of space, time, and interaction.
      </p>
      <p>
        Our work spans spatial intelligence, autonomous driving, world models, and
        multimodal representation learning, with the goal of making machine perception
        more grounded, coherent, and actionable.
      </p>
    </div>
  </div>
</section>

<section class="home_section home_section_light" id="works">
  <div class="home_shell">
    <div class="home_section_heading">
      <p class="home_eyebrow">Representative Works</p>
      <h2>Selected projects from our recent research.</h2>
    </div>
    {% assign featured_works = site.data.research-output | sort: "date" | reverse %}
    <div class="home_work_grid">
      {% for paper in featured_works limit: 4 %}
      <article class="home_work_card">
        <a class="home_work_image" href="{{ paper.page | default: paper.link }}">
          <img src="{{ paper.image | relative_url }}" alt="{{ paper.title }}" />
        </a>
        <div class="home_work_body">
          <p class="home_work_meta">{{ paper.publisher }} · {{ paper.date | append: '' | slice: 0, 4 }}</p>
          <a class="home_work_title" href="{{ paper.page | default: paper.link }}">{{ paper.title }}</a>
          <p class="home_work_authors">{{ paper.authors | join: ", " }}</p>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="home_section home_section_dark" id="directions">
  <div class="home_shell">
    <div class="home_section_heading">
      <p class="home_eyebrow">Directions</p>
      <h2>Research directions that shape our current work.</h2>
    </div>
    <div class="home_direction_grid">
      <article class="home_direction_card">
        <h3>Spatial Intelligence</h3>
        <p>Learning representations that reason about structure, geometry, and interaction in complex 3D worlds.</p>
      </article>
      <article class="home_direction_card">
        <h3>Autonomous Driving</h3>
        <p>Connecting perception, prediction, and planning with grounded multimodal understanding.</p>
      </article>
      <article class="home_direction_card">
        <h3>World Models</h3>
        <p>Modeling temporal dynamics and latent structure so intelligent systems can predict and simulate future states.</p>
      </article>
      <article class="home_direction_card">
        <h3>Representation Learning</h3>
        <p>Designing scalable self-supervised and multimodal learning strategies for real-world visual understanding.</p>
      </article>
    </div>
  </div>
</section>

<section class="home_section home_section_dark" id="professor">
  <div class="home_shell">
    <div class="home_section_heading">
      <p class="home_eyebrow">Professor</p>
      <h2>Leading the group with a focus on grounded visual intelligence.</h2>
    </div>
    <div class="home_professor_grid">
      {% include team-list.html role="professor" group="current" %}
    </div>
  </div>
</section>

<section class="home_section home_section_dark home_section_compact">
  <div class="home_shell home_cta">
    <div>
      <p class="home_eyebrow">Explore More</p>
      <h2>See our publications, projects, and team.</h2>
    </div>
    <div class="home_actions">
      <a class="home_button home_button_primary" href="{{ '/research/' | relative_url }}">Publications</a>
      <a class="home_button home_button_secondary" href="{{ '/team/' | relative_url }}">Team</a>
    </div>
  </div>
</section>
