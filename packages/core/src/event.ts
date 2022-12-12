import type { Engine } from './main'
import { BaseType } from './types/engineType'
import type { EventName } from './types/events'
import type { Shape } from './types/shape'

export class ShapeEvent {
  public evener: Map<EventName, Set<Shape>> = new Map()
  public svgEventSet!: Set<EventName>

  constructor(public svg: Engine) {
    this.eventHandler = this.eventHandler.bind(this)
    this.initSvgEvents()
  }

  initSvgEvents() {
    this.svgEventSet = new Set(this.svg.events || [])
    this.svgEventSet.forEach((event) => {
      this.svg.dom.addEventListener(event, this.eventHandler)
    })
  }

  clearSvgEvents() {
    this.svgEventSet.forEach((event) => {
      this.svg.dom.removeEventListener(event, this.eventHandler)
    })
  }

  addEvent(shape: Shape) {
    const { eventSet } = shape
    eventSet.forEach((event) => {
      if (!this.evener.has(event)) {
        this.evener.set(event, new Set())
        this.svg.dom.addEventListener(event, this.eventHandler)
      }

      this.evener.get(event)!.add(shape)
      this.svgEventSet.add(event)
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
      this.svgEventActuator(e)
      const dataKey = (target as HTMLElement).getAttribute('data-key')
      if (!dataKey)
        return
      const shape = this.svg.figures.get(dataKey)

      const triggerEvent = this.svg.triggerEvent

      if (shape && triggerEvent && shape.eventSet.has(e.type as EventName))
        triggerEvent(e, e.type, shape, BaseType.SHAPE)
    }
  }

  svgEventActuator(e: Event) {
    const { target } = e
    if (target !== this.svg.dom)
      return
    const triggerEvent = this.svg.triggerEvent
    this.svg.events.includes(e.type as EventName)
      && triggerEvent
      && triggerEvent(e, e.type, this.svg, BaseType.SVG)
  }
}
