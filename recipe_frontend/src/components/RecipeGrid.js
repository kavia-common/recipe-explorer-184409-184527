import Blits from '@lightningjs/blits'
import RecipeCard from './RecipeCard.js'

export default Blits.Component('RecipeGrid', {
  components: { RecipeCard },
  template: `
    <Element :x="$x" :y="$y" :w="$w" :h="$h">
      <RecipeCard
        :for="(item, index) in $items"
        :key="$item.id"
        :x="$cardX($index)"
        :y="$cardY($index)"
        :w="$cardW"
        :h="$cardH"
        :recipe="$item"
        @select="$onSelect" />
      <Text :x="$emptyX" :y="$emptyY" :content="$emptyText" :size="$emptySize" :textColor="$emptyColor" />
    </Element>
  `,
  props: ['x','y','w','h','items','cols','gap'],
  state() {
    return {
      x: this.x || 40,
      y: this.y || 260,
      w: this.w || 1840,
      h: this.h || 760,
      items: this.items || [],
      cols: this.cols || 4,
      gap: this.gap || 24,
      cardW: 420,
      cardH: 280,
      selectedIndex: 0
    }
  },
  computed: {
    rows() {
      return Math.ceil((this.items?.length || 0) / this.cols)
    },
    emptyText() {
      return (this.items?.length || 0) === 0 ? 'No recipes found.' : ''
    },
    emptyX() { return this.x + 20 },
    emptyY() { return this.y + 20 },
    emptySize() { return 28 },
    emptyColor() { return 0x6b7280ff }
  },
  methods: {
    // PUBLIC_INTERFACE
    setItems(arr) {
      this.items = arr || []
      this.selectedIndex = 0
    },
    // compute card positions
    cardX(i) {
      const col = i % this.cols
      return this.x + col * (this.cardW + this.gap)
    },
    cardY(i) {
      const row = Math.floor(i / this.cols)
      return this.y + row * (this.cardH + this.gap)
    },
    // selection
    moveSelection(dx, dy) {
      if (!this.items?.length) return
      const col = this.selectedIndex % this.cols
      const row = Math.floor(this.selectedIndex / this.cols)
      const ncol = Math.max(0, Math.min(this.cols - 1, col + dx))
      const nrow = Math.max(0, Math.min(this.rows - 1, row + dy))
      const nidx = nrow * this.cols + ncol
      if (nidx < this.items.length) this.selectedIndex = nidx
    },
    // emit selection
    onSelect(id) {
      this.$emit('select', id)
    }
  },
  input: {
    left() { this.moveSelection(-1, 0) },
    right() { this.moveSelection(1, 0) },
    up() { this.moveSelection(0, -1) },
    down() { this.moveSelection(0, 1) },
    enter() {
      const item = this.items?.[this.selectedIndex]
      if (item?.id) this.$emit('select', item.id)
    }
  }
})
