<script setup></script>

<template>
  <main class="app-content">
    <RouterView />
  </main>
  <nav class="bottom-nav">
    <RouterLink to="/" class="nav-btn" aria-label="Home">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        stroke-linejoin="round"
      >
        <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" />
      </svg>
    </RouterLink>
    <RouterLink to="/library" class="nav-btn" aria-label="Search">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="2.4"
        stroke-linecap="round"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L21 21" />
      </svg>
    </RouterLink>
    <RouterLink to="/favorites" class="nav-btn nav-right" aria-label="Favorites">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z" />
      </svg>
    </RouterLink>
  </nav>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gotu&family=Kanit:wght@300;400;600&display=swap');

html,
body {
  margin: 0;
  background: #e9eef5;
  font-family: 'Gotu', system-ui, sans-serif;
}
#app {
  position: relative;
  max-width: 393px;
  min-height: 100vh;
  margin: 0 auto;
  background: #f0f8ff;
}
* {
  box-sizing: border-box;
}

.book {
  display: flex;
  gap: 10px;
  align-items: stretch;
  color: #111;
}
.book-cover {
  flex-shrink: 0;
  width: 102px;
  height: 136px;
  object-fit: cover;
  border: 2px solid #4d86d6;
  border-radius: 14px;
  background: #e3eefa;
}
.book-cover-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #4d86d6;
}
.book-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.book-title {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
}
.book-text {
  margin: 4px 0 0;
  font-size: 0.7rem;
  line-height: 1.35;
}
.book-foot {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.stars {
  display: inline-flex;
  font-size: 1.1rem;
  line-height: 1;
}
.stars span {
  color: #17356b;
}
.stars span.on {
  color: #0075ff;
}
</style>

<style scoped>
.app-content {
  padding: 24px 16px 100px;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(393px, 100%);
  height: 72px;
  padding: 0 24px 0 150px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding-top: 10px;
  background: #c3daee;
  border: 1px solid #5b8fd0;
  border-bottom: none;
  border-radius: 24px 24px 0 0;
}
.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #0075ff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.nav-btn.router-link-exact-active {
  background: #5b8fd0;
  border: 2px solid #4d86d6;
}
.nav-right {
  margin-left: auto;
}
</style>
