<template>
  <div class="form-control">
    <form @submit="onSubmit">
      <div>
        <label for="text" >Search Term</label>
        <input type="text" v-model="text" name="text" placeholder="Add search criteria" />
      </div>
      <input class="submit" type="submit" value="Search"  />
      <div v-show="results">
        <label class="page" for="page">Page</label>
        <input @change="onSubmit" @submit="onSubmit" class="page" type="number" :page="page" v-model="page" name="page">
        <span> of {{ this.allPages }}</span>
        </div>
    </form>
    <SearchResults :results="results" />
    <div v-show="results">
      <label class="page" for="page">Page</label>
      <input  @change="onSubmit" @submit="onSubmit" class="page" type="number" v-model="page" name="page">
      <span> of {{ this.allPages }}</span>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SearchResults from './Results.vue';

  export default {
    name: 'BookSearch',
    components: {
      SearchResults,
    },
    data() {
      return {
        text: '',
        priorQuery: '',
        page: 1,
        results: null,
        allPages: 100,
      }
    },
    methods: {
      async onSubmit(e) {
        e.preventDefault()
  
        if (!this.text) {
          alert('Please add search criteria')
          return
        }
        this.text != this.priorQuery ? this.page = 1 : null;
        this.priorQuery = this.text;
        let arr;
        const res = await axios
          .get(`/api?query=${this.text}&page=${this.page}`)
          .then(response => (arr = response.data))
          .catch(error => console.log(error))
        this.results = arr[0];
        this.allPages = arr[1];
      },
    },
  }
  </script>
  
  <style scoped>
  .form-control {
    margin: 20px 0;
  }
  
  .form-control label {
    display: block;
  }
  
  .form-control input {
    width: 70%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }
  .form-control .page {
    width: 100px;
    display: inline;
  }
  .form-control .submit {
    width: 100px;
  }
  </style>