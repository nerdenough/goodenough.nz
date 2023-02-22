<script setup>
import cn from 'classnames'
import { format } from 'date-fns'

const { post, size } = defineProps({
  post: {
    type: Object,
    required: true,
  },
  size: String,
})

const { title, date, path, thumbnail } = post

let cardClassName = 'card-md'
switch (size) {
  case 'lg':
    cardClassName = 'card-lg'
    break
}

const style = thumbnail
  ? {
      backgroundImage: `url(${thumbnail})`,
    }
  : undefined
</script>

<template>
  <a
    :class="cn('card', cardClassName, thumbnail ? 'with-image' : '')"
    :href="path"
    :style="style"
  >
    <div class="container">
      <div class="fill"></div>
      <div>
        <p class="date">{{ format(new Date(date), 'MMMM dd, yyyy') }}</p>
        <h2 class="title">{{ title }}</h2>
      </div>
    </div>
  </a>
</template>

<style scoped>
.card {
  display: flex;
  height: 250px;
  border: 1px solid var(--vp-c-gutter);
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  transition: transform ease-in-out 0.1s;
}

.card-lg {
  height: 500px;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

.card.with-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.fill {
  flex: 1 1 0;
}

.card.with-image .container {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9));
}

.card.with-image:hover {
  color: rgba(255, 255, 255, 0.8);
}

.card .title {
  color: var(--vp-c-text-1);
  margin: 0;
  border-top: none;
  padding: 0;
  font-size: 18px;
  line-height: 24px;
}

.card-lg .title {
  font-size: 24px;
  line-height: 32px;
}

.card .date {
  color: var(--vp-c-text-2);
  opacity: 0.8;
  padding: 0;
  margin: 0;
  font-size: 12px;
  font-style: oblique;
}

.card-lg .date {
  font-size: 16px;
}

.card.with-image .title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.card.with-image .date {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
