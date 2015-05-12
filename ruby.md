---
layout: page
title: Ruby
---

{% for post in site.categories['ruby'] %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}

{% include pagination.html %}