<template>
  <div class="ticket-table-container">
    <B24Table
      v-if="!loading && !error"
      :columns="columns"
      :data="tickets"
    >
      <template #cell-name="{ row }">
        <a
          :href="`https://ccs.ru/ticket?id=${row.id}`"
          target="_blank"
          class="ticket-link"
        >
          {{ row.name }}
        </a>
      </template>
    </B24Table>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
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

const columns = [
  {
    key: 'id',
    label: 'ID',
    width: '100px'
  },
  {
    key: 'name',
    label: 'Name',
    width: 'auto'
  }
]

const fetchTickets = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch('https://esb.ccs.ru/getids')

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

<style scoped>
.ticket-table-container {
  padding: 20px;
}

.ticket-link {
  color: #2fc6f6;
  text-decoration: none;
  cursor: pointer;
}

.ticket-link:hover {
  text-decoration: underline;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error {
  padding: 20px;
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  border-radius: 4px;
  margin: 20px;
}
</style>
