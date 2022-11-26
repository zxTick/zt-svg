import type { Engine } from './main'
import type { LifeCycler, LifeCyclesType, ShapeLifeCycler } from './types/lifecycles'

export class LifeCycles {
  public lifeCycler: LifeCycler = {}
  public shapeLifeCycler: ShapeLifeCycler = {}

  constructor(public svg: Engine) {

  }

  addLifeCycle(name: string, lifeCycle: LifeCyclesType) {
    this.shapeLifeCycler[name] = lifeCycle
    this.mergeLifeCycler(this.lifeCycler, lifeCycle)
  }

  mergeLifeCycler(lifeCycler: LifeCycler, lifeCycle: LifeCyclesType) {
    Object.keys(lifeCycle).forEach((key) => {
      const _key = key as keyof LifeCyclesType
      const _val = lifeCycle[_key]
      if (!_val)
        return
      const _mergeVal = Array.isArray(_val) ? _val : [_val]
      if (!_mergeVal)
        return

      if (!lifeCycler[_key])
        lifeCycler[_key] = []

      if (lifeCycler[_key])
        lifeCycler[_key] = [...lifeCycler[_key]!, ..._mergeVal]

      else
        lifeCycler[_key] = [..._mergeVal]
    })
  }

  triggerLifeCycleAll(key: keyof LifeCyclesType) {
    const lifeCycler = this.lifeCycler[key]
    if (!lifeCycler)
      return

    lifeCycler.forEach((lifeCycle) => {
      lifeCycle()
    })
  }

  triggerLifeCycleShape(key: keyof LifeCyclesType, name: string) {
    const lifeCycler = this.shapeLifeCycler[name]
    if (!lifeCycler)
      return

    const lifeCycle = lifeCycler[key]
    if (!lifeCycle)
      return

    if (Array.isArray(lifeCycle)) {
      lifeCycle.forEach((lifeCycle) => {
        lifeCycle()
      })
    }
    else {
      lifeCycle()
    }
  }
}
