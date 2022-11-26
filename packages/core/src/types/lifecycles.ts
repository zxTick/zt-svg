export type OnBeforeRender = () => void
export type OnRender = () => void
export type OnUpdate = () => void
export type OnDestruction = () => void
export type OnZIndexChange = () => void

export interface LifeCyclesType {
  onBeforeRender?: OnBeforeRender | OnBeforeRender[]
  onRender?: OnRender | OnRender[]
  onUpdate?: OnUpdate | OnUpdate[]
  onDestruction?: OnDestruction | OnDestruction[]
  onZIndexChange?: OnZIndexChange | OnZIndexChange[]
}

export interface LifeCycler {
  onBeforeRender?: OnBeforeRender[]
  onRender?: OnRender[]
  onUpdate?: OnUpdate[]
  onDestruction?: OnDestruction[]
  onZIndexChange?: OnZIndexChange[]
}

export type ShapeLifeCycler = Record<string, LifeCyclesType>
