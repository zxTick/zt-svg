import type { LifeCyclesType } from '../types/lifecycles'
import type { BaseShapeOptions, ShapePosition, ShapeType } from '../types/shape'

export abstract class BaseShape <I extends Object = {}> {
  public name!: string
  public type!: ShapeType
  public _zIndex!: number
  public injectionInfo!: I
  public shapePosition: ShapePosition = {}
  private _lifeCycle: LifeCyclesType = {}

  public constructor(options: BaseShapeOptions<I>) {
    this.initBasicAttr(options)
  }

  initBasicAttr(options: BaseShapeOptions<I>) {
    this.name = options.name || ''
    this.type = options.type || 'null'
    this._zIndex = options._zIndex || 0
    this.injectionInfo = options.injectionInfo || {} as I
  }

  abstract initShapePosition(): void

  abstract render(): void
}
