import type { Engine } from '../main'
import type { EventName } from '../types/events'
import type { LifeCyclesType } from '../types/lifecycles'
import type { BaseShapeOptions, RectOptions, ShapePosition, ShapeType } from '../types/shape'

export abstract class BaseShape <I extends Object = {}> {
  public name!: string
  public type!: ShapeType
  public _zIndex = 0
  public zIndex!: number
  public injectionInfo!: I
  public shapePosition: ShapePosition = {}
  public _lifeCycle: LifeCyclesType = {}
  public abstract dom: HTMLElement
  public eventSet = new Set<EventName>()

  public constructor(options: BaseShapeOptions<I>) {
    this.initBasicAttr(options)
    this.initEventSet(options)
    this.initLifeCycle(options)
  }

  initEventSet(options: BaseShapeOptions<I>) {
    const { events } = options
    if (events) {
      events.forEach((event) => {
        this.eventSet.add(event)
      })
    }
  }

  initLifeCycle(options: BaseShapeOptions<I>): void {
    const { onBeforeRender, onRender, onUpdate, onDestruction, onZIndexChange } = options
    this._lifeCycle = {
      onBeforeRender,
      onRender,
      onUpdate,
      onDestruction,
      onZIndexChange,
    }
  }

  initBasicAttr(options: BaseShapeOptions<I>) {
    this.name = options.name || ''
    this.type = options.type || 'null'
    this.zIndex = options.zIndex || 0
    this.injectionInfo = options.injectionInfo || {} as I
  }

  abstract initShapePosition(options: RectOptions<I>): void

  abstract render(svg: Engine): void
}
