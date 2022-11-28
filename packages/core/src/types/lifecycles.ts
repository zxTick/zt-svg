import type { Shape } from './shape'

export type LifeCyclesFn = (...args: any[]) => void

export type OnBeforeRender = LifeCyclesFn & LifeCyclesPrivate
export type OnRender = LifeCyclesFn & LifeCyclesPrivate
export type OnUpdate = LifeCyclesFn & LifeCyclesPrivate
export type OnDestruction = LifeCyclesFn & LifeCyclesPrivate
export type OnZIndexChange = LifeCyclesFn & LifeCyclesPrivate

export interface LifeCyclesPrivate {
  _shape?: Shape
}

export interface LifeCyclesType {
  onBeforeRender?: OnBeforeRender
  onRender?: OnRender
  onUpdate?: OnUpdate
  onDestruction?: OnDestruction
  onZIndexChange?: OnZIndexChange
}

export interface LifeCycler {
  onBeforeRender?: OnBeforeRender[]
  onRender?: OnRender[]
  onUpdate?: OnUpdate[]
  onDestruction?: OnDestruction[]
  onZIndexChange?: OnZIndexChange[]
}

export type ShapeLifeCycler = Record<string, LifeCyclesType>
