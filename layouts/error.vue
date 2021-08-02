<template>
  <section>
    <div v-if="error.statusCode === 404">
      <h1>Страница не найдена</h1>
    </div>
    <div v-else>
      <h1>Ошибка:</h1>
      <pre>
        {{ error }}
      </pre>
    </div>
    <NuxtLink to="/">На главную</NuxtLink>
  </section>
</template>

<script>
  export default {
    props: ['error'],
  }
</script>
