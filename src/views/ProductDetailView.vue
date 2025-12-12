<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const productId = route.params.id as string
const productsData = ref<any[]>([])
const isLoading = ref(true)

// Load products data from public folder
onMounted(async () => {
  try {
    // Use BASE_URL from vite config (./ for relative paths)
    const jsonPath = `${import.meta.env.BASE_URL}products.json`
    
    const response = await fetch(jsonPath)
    if (response.ok) {
      productsData.value = await response.json()
    } else {
      console.error('Failed to fetch products.json:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Failed to load products data:', error)
  } finally {
    isLoading.value = false
  }
})

const product = computed(() => {
  for (const category of productsData.value) {
    const found = category.products.find((p: any) => p.id === productId)
    if (found) return found
  }
  return null
})

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div v-if="isLoading" class="container loading">
    <p>Loading product...</p>
  </div>
  <div v-else-if="product" class="product-detail-page container">
    <button class="back-btn" @click="goBack">← Back to Products</button>
    
    <div class="product-layout">
      <div class="image-section">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="info-section">
        <span class="type-badge">{{ product.type }}</span>
        <h1>{{ product.name }}</h1>
        <p class="price">${{ product.price.toLocaleString() }}</p>
        
        <p class="description">{{ product.description }}</p>

        <button class="add-cart-btn" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
  <div v-else class="container not-found">
    <h2>Product not found</h2>
    <button @click="router.push('/')">Go Home</button>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding: 2rem 20px;
}

.back-btn {
  background: none;
  border: 1px solid var(--color-text-light);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--color-text-light);
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  background: white;
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.image-section img {
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.type-badge {
  text-transform: uppercase;
  color: var(--color-text-light);
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
}

.price {
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 2rem;
}

.description {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: var(--color-text-light);
}

.add-cart-btn {
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 12px;
  align-self: flex-start;
  transition: background-color var(--transition-fast);
}

.add-cart-btn:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
