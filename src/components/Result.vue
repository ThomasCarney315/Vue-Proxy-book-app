<template>
    <div class="result">
        <img :src="result.image" :alt="result.title" >
        <h3> {{ result.title }}</h3>
        <p>{{ result.author }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchResult',
    props: {
        result: {
            type: Object,
        },
    },
  }
  </script>
  
  <style scope>
  .result {
    
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;

  }

  .result h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  </style>