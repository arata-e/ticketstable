<template>
  <div class="p-5">
    <div v-if="loading" class="text-center py-5 text-gray-600">
      Loading...
    </div>

    <B24Alert v-if="error" color="error" class="m-5">
      Error: {{ error }}
    </B24Alert>

    <B24TableWrapper v-if="!loading && !error" bordered zebra row-hover>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Ticket {
  id: number
  name: string
}

const tickets = ref<Ticket[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

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
