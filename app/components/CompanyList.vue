<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  initializeB24Frame,
  LoggerBrowser,
  B24Frame,
  EnumCrmEntityTypeId,
  Text,
  type ISODate
} from '@bitrix24/b24jssdk'

interface Company {
  id: number
  title: string
  createdTime: Date
}

const $logger = LoggerBrowser.build('CompanyList', import.meta.env?.DEV === true)
let $b24: B24Frame | null = null

const companies = ref<Company[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    $b24 = await initializeB24Frame()

    const response = await $b24.callBatch({
      CompanyList: {
        method: 'crm.item.list',
        params: {
          entityTypeId: EnumCrmEntityTypeId.company,
          order: { id: 'desc' },
          select: [
            'id',
            'title',
            'createdTime'
          ]
        }
      }
    }, true)

    const data = response.getData()
    const dataList = (data.CompanyList.items || []).map((item: any) => {
      return {
        id: Number(item.id),
        title: item.title,
        createdTime: Text.toDateTime(item.createdTime as ISODate)
      }
    })

    companies.value = dataList
    $logger.info('Companies loaded:', dataList)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load companies'
    $logger.error('Error loading companies:', err)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  $b24?.destroy()
})
</script>

<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">Company List</h1>

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
            <th class="p-3 text-left font-semibold">Title</th>
            <th class="w-48 p-3 text-left font-semibold">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.id">
            <td class="p-3">{{ company.id }}</td>
            <td class="p-3">{{ company.title }}</td>
            <td class="p-3">{{ company.createdTime.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </B24TableWrapper>

    <div v-if="!loading && !error && companies.length === 0" class="text-center py-10 text-gray-500">
      No companies found
    </div>
  </div>
</template>
