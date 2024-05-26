---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: 
---

<h1>articles and talks</h1>

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


<h1>publications</h1>
- Artificial Intelligence:

  - (2022) [Security of AI-Systems: Fundamentals - Provision or use of external data or trained models](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/Studies/KI/P464_Provision_use_external_data_trained_models.pdf?__blob=publicationFile&v=7) Bundesamt für Sicherheit in der Informationstechnik.
- Statistical Methods in Hydrogeology:

  - (2022) [Defining Hydrogeological Site Similarity with Hierarchical Agglomerative Clustering](https://doi.org/10.1111/gwat.13261). _Groundwater_. __Kawa, N.__, Cucchi, K., Rubin, Y., Attinger, S. and Heße, F. 

  - (2021) [exPrior: An R Package for the Formulation of Ex-Situ Priors.](https://journal.r-project.org/archive/2021/RJ-2021-031/index.html) _The RJournal_. Falk Heße, Karina Cucchi, __Nura Kawa__ and Yoram Rubin.

  - (2019) [Ex-situ priors: A Bayesian hierarchical framework for defining informative prior distributions in hydrogeology](https://doi.org/10.1016/j.advwatres.2019.02.003). _Advances in Water Resources_. Cucchi, K., Heße, F., __Kawa, N.__, Wang, C., & Rubin, Y. 



