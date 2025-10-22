<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Ticket {
  id: number
  name: string
}

const config = useRuntimeConfig()
const tickets = ref<Ticket[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchTickets = async () => {
  try {
    loading.value = true
    error.value = null

    const apiUrl = config.public.apiTicketsUrl
    if (!apiUrl) {
      throw new Error('API URL is not configured')
    }

    const response = await fetch(apiUrl)

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

    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <B24TableWrapper v-if="!loading && !error" bordered zebra row-hover class="flex-1">
      <table class="w-full">
        <thead>
          <tr>
            <th class="w-24 p-3 text-left font-semibold">ID</th>
            <th class="p-3 text-left font-semibold">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td class="p-3">{{ ticket.id }}</td>
            <td class="p-3">
              <B24Link
                :href="`https://tp.point.online/tickets?id=${ticket.id}`"
                target="_blank"
              >
                {{ ticket.name }}
              </B24Link>
            </td>
          </tr>
        </tbody>
      </table>
    </B24TableWrapper>
  </div>
</template>
