import type { EngineOptions } from './types/engineType'

export class Engine {
  name!: string
  events!: string[]
  lifeCycles!: string[]
  figures!: Map<string, any>
  constructor(options: EngineOptions) {
    this.initBasicAttr(options)
  }

  initBasicAttr(options: EngineOptions) {
    this.name = options.name || ''
    this.events = options.events || []
    this.lifeCycles = options.lifeCycles || []
    this.figures = new Map()
  }
}
