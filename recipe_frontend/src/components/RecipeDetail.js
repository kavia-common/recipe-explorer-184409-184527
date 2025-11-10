import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('RecipeDetail', {
  template: `
    <Element :x="$x" :y="$y" :w="$w" :h="$h">
      <!-- Dim background overlay -->
      <Element w="1920" h="1080" color="0x000000ff" alpha="0.35" />
      <!-- Modal surface -->
      <Element :x="$modalX" :y="$modalY" :w="$modalW" :h="$modalH" :color="$surface" alpha="0.99" />
      <Element :x="$modalX" :y="$modalY" :w="$modalW" h="4" :color="$primary" alpha="0.35" />

      <!-- Image -->
      <Element :x="$modalX + 24" :y="$modalY + 24" :w="$imgW" :h="$imgH" :src="$image" />
      <!-- Title -->
      <Text :x="$modalX + 24" :y="$modalY + 24 + $imgH + 16" :content="$title" :size="$titleSize" :textColor="$text" />

      <!-- Ingredients header -->
      <Text :x="$col2X" :y="$modalY + 24" content="Ingredients" :size="$sectionSize" :textColor="$text" />
      <!-- Ingredients list -->
      <Text
        :x="$col2X"
        :y="$modalY + 72"
        :content="$ingredientsText"
        :size="$bodySize"
        :textColor="$bodyColor" />

      <!-- Steps header -->
      <Text :x="$col2X" :y="$modalY + 72 + $ingHeight" content="Steps" :size="$sectionSize" :textColor="$text" />
      <Text
        :x="$col2X"
        :y="$modalY + 120 + $ingHeight"
        :content="$stepsText"
        :size="$bodySize"
        :textColor="$bodyColor" />

      <!-- Close button hint -->
      <Text :x="$modalX + $modalW - 280" :y="$modalY + 24" content="Back to close" :size="$captionSize" :textColor="$captionColor" />
    </Element>
  `,
  props: ['recipe'],
  state() {
    const modalW = 1680
    const modalH = 920
    const modalX = (1920 - modalW) / 2
    const modalY = (1080 - modalH) / 2
    const imgW = 800
    const imgH = 420
    const col2X = modalX + imgW + 48
    return {
      x: 0, y: 0, w: 1920, h: 1080,
      surface: theme.surface,
      primary: theme.primary,
      text: theme.text,
      titleSize: 44,
      sectionSize: 32,
      bodySize: 26,
      bodyColor: 0x374151ff,
      captionSize: 22,
      captionColor: 0x6b7280ff,
      modalW, modalH, modalX, modalY, imgW, imgH, col2X,
      ingHeight: 220
    }
  },
  computed: {
    image() { return this.recipe?.image || '' },
    title() { return this.recipe?.title || 'Untitled Recipe' },
    ingredientsText() {
      const list = this.recipe?.ingredients || []
      return list.map(i => `• ${i}`).join('\n')
    },
    stepsText() {
      const list = this.recipe?.steps || []
      return list.map((s, i) => `${i + 1}. ${s}`).join('\n')
    }
  },
  input: {
    back() {
      this.$emit('close')
    },
    enter() {
      // Allow Enter to also close for simplicity
      this.$emit('close')
    }
  }
})
