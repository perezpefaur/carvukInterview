<template lang="hmtl">
<div>{{this.rows}} </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'Table',
    data() {
      return {
        query: '',
      }
    },
    mounted() {
        console.log(localStorage.token);
        this.$store.dispatch('getRows');
    },
    computed: {
        ...mapState({
            rows: state => state.rows
        })
    },
    methods:{
        search(event) {
            const element = document.getElementById('query');
            this.$store.dispatch('getCharacters', element.value)
        }
    
    }
    
};
</script>