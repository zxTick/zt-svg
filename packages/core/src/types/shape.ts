export type ShapeType = 'rect' | 'circle' | 'ellipse' | 'line' | 'text' | 'null'

export type ShapePosition = Record<string, Position>

export interface Position {
  x: number
  y: number
}

export interface BaseShapeOptions<I extends object> {
  name?: string
  type?: ShapeType
  _zIndex?: number
  injectionInfo?: I
}
