import type { LifeCyclesType } from './lifecycles'

export type ShapeType = 'rect' | 'circle' | 'ellipse' | 'line' | 'text' | 'null'

export type ShapePosition = Record<string, Position>

export interface Position {
  x: number
  y: number
}

export interface BaseShapeOptions<I extends object> extends Partial<wh> {
  name?: string
  type?: ShapeType
  zIndex?: number
  injectionInfo?: I
}

export interface wh {
  width: number
  height: number
}

export interface SvgOptions {
  fill?: string
  stroke?: string
  strokeWidth?: string
  strokeDasharray?: string
  strokeLinecap?: string
  strokeLinejoin?: string
  strokeMiterlimit?: string
  strokeOpacity?: string
  fillOpacity?: string
  opacity?: string
}

export type BaseRectOptions<I extends object> = BaseShapeOptions<I> & Position & wh & LifeCyclesType

export interface RectOptions<I extends object> extends BaseRectOptions<I> {
  attr?: SvgOptions
}

