import { Engine } from '../src/main'

describe('Engine', () => {
  it('init Engine basic attr', () => {
    const newEngine = new Engine({
      name: 'newEngine',
      events: ['click', 'dbClick'],
      lifeCycles: ['init', 'destroy'],
    })
    expect(newEngine.name).toBe('newEngine')
    expect(newEngine.events).toEqual(['click', 'dbClick'])
    expect(newEngine.lifeCycles).toEqual(['init', 'destroy'])
    expect(newEngine.figures.size).toBe(0)
  })
})
