export type OnBeforeRender = () => void | (() => void)[]
export type OnRender = () => void | (() => void)[]
export type OnUpdate = () => void | (() => void)[]
export type OnDestruction = () => void | (() => void)[]
export type OnZIndexChange = () => void | (() => void)[]

export interface LifeCyclesType {
  onBeforeRender?: OnBeforeRender
  onRender?: OnRender
  onUpdate?: OnUpdate
  onDestruction?: OnDestruction
  onZIndexChange?: OnZIndexChange
}
