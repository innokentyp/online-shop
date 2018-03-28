<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click="page_has_changed($event, current_page - 1)" :disabled="current_page <= 1">Назад</a>
    <a class="pagination-next" @click="page_has_changed($event, current_page + 1)" :disabled="current_page >= last_page">Вперёд</a>
    <ul class="pagination-list">
      <li v-if="current_page > 1"><a class="pagination-link" aria-label="Goto page 1" @click="page_has_changed($event, 1)">1</a></li>
      <li v-if="current_page > 3"><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="current_page > 2"><a class="pagination-link" :aria-label="'Goto page ' + (current_page - 1)" @click="page_has_changed($event, current_page - 1)">{{ current_page - 1 }}</a></li>
      <li><a class="pagination-link is-current" :aria-label="'Page ' + current_page" aria-current="page" @click="page_has_changed($event, current_page)" :disabled="current_page >= last_page">{{ current_page }}</a></li>
      <li v-if="current_page < last_page - 1"><a class="pagination-link" :aria-label="'Goto page ' + (current_page + 1)" @click="page_has_changed($event, current_page + 1)">{{ current_page + 1 }}</a></li>
      <li v-if="current_page < last_page - 2"><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="current_page < last_page"><a class="pagination-link" :aria-label="'Goto page ' + last_page" @click="page_has_changed($event, last_page)">{{ last_page }}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['last_page', 'current_page'],
  data () {
    return {}
  },
  methods: {
    page_has_changed(event, page) {
      this.$emit('page-has-changed', page)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
