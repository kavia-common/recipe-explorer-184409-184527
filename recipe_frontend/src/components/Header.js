import Blits from '@lightningjs/blits'
import { theme } from '../theme/theme.js'

export default Blits.Component('Header', {
  template: `
    <Element :x="$x" :y="$y" :w="$w" :h="$h">
      <!-- Surface with subtle shadow-like overlay -->
      <Element w="1920" h="120" :color="$surface" alpha="0.98" />
      <Element x="0" y="118" w="1920" h="2" :color="$primary" alpha="0.25" />
      <Element x="40" y="28" w="12" h="64" :color="$secondary" alpha="0.9" />
      <Text x="64" y="36" :content="$title" :size="$titleSize" :textColor="$text" />
    </Element>
  `,
  props: ['x', 'y', 'w', 'h', 'title'],
  state() {
    return {
      x: this.x || 0,
      y: this.y || 0,
      w: this.w || 1920,
      h: this.h || 120,
      title: this.title || 'Recipe Explorer',
      titleSize: 48,
      primary: theme.primary,
      secondary: theme.secondary,
      text: theme.text,
      surface: theme.surface
    }
  }
})
