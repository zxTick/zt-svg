import type { EngineOptions } from './types/engineType'

export class Engine {
  name!: string
  events!: string[]
  lifeCycles!: string[]
  figures!: Map<string, any>
  dom!: SVGAElement
  constructor(options: EngineOptions) {
    this.initBasicAttr(options)
    this.initDom(options)
  }

  initBasicAttr(options: EngineOptions) {
    this.name = options.name || ''
    this.events = options.events || []
    this.lifeCycles = options.lifeCycles || []
    this.figures = new Map()
  }

  initDom(options: EngineOptions) {
    const target = options.target
    if (!target)
      throw new Error('target is required')

    if (typeof target === 'string')
      this.dom = document.querySelector(target) as SVGAElement

    else
      this.dom = target
  }
}
