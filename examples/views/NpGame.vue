<template>
  <el-row class="mb-4">
    <el-button type="primary" plain @click="start">Start Game</el-button>
    <el-button type="warning" @click="suspend">Suspend</el-button>
    <el-button type="danger" plain @click="stop">Stop Game</el-button>
  </el-row>

  <el-slider style="width:100%;" v-model="score" />
  <el-empty v-show="!operate" description="please!! eat me"
      style="width:100%;height:200px"
      image="https://5b0988e595225.cdn.sohucs.com/images/20180614/d066ab5fb71c44d68bd6187775ecbaad.jpeg"
    />
  <div v-show="!!operate" class="game-area" ref="gameArea">
    <div
      class="snake-node"
      v-for="(node, index) in snake"
      :key="index"
      :style="{ left: node.x + 'px', top: node.y + 'px' }"
    ></div>
    <div class="food" :style="{ left: food.x + 'px', top: food.y + 'px' }"></div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  declare let window: any
  interface Node {
    x: number;
    y: number;
  }
  
  export default defineComponent({
    name: 'SnakeGame',
    setup() {
      const gameArea = ref<any>(null)
      const snake = ref<Node[]>([{ x: 0, y: 0 }])
      const food = ref<Node>({ x: 0, y: 0 })
      const direction = ref<Node>({ x: 1, y: 0 })
      const score = ref(0)
      const operate = ref('')
  
      const getRandomPosition = () => {
        const gameWidth = gameArea.value?.clientWidth || 0
        const gameHeight = gameArea.value?.clientHeight || 0
        const x = Math.floor(Math.random() * (gameWidth / 10)) * 10
        const y = Math.floor(Math.random() * (gameHeight / 10)) * 10
        return { x, y }
      }
  
      const moveSnake = () => {
        const head = { x: snake.value[0].x + direction.value.x * 10, y: snake.value[0].y + direction.value.y * 10 }
        snake.value.unshift(head)
        if (head.x === food.value.x && head.y === food.value.y) {
          food.value = getRandomPosition()
          score.value += 10
        } else {
          snake.value.pop()
        }
        if (isGameOver()) {
          clearInterval(intervalId)
          // @ts-ignore
          ElMessage({
            message: 'Game Over!',
            type: 'warning',
          })
        }
      }
  
      const isGameOver = () => {
        const head = snake.value[0]
        return (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= gameArea.value?.clientWidth ||
          head.y >= gameArea.value?.clientHeight ||
          snake.value.slice(1).some((node) => node.x === head.x && node.y === head.y)
        )
      }
  
      let intervalId: any
      const start = () => {
        clearInterval(intervalId)
       

        if( operate.value !== 'suspend' && operate.value !== ''){
          snake.value = [{ x: 0, y: 0 }]
          direction.value = { x: 1, y: 0 }
          score.value = 0
          food.value = getRandomPosition()
        }
        intervalId = setInterval(() => {
          moveSnake()
        }, 100)
        operate.value = 'start'
      }

      const stop = () => {
        operate.value = ''
        snake.value = [{ x: 0, y: 0 }]
        direction.value = { x: 1, y: 0 }
        score.value = 0
        clearInterval(intervalId)
      }

      const suspend = () => {
        operate.value = 'suspend'
        clearInterval(intervalId)
      }

      watchEffect(() => {
        window.addEventListener('keydown', (event: any) => {
          switch (event.key) {
            case 'ArrowLeft':
              if (direction.value.x !== 1) {
                direction.value = { x: -1, y: 0 }
              }
              break
            case 'ArrowRight':
              if (direction.value.x !== -1) {
                direction.value = { x: 1, y: 0 }
              }
              break
            case 'ArrowUp':
              if (direction.value.y !== 1) {
                direction.value = { x: 0, y: -1 }
              }
              break
            case 'ArrowDown':
              if (direction.value.y !== -1) {
                direction.value = { x: 0, y: 1 }
              }
              break
          }
        })
      })
  
      return {
        gameArea,
        snake,
        food,
        score,
        start,
        stop,
        suspend,
        operate
      }
    },
  })
  </script>
  
  <style scoped>
  .game-area {
    width: 100%;
    height: 200px;
    background-color: #eee;
    position: relative;
  }
  
  .snake-node {
    width: 10px;
    height: 10px;
    background-color: #03ac3a;
    position: absolute;
  }
  
  .food {
    width: 10px;
    height: 10px;
    background-color: #f66c6d;
    position: absolute;
    border-radius: 50%;
  }
  
  .score {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  </style>
  