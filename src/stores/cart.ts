import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
    id: string
    name: string
    type: string
    price: number
    image: string
    description?: string
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<Product[]>([])

    const count = computed(() => items.value.length)
    
    const total = computed(() => items.value.reduce((sum, item) => sum + item.price, 0))

    function addToCart(product: Product) {
        items.value.push(product)
    }

    function removeFromCart(productId: string) {
        const index = items.value.findIndex(item => item.id === productId)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    return { items, count, total, addToCart, removeFromCart }
})
