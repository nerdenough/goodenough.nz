---
layout: home
title: 'Brendan Goodenough'
description:
  Kiwi living in the Arctic. Check out my portfolio, photography, and blog
  posts!
head:
  - - meta
    - property: 'keywords'
      content: 'Brendan Goodenough, software developer, photographer'
  - - meta
    - property: 'og:title'
      content: Brendan Goodenough
  - - meta
    - property: 'twitter:title'
      content: Brendan Goodenough
---

<div class="container">
  <video autoplay muted loop id="background-video">
    <source src="/assets/home-background.mp4" type="video/mp4">
  </video>

  <div class="hero">
    <h1 class="title">Brendan Goodenough</h1>
    <h2 class="tagline">Kiwi in the Arctic</h2>
    <a class="projects" href="/projects">My Projects</a>
  </div>
</div>

<style scoped>
  .container {
    background-image: url('/assets/home-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    width: 100vw;
    height: calc(100vh - 64px);
  }

  #background-video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero {
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 32px;
  }

  .title {
    color: white;
    font-size: 48px;
    font-weight: 600;
    line-height: 48px;
    text-align: center;
    margin-bottom: 12px;
  }

  .tagline {
    color: white;
    opacity: 0.5;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 50px;
    line-height: 28px;
    text-align: center;
  }

  .projects {
    border: 2px solid var(--vp-c-brand);
    opacity: 0.75;
    color: var(--vp-c-brand);
    font-weight: 600;
    font-size: 18px;
    padding: 15px;
    border-radius: 5px;
    transition: transform ease-in-out 0.1s;
  }

  .projects:hover {
    opacity: 1;
    transform: scale(1.02);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 768px) {
    #background-video {
      display: none;
    }
  }
</style>
