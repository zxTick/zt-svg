import type { EventName } from './events'

export interface EngineOptions {
  name?: string
  events?: string[]
  lifeCycles?: string[]
  target?: SVGAElement | string
  triggerEvent?: (...args: any[]) => void
  baseEvents?: EventName[]
}
