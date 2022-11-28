import { Rect } from '../src'
import { Engine } from '../src/main'

describe('Engine', () => {
  it('init Engine basic attr', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
      events: ['click', 'dbClick'],
      lifeCycles: ['init', 'destroy'],
    })
    expect(newEngine.name).toBe('newEngine')
    expect(newEngine.events).toEqual(['click', 'dbClick'])
    expect(newEngine.lifeCycles).toEqual(['init', 'destroy'])
    expect(newEngine.figures.size).toBe(0)
  })

  it('add shape', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
    })
    newEngine.add(new Rect({
      name: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    }))
    expect(newEngine.figures.size).toBe(1)
    expect(newEngine.figures.has('rect')).toBe(true)
  })

  it('zindex', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
    })

    const r1 = new Rect({
      name: 'rect1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })

    const r2 = new Rect({
      name: 'rect2',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })

    newEngine.add(r1)
    newEngine.add(r2)

    expect(r1.zIndex).toBe(0)
    expect(r2.zIndex).toBe(0)

    expect(newEngine.renderQueue[0].name).toBe('rect1')
    expect(newEngine.renderQueue[1].name).toBe('rect2')

    newEngine.zindex(r1, 7)

    expect(newEngine.renderQueue[0].name).toBe('rect2')
    expect(newEngine.renderQueue[1].name).toBe('rect1')
  })

  it('inject events', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
      baseEvents: ['click', 'dblclick'],
    })

    const r1 = new Rect({
      name: 'rect1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })
    newEngine.add(r1)

    expect(r1.eventSet.has('click')).toEqual(true)
    expect(r1.eventSet.has('dblclick')).toEqual(true)
  })

  it('remove shape', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
    })

    const r1 = new Rect({
      name: 'rect1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })

    newEngine.add(r1)
    newEngine.delete(r1)

    expect(newEngine.figures.size).toBe(0)
    expect(newEngine.figures.has('rect1')).toBe(false)
    expect(newEngine.renderQueue.length).toBe(0)
  })

  it('clearView', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
    })

    const r1 = new Rect({
      name: 'rect1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })

    newEngine.add(r1)
    newEngine.clearView()

    expect(newEngine.figures.size).toBe(1)
    expect(newEngine.figures.has('rect1')).toBe(true)
    expect(newEngine.renderQueue.length).toBe(1)
  })

  it('clear', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      target: document.createElement('svg') as any,
    })

    const r1 = new Rect({
      name: 'rect1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })

    newEngine.add(r1)
    newEngine.clear()

    expect(newEngine.figures.size).toBe(0)
    expect(newEngine.figures.has('rect1')).toBe(false)
    expect(newEngine.renderQueue.length).toBe(0)
  })
})
