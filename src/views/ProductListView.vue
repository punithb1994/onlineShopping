<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const categories = ref<any[]>([])
const isLoading = ref(true)

// Load products data from public folder
onMounted(async () => {
  try {
    // Use BASE_URL from vite config (./ for relative paths)
   const jsonPath = `${import.meta.env.BASE_URL}products.json`
    
    const response = await fetch(jsonPath)
    if (response.ok) {
      categories.value = await response.json()
    } else {
      console.error('Failed to fetch products.json:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Failed to load products data:', error)
  } finally {
    isLoading.value = false
  }
})

function goToDetail(productId: string) {
  router.push(`/products/${productId}`)
}
</script>

<template>
  <div class="product-list-page container">
    <div v-if="isLoading" class="loading">Loading products...</div>
    <div v-else-if="categories.length === 0" class="error">No products found. Please check the console for errors.</div>
    <div v-else>
      <div v-for="category in categories" :key="category.id" class="category-section">
        <h2 class="category-title">{{ category.title }}</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in category.products"
            :key="product.id"
            :product="product"
            @click="goToDetail(product.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list-page {
  padding: 2rem 20px;
}

.category-section {
  margin-bottom: 4rem;
}

.category-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  border-bottom: 2px solid var(--color-primary);
  display: inline-block;
  padding-bottom: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
</style>
