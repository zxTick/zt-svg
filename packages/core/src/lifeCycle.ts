import type { Engine } from './main'
import type { LifeCyclesType, ShapeLifeCycler } from './types/lifecycles'
import type { Shape } from './types/shape'

export class ShapeLifeCycles {
  public shapeLifeCycler: ShapeLifeCycler = {}

  constructor(public svg: Engine) {
  }

  addShapeLifeCycle(shape: Shape) {
    const { name, _lifeCycle } = shape
    this.shapeLifeCycler[name] = _lifeCycle
  }

  removeShapeLifeCycle(shape: Shape) {
    const { name } = shape
    const lifeCycles = this.shapeLifeCycler[name]
    if (lifeCycles)
      delete this.shapeLifeCycler[name]
  }

  runOnBeforeRender(shape?: Shape, ...args: any[]) {
    this.runLifeCycle('onBeforeRender', shape, ...args)
  }

  runOnRender(shape?: Shape, ...args: any[]) {
    this.runLifeCycle('onRender', shape, ...args)
  }

  runOnUpdate(shape?: Shape, ...args: any[]) {
    this.runLifeCycle('onUpdate', shape, ...args)
  }

  runOnDestruction(shape?: Shape, ...args: any[]) {
    this.runLifeCycle('onDestruction', shape, ...args)
  }

  runOnZIndexChange(shape?: Shape, ...args: any[]) {
    this.runLifeCycle('onZIndexChange', shape, ...args)
  }

  runLifeCycle(key: keyof LifeCyclesType, shape?: Shape, ...args: any[]) {
    if (!shape) {
      Object.values(this.shapeLifeCycler).forEach((lifeCycles) => {
        const lifeCycle = lifeCycles[key]
        if (lifeCycle)
          lifeCycle(...args)
      })
    }
    else {
      const shapeLifeCycle = this.shapeLifeCycler[shape.name]
      if (!shapeLifeCycle)
        return
      const lifeCycle = shapeLifeCycle[key]
      if (lifeCycle)
        lifeCycle(...args)
    }
  }
}
