<template>
  <div class="ticket-table-container">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      Error: {{ error }}
    </div>

    <B24TableWrapper v-if="!loading && !error" bordered zebra row-hover>
      <table>
        <thead>
          <tr>
            <th style="width: 100px">ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>
              <a
                :href="`https://tp.point.online/tickets?id=${ticket.id}`"
                target="_blank"
                class="ticket-link"
              >
                {{ ticket.name }}
              </a>
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

<style scoped>
.ticket-table-container {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  font-weight: 600;
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
