import type { Engine } from './main'
import type { EventName } from './types/events'
import type { Shape } from './types/shape'

export class ShapeEvent {
  public evener: Map<EventName, Set<Shape>> = new Map()

  constructor(public svg: Engine) {
    this.eventHandler = this.eventHandler.bind(this)
  }

  addEvent(shape: Shape) {
    const { eventSet } = shape
    eventSet.forEach((event) => {
      if (!this.evener.has(event)) {
        this.evener.set(event, new Set())
        this.svg.dom.addEventListener(event, this.eventHandler)
      }

      this.evener.get(event)!.add(shape)
    })
  }

  removeEvent(shape: Shape) {
    const { eventSet } = shape
    eventSet.forEach((event) => {
      if (this.evener.has(event)) {
        this.evener.get(event)!.delete(shape)
        if (this.evener.get(event)!.size === 0) {
          this.evener.delete(event)
          this.svg.dom.removeEventListener(event, this.eventHandler)
        }
      }
    })
  }

  eventHandler(e: Event) {
    const { target } = e
    if (target) {
      if (target === this.svg.dom)
        return
      const dataKey = (target as HTMLElement).getAttribute('data-key')
      if (!dataKey)
        return
      const shape = this.svg.figures.get(dataKey)

      const triggerEvent = this.svg.triggerEvent

      if (shape && triggerEvent)
        triggerEvent(e, e.type, shape)
    }
  }
}
