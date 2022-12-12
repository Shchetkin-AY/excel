import {capitalize} from '@core/utils';

export class DomListner {
  constructor($root, listners = []) {
    if (!$root) {
      throw new Error(`No $root provided!`)
    }
    this.$root = $root
    this.listners = listners
  }
  initDOMListners() {
    // console.log(this.listners)
    this.listners.forEach(listner => {
      const method = getMethodname(listner)
      const name = this.name
      if (!this[method]) {
        throw new Error(`Method ${method} is not in ${name} Component`)
      }
      // тоже самое что и addeventlister
      this[method] = this[method].bind(this)
      this.$root.on(listner, this[method].bind(this))
    })
  }

  removeDOMListners() {
    this.listners.forEach(listner => {
      const method = getMethodname(listner)
      this.$root.off(listner, this[method])
    })
  }
}

function getMethodname(eventName) {
  return 'on' + capitalize(eventName)
}
