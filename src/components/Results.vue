<template>
    <div :key="result.id" v-for="result in results">
        <SearchResult :result="result" />
    </div>
</template>

<script>
    import SearchResult from './Result.vue';
    export default {
        name: 'Results',
        props: {
            results: Array
        },
        components: {
            SearchResult,
        },
    }
</script>