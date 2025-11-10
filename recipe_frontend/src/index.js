import Blits from '@lightningjs/blits'
import App from './App.js'

// Launch with standard 1080p canvas and key mappings.
// Key mapping ensures character keys are delivered to components via input.key.
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  keys: {
    left: ['ArrowLeft'],
    right: ['ArrowRight'],
    up: ['ArrowUp'],
    down: ['ArrowDown'],
    enter: ['Enter'],
    back: ['Escape', 'Backspace'],
    key: 'any'
  }
})
