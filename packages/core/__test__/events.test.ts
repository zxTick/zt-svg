import { Engine } from '../src/main'
import { Rect } from '../src/shapes/rect'

describe('events', () => {
  it('add event', () => {
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
      events: ['click', 'dblclick'],
    })
    newEngine.add(r1)

    expect(newEngine.shapeEvent.evener.size).toBe(2)
    expect(newEngine.shapeEvent.evener.has('click')).toBe(true)
    expect(newEngine.shapeEvent.evener.has('dblclick')).toBe(true)
  })
})
