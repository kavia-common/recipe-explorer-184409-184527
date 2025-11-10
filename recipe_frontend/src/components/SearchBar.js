import Blits from '@lightningjs/blits'
import { theme, focusRing } from '../theme/theme.js'

export default Blits.Component('SearchBar', {
  template: `
    <Element :x="$x" :y="$y" :w="$w" :h="$h">
      <!-- Card container -->
      <Element :color="$surface" :alpha="$cardAlpha" :w="$w" :h="$h" />
      <!-- Focus ring overlay -->
      <Element :w="$w" :h="$h" :color="$focusColor" :alpha="$focusAlpha" />
      <!-- Icon block -->
      <Element x="24" y="18" w="40" h="40" :color="$primary" alpha="0.85" />
      <Text x="80" y="24" :content="$placeholderOrText" :textColor="$textColor" :size="$fontSize" />
      <Text x="80" y="68" :content="$helper" :textColor="$captionColor" :size="$captionSize" />
    </Element>
  `,
  props: ['x','y','w','h','placeholder','value'],
  state() {
    return {
      x: this.x || 40,
      y: this.y || 140,
      w: this.w || 1840,
      h: this.h || 96,
      placeholder: this.placeholder || 'Search recipes…',
      value: this.value || '',
      primary: theme.primary,
      surface: theme.surface,
      cardAlpha: 0.98,
      fontSize: 32,
      captionSize: 22,
      helper: 'Type to filter • Press Enter to clear • Back to close detail',
      focused: false
    }
  },
  computed: {
    placeholderOrText() {
      return this.value?.length ? this.value : this.placeholder
    },
    textColor() {
      return this.value?.length ? theme.text : 0x6b7280ff // gray-500
    },
    captionColor() {
      return 0x6b7280ff
    },
    ...{
      focusColor() { return focusRing(this.focused).color },
      focusAlpha() { return focusRing(this.focused).alpha }
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    setValue(v) {
      /** Set query text programmatically and update visuals. */
      this.value = v
    },
    // PUBLIC_INTERFACE
    focus(e) {
      /** Focus the component and start capturing text input. */
      this.focused = true
    },
    // PUBLIC_INTERFACE
    blur() {
      /** Blur the component; input bubbles up. */
      this.focused = false
    }
  },
  input: {
    // handle text input for Lightning: using e.key for characters
    key(e) {
      if (!this.focused) return this.parent?.focus?.(e)
      const k = e?.key || ''
      if (k === 'Backspace') {
        this.value = this.value.slice(0, -1)
        this.$emit('change', this.value)
      } else if (k === 'Enter') {
        // Clear on enter for convenience
        this.value = ''
        this.$emit('change', this.value)
      } else if (k.length === 1) {
        this.value += k
        this.$emit('change', this.value)
      } else {
        // unhandled keys bubble up
        this.parent?.focus?.(e)
      }
    },
    back(e) {
      // For convenience pass back to parent to close detail if open
      this.$emit('back')
      this.parent?.focus?.(e)
    }
  }
})
