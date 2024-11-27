<template>
  <hello-world />
</template>
  
  <script>
  import HelloWorld from '../components/HelloWorld'
  
  export default {
    name: 'HomePage',
    components: {
      HelloWorld,
    },
  }
  </script>
  
  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
  