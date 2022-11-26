import type { Engine } from '../main'
import type { RectOptions } from '../types/shape'
import { BaseShape } from './base'

export class Rect<I extends object = {}> extends BaseShape<I> {
  public dom!: HTMLElement

  constructor(public options: RectOptions<I>) {
    super(options)
    this.initShapePosition(options)
  }

  initShapePosition(options: RectOptions<I>): void {
    const { width, height, x, y } = options
    this.shapePosition = {
      topLeft: { x, y },
      topRight: { x: x + width, y },
      bottomLeft: { x, y: y + height },
      bottomRight: { x: x + width, y: y + height },
      topCenter: { x: x + width / 2, y },
      bottomCenter: { x: x + width / 2, y: y + height },
      leftCenter: { x, y: y + height / 2 },
      rightCenter: { x: x + width, y: y + height / 2 },
    }
  }

  render(svg: Engine): void {
    if (!this.dom) {
      const rectDom = document.createElement('rect')
      this.dom = rectDom
    }

    const { width, height } = this.shapePosition
    const { attr } = this.options
    const { dom } = this
    const info = {
      width,
      height,
      ...attr,
    }
    Object.keys(info).forEach((key) => {
      key = key as keyof typeof info
      const val = info[key as keyof typeof info]
      if (val)
        dom.setAttribute(key, val.toString())
    })
    svg.dom.appendChild(dom)
  }
}

