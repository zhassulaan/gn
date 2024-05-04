<template>
  <Header />
  <Body />
</template>

<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: { Header, Body },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('fetchBooks')
  },
  computed: {
    ...mapGetters(['books', 'years', 'genres'])
  }
}
</script>
