<!-- eslint-disable no-console -->
<script lang='ts' setup>
import { onMounted } from 'vue'
import { Engine, Rect as Re } from '@ztsvg/core'
import animejs from 'animejs'
let e: Engine | null = null

const rect = new Re({
  name: '11',
  width: 100,
  height: 100,
  x: 10,
  y: 10,
  zIndex: 10,
  attr: {
    fill: 'red',
  },
})
const rect2 = new Re({
  name: '22',
  width: 100,
  height: 100,
  x: 20,
  y: 20,
  attr: {
    fill: 'blue',
  },
})

onMounted(() => {
  const engine = new Engine({
    target: document.getElementById('sss') as any,
    baseEvents: ['click'],
    triggerEvent(a, b, c) {
      const { x, y } = c.shapePosition.topLeft
      console.log({ x, y })

      animejs({
        targets: c.dom,
        width: 30,
        height: 30,
        x: (x + 70) / 2,
        y: (y + 70) / 2,
        duration: 1000,
      })
    },
  })
  e = engine

  engine.add(rect)
  engine.add(rect2)
  engine.render()
})

function ch() {
  e?.zindex(rect2, 20)
}
</script>

<template>
  <div class="">
    <button @click="ch">
      1
    </button>
    <svg id="sss" width="500" height="500" />
  </div>
</template>

<style lang='scss' scoped>
</style>
