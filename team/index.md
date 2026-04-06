---
title: Team
redirect_from:
- /lab-members
- /alums
- /mascots
- /staff
- /trainees
---

{% assign professor = site.members | where: "role", "professor" | where: "group", "current" | first %}
{% assign professor_bio = professor.content | strip | split: "\n\n" | first %}

<div class="team_page">
  <div class="team_page_heading">
    <h1>Team</h1>
    <p>Meet the people building ARTE Group across spatial intelligence, autonomous driving, and representation learning.</p>
  </div>

  <section class="team_feature">
    <div class="team_feature_media">
      {% include portrait.html
        name=professor.title
        link=professor.url
        image=professor.image
        role=professor.role
      %}
    </div>
    <div class="team_feature_content">
      <p class="team_feature_kicker">Professor</p>
      <h2>{{ professor.title }}</h2>
      {% include tags.html tags=professor.search %}
      <div class="team_feature_bio">
        {{ professor_bio | markdownify }}
      </div>
      <p class="team_feature_links">
        <a href="{{ professor.url | relative_url }}">Profile</a>
        {% assign professor_homepage = professor.website | default: professor.homepage | default: professor["personal homepage"] %}
        {% if professor_homepage %}
        <a href="{{ professor_homepage }}">Homepage</a>
        {% endif %}
      </p>
    </div>
  </section>

  <section class="team_members_section">
    <div class="team_members_heading">
      <h2>Students</h2>
      <p>Current graduate and undergraduate students in the group.</p>
    </div>
    <div class="team_member_grid">
      {% for member in site.members %}
      {% if member.group == "current" and member.role != "professor" %}
      {% assign member_homepage = member.website | default: member.homepage | default: member["personal homepage"] %}
      <article class="team_member_card">
        <a class="team_member_image" href="{{ member.url | relative_url }}">
          <img src="{{ member.image | relative_url }}" alt="{{ member.title }}" />
        </a>
        <div class="team_member_body">
          <h3><a href="{{ member.url | relative_url }}">{{ member.title }}</a></h3>
          <p class="team_member_role">{{ member.role }}</p>
          {% if member.search %}
          {% include tags.html tags=member.search %}
          {% endif %}
          {% if member_homepage %}
          <p class="team_member_link"><a href="{{ member_homepage }}">Homepage</a></p>
          {% endif %}
        </div>
      </article>
      {% endif %}
      {% endfor %}
    </div>
  </section>

  <section class="team_members_section">
    <div class="team_members_heading">
      <h2>Alumni</h2>
      <p>Former members who helped shape the lab.</p>
    </div>
    <div class="team_alumni_grid">
      {% assign alumni = site.members | where: "group", "alum" %}
      {% for member in alumni %}
      <article class="team_alumni_item">
        <a href="{{ member.url | relative_url }}">{{ member.title }}</a>
        {% if member.search %}
        <span>{{ member.search | join: " · " }}</span>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </section>
</div>
