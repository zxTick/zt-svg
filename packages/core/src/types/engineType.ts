import type { EventName } from './events'

export interface EngineOptions {
  name?: string
  events?: EventName[]
  lifeCycles?: string[]
  target?: SVGAElement | string
  triggerEvent?: (...args: any[]) => void
  baseEvents?: EventName[]
}

export enum BaseType {
  SVG = 'svg',
  SHAPE = 'shape',
}
