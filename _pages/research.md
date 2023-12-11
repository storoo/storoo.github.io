---
layout: archive
title: "Research"
permalink: /publications/
author_profile: true
katex: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}


# Preprints 
- [_Simplicial $$C_2$$-isovariant homotopy_](https://storoo.github.io/files/isovariant_homotopy.pdf). 2023. Currently under revision, comments are welcome! 
  

# Theses 

- Master report: [_Applications of motivic homotopy theory
to arithmetic counts of lines_](https://storoo.github.io/files/Master_thesis_Grenoble.pdf). Université Grenoble Alpes - France.

I studied the Kass-Wicklengren's generalization of Salmon-Cayley's theorem regarding the number of lines on a smooth projective curve. 

- Undergraduate report: [_El Teorema de Riemann-Roch_](). Universidad Nacional de Colombia. Colombia.

I studied André Weil's proof of the Riemann-Roch Theorem for curves over algebraically closed fields. 
