import Blits from '@lightningjs/blits'
import Header from '../components/Header.js'
import SearchBar from '../components/SearchBar.js'
import RecipeGrid from '../components/RecipeGrid.js'
import RecipeDetail from '../components/RecipeDetail.js'

export default Blits.Component('Home', {
  components: { Header, SearchBar, RecipeGrid, RecipeDetail },
  template: `
    <Element w="1920" h="1080">
      <Header title="Recipe Explorer" />
      <SearchBar @change="$onQuery" @back="$onBackFromSearch" />
      <RecipeGrid :items="$items" @select="$onSelect" />
      <RecipeDetail v-if="$detailVisible" :recipe="$selectedRecipe" @close="$onCloseDetail" />
    </Element>
  `,
  state() {
    return {
      items: []
    }
  },
  computed: {
    detailVisible() { return !!this.$store.selectedId },
    selectedRecipe() {
      const id = this.$store.selectedId
      return (this.$store.recipes || []).find(r => r.id === id) || null
    }
  },
  async onInit() {
    await this.$store.init(this.$app?.env)
    this.items = this.$store.filtered
  },
  watch: {
    '$store.filtered'() {
      this.items = this.$store.filtered
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    onQuery(q) {
      /** Handle search text changes */
      this.$store.setQuery(q || '')
    },
    // PUBLIC_INTERFACE
    onSelect(id) {
      /** Open detail for selected recipe */
      this.$store.select(id)
    },
    // PUBLIC_INTERFACE
    onCloseDetail() {
      /** Close the recipe detail */
      this.$store.closeDetail()
    },
    // PUBLIC_INTERFACE
    onBackFromSearch() {
      /** If detail open, close; else bubble up to router */
      if (this.$store.selectedId) this.$store.closeDetail()
      else this.$router.back()
    }
  }
})
