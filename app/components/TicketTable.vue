<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Ticket {
  id: number
  name: string
}

const tickets = ref<Ticket[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const tableData = computed(() => {
  return tickets.value.map(ticket => ({
    id: ticket.id.toString(),
    name: ticket.name,
    link: `https://tp.point.online/tickets?id=${ticket.id}`
  }))
})

const fetchTickets = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch('https://esb.ccs.ru/webhook/b32bf8e6-2860-4ad0-b922-ed6302f752c4?login=15500242')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data)) {
      tickets.value = data
    } else {
      tickets.value = [data]
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch tickets'
    console.error('Error fetching tickets:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTickets()
})
</script>

<template>
  <div class="p-5">
    <B24Alert v-if="error" color="error" class="mb-5">
      Error: {{ error }}
    </B24Alert>

    <B24Table
      :loading="loading"
      loading-color="air-primary"
      loading-animation="loading"
      :data="tableData"
      class="flex-1"
    >
      <template #name-data="{ row }">
        <B24Link :href="row.link" target="_blank">
          {{ row.name }}
        </B24Link>
      </template>
    </B24Table>
  </div>
</template>
