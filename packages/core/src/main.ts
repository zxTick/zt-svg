import { ShapeEvent } from './event'
import { ShapeLifeCycles } from './lifeCycle'
import type { EngineOptions } from './types/engineType'
import type { EventName } from './types/events'
import type { Shape } from './types/shape'

export class Engine {
  name!: string
  events!: EventName[]
  lifeCycles!: string[]
  figures!: Map<string, Shape>
  dom!: SVGAElement
  baseEvents!: Set<EventName>
  shapeEvent: ShapeEvent
  shapeLifeCycles: ShapeLifeCycles
  triggerEvent?: (...args: any[]) => void
  renderQueue: Shape[] = []

  constructor(options: EngineOptions) {
    this.initBasicAttr(options)
    this.initDom(options)
    this.shapeEvent = new ShapeEvent(this)
    this.shapeLifeCycles = new ShapeLifeCycles(this)
  }

  initBasicAttr(options: EngineOptions) {
    this.name = options.name || ''
    this.events = options.events || []
    this.lifeCycles = options.lifeCycles || []
    this.figures = new Map()
    this.triggerEvent = options.triggerEvent
    this.baseEvents = new Set(options.baseEvents || [])
  }

  initDom(options: EngineOptions) {
    const target = options.target

    if (!target)
      throw new Error('target is required')

    if (typeof target === 'string')
      this.dom = document.querySelector(target) as SVGAElement

    else
      this.dom = target
  }

  add(shape: Shape) {
    this.mergeEventSet(shape)
    this.shapeLifeCycles.addShapeLifeCycle(shape)
    this.figures.set(shape.name, shape)
    this.shapeEvent.addEvent(shape)
    this.renderQueue.push(shape)
    this.sortRenderQueue()
  }

  zindex(shape: Shape, zIndex: number) {
    this.clearView()
    shape.zIndex = zIndex
    this.sortRenderQueue()
    this.shapeLifeCycles.runOnZIndexChange(shape, this)
    this.render()
  }

  render() {
    let i = 0
    this.renderQueue.forEach((shape) => {
      this.shapeLifeCycles.runOnBeforeRender(shape, this)
      shape._zIndex = i++
      shape.render(this)
      this.shapeLifeCycles.runOnRender(shape, this)
    })
  }

  delete(shape: Shape) {
    this.shapeEvent.removeEvent(shape)
    this.shapeLifeCycles.removeShapeLifeCycle(shape)
    this.renderQueue = this.renderQueue.filter(item => item !== shape)
    this.figures.delete(shape.name)
    this.shapeLifeCycles.runOnDestruction(shape, this)
  }

  clear() {
    this.figures.forEach((shape, _) => {
      this.delete(shape)
    })
    this.renderQueue = []
    this.clearSvgChildren()
  }

  clearView() {
    this.clearSvgChildren()
  }

  clearSvgChildren() {
    this.dom.innerHTML = ''
  }

  mergeEventSet(shape: Shape) {
    this.baseEvents.forEach((event) => {
      shape.eventSet.add(event)
    })
  }

  sortRenderQueue() {
    this.renderQueue.sort((a, b) => a.zIndex - b.zIndex)
  }

  clearEvents() {
    this.shapeEvent.clearSvgEvents()
  }
}
