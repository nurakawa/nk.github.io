---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: writings, articles and talks
---

<ul style="line-height: 2.2">
<li> PyData Yerevan 2022: The Explainability Problem (<a href="https://yerevan2022.pydata.org/cfp/talk/8MVL3D/">summary</a>) (<a href="https://www.youtube.com/watch?v=l-YJm6Umz2s">video</a>)</li>
<li>Towards Data Science: <a href="https://medium.com/towards-data-science/explainable-ai-xai-with-class-maps-d0e137a91d2c"> Explainable AI (XAI) With Class Maps</a> </li>
</ul>
<section class="archive">

{% for post in site.posts %}
{% unless post.next %}

  {% unless forloop.first %}
    </div>
  </div>
  {% endunless %}
{% else %}

{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture next_year %}{{ post.next.date | date: '%Y' }}{% endcapture %}

{% if year != next_year %}

  {% unless forloop.first %}
  {% endunless %}


{% endif %}
{% endunless %}

  <article>
    <div class="post_title">
      <ul>
      <li><a href="{{ post.url | absolute_url }}" title="{{ post.title }}">{{ post.title }}</a></li>
      </ul>
    </div>
  </article>
  {% if forloop.last %}
  {% endif %}
{% endfor %}
</section>


