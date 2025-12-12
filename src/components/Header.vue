<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const currentTime = ref(new Date().toLocaleString())
const intervalId = ref<number | null>(null)

function updateTime() {
  currentTime.value = new Date().toLocaleString()
}

onMounted(() => {
  intervalId.value = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <div class="logo" @click="router.push('/')">
        <h1>Bühler</h1>
      </div>

      <div class="right-section">
        <div class="time">{{ currentTime }}</div>
        <div class="cart-icon" @click="router.push('/checkout')">
          <span class="cart-label">Cart</span>
          <span class="badge" v-if="cartStore.count > 0">{{ cartStore.count }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  margin: 0;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.time {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.cart-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--color-secondary);
  transition: color var(--transition-fast);
}

.cart-icon:hover {
  color: var(--color-primary);
}

.badge {
  background-color: var(--color-danger);
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  min-width: 20px;
  text-align: center;
}
</style>
