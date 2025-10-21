<template>
  <div class="index-page">
    <h1>Welcome</h1>
    <p>
      <NuxtLink to="/tt" class="link">Go to Ticket Table</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.index-page {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.link {
  color: #2fc6f6;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>
