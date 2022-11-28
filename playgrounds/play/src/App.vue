<script lang='ts' setup>
import { onMounted } from 'vue'
import { Engine, Rect as Re } from '@ztsvg/core'

onMounted(() => {
  const engine = new Engine({
    target: document.getElementById('sss') as any,
    baseEvents: ['click'],
    triggerEvent(a, b, c) {
      console.log('[  ] >', { a, b, c })
    },
  })
  const rect = new Re({
    name: '11',
    width: 100,
    height: 100,
    x: 10,
    y: 10,
    attr: {
      fill: 'red',
    },
  })
  const rect2 = new Re({
    name: '22',
    width: 120,
    height: 120,
    x: 20,
    y: 20,
    attr: {
      fill: 'blue',
    },
  })
  engine.add(rect)
  engine.add(rect2)
  engine.render()

  engine.zindex(rect, 9)
})
</script>

<template>
  <div class="">
    <div>
      1
    </div>
    <svg id="sss" width="500" height="500" />
  </div>
</template>

<style lang='scss' scoped>
</style>
