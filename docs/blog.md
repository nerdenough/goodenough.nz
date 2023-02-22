---
layout: page
---

<script setup>
  import Card from '../components/Card.vue'
  import posts from './blog/posts.json'
</script>

<h1 class="title">Blog</h1>

<h2>Latest Post</h2>
<Card :post="posts[0]" size="lg" />

<div class="all-posts" v-if="posts.length > 1">
<h2>All Posts</h2>

  <div class="cards">
    <Card v-for="post in posts.slice(1)" :post="post" />
  </div>
</div>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 50%), 1fr));
  gap: 1rem;
}

.all-posts {
  margin-top: 24px;
}

@media screen and (max-width: 800px) {
  .cards {
    gap: 0.5rem;
  }
}
</style>
