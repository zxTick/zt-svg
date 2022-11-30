import type { Shape } from './shape'

export type AnimeParams = Omit<anime.AnimeParams, 'targets'>

export interface animationOptions extends AnimeParams {
  targets: Shape[]
}
