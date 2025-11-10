import Blits from '@lightningjs/blits'
import { theme, focusRing } from '../theme/theme.js'

export default Blits.Component('RecipeCard', {
  template: `
    <Element :x="$x" :y="$y" :w="$w" :h="$h">
      <!-- Card background -->
      <Element :w="$w" :h="$h" :color="$surface" alpha="0.98" />
      <!-- Focus ring overlay -->
      <Element :w="$w" :h="$h" :color="$focusColor" :alpha="$focusAlpha" />

      <!-- Image placeholder block (image element needs w & h) -->
      <Element x="0" y="0" :w="$w" h="180" :color="$imgBg" />
      <Element x="0" y="0" :w="$w" h="180" :src="$image" alpha="1" />

      <!-- Title and description -->
      <Text x="16" y="196" :content="$title" :size="$titleSize" :textColor="$text" />
      <Text x="16" y="236" :content="$description" :size="$descSize" :textColor="$descColor" />
    </Element>
  `,
  props: ['x','y','w','h','recipe'],
  state() {
    return {
      x: this.x || 0,
      y: this.y || 0,
      w: this.w || 420,
      h: this.h || 280,
      focused: false,
      titleSize: 28,
      descSize: 22,
      surface: theme.surface,
      text: theme.text,
      descColor: 0x4b5563ff, // gray-600
      imgBg: 0xe5e7ebff   // gray-200
    }
  },
  computed: {
    image() { return this.recipe?.image || '' },
    title() { return this.recipe?.title || 'Untitled' },
    description() { return this.recipe?.description || '' },
    ...{
      focusColor() { return focusRing(this.focused).color },
      focusAlpha() { return this.focused ? 0.35 : 0 }
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    focus(e) { this.focused = true },
    // PUBLIC_INTERFACE
    blur() { this.focused = false }
  },
  input: {
    enter() {
      if (this.recipe?.id) this.$emit('select', this.recipe.id)
    },
    left(e) { this.parent?.focus?.(e) },
    right(e) { this.parent?.focus?.(e) },
    up(e) { this.parent?.focus?.(e) },
    down(e) { this.parent?.focus?.(e) }
  }
})
