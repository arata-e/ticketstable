<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, resolveComponent } from 'vue'
import { useRoute } from 'vue-router'

import {
  initializeB24Frame,
  LoggerBrowser,
  B24Frame,
  AuthData,
  EnumCrmEntityTypeId,
  Text,
  type ISODate
} from '@bitrix24/b24jssdk'

interface Ticket {
  id: number
  name: string,
  tags: Array
}

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const B24Badge = resolveComponent('B24Badge')
const $logger = LoggerBrowser.build('CompanyList', import.meta.env?.DEV === true)
let $b24: B24Frame | null = null
let $userid = null
let $data:AuthData | null = null
const config = useRuntimeConfig()
const tickets = ref<Ticket[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const route = useRoute();
const searchQuery = route.query

const columns: TableColumn<Ticket>[] = [
  {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => `${row.getValue('id')}`
    },
    {
      accessorKey: 'name',
      header: 'Описание',
      
      cell: ({ row }) => `${row.getValue('name')}`
    },
    {
      accessorKey: 'createDate',
      header: 'Создан',
      cell: ({ row }) => {
        if (row.getValue('createDate')){
          return new Date(row.getValue('createDate')).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
          })
        } else {
          return ""
        }
      }
    },
    {
      accessorKey: 'scheduledDate',
      header: 'Запланирован',
      cell: ({ row }) => {
        if (row.getValue('scheduledDate')){
          const c = "air-primary"
          const ds = new Date(row.getValue('scheduledDate')).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
          })
          if (row.getValue('closeDate')){
            return ds
          } else {
            return h(B24Badge, { class: 'capitalize',  c}, () => ds)
          }
        } else {
          return ""
        }
      }
    },
    {
      accessorKey: 'closeDate',
      header: 'Закрыт',
      cell: ({ row }) => {
        if (row.getValue('closeDate')){
          const c = "air-primary-success"
          const ds = new Date(row.getValue('closeDate')).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
          })
          return h(B24Badge, { class: 'capitalize',  c}, () => ds)
        } else {
          return ""
        }
      }
    },    
    {
      accessorKey: 'tags',
      header: 'Теги',
      cell: ({ row }) => {
        const tags = row.getValue('tags')
        const tagsArray = Object.keys(tags)
        const unk = tagsArray.map((field) => {
          return {
            fieldName: field,
            message: tags[field]
          }
        })
        return h('div', {}, tagsArray.join())
      }
    }        
]
function onSelect(e: Event, row: TableRow<Ticket>) {
  const href=`${config.public.tpsUrl}/tickets/${row.getValue('id')}?id=${row.getValue('id')}`
  window.open(href, '_blank');
}

function onDblclick(e: Event, row: TableRow<Ticket>) {
  const href=`${config.public.tpsUrl}/tickets/${row.getValue('id')}?id=${row.getValue('id')}`
  window.open(href, '_blank');
}

const getLead = async () => {
    $data = $b24.auth.getAuthData()
    $data['user_id'] = ""
    const placement_info = $b24.placement.options
    try{
      const response = await $b24.callMethod(
            'crm.lead.get',
            {
              id: placement_info["ID"],
            }
          )
      const result = response.getData().result
      $data["user_id"] = result["UF_CRM_1540915509"]
      return result["UF_CRM_1540915509"]
    } catch (err) {
      $logger.error('Error loading lead:', err)
      return "0"
    }
}

const getContact = async () => {
    $data = $b24.auth.getAuthData()
    $data['user_id'] = ""
    const placement_info = $b24.placement.options
    try{
      const response = await $b24.callMethod(
            'crm.contact.get',
            {
              id: placement_info["ID"],
            }
          )
      const result = response.getData().result
      $data["user_id"] = result["UF_CRM_5BD8BAEE6CD2B"]
      return result["UF_CRM_5BD8BAEE6CD2B"]
    } catch (err) {
      $logger.error('Error loading lead:', err)
      return "0"
    }
}

const getDeal = async () => {
    $data = $b24.auth.getAuthData()
    $data['user_id'] = ""
    const placement_info = $b24.placement.options
    try{
      const response = await $b24.callMethod(
            'crm.deal.get',
            {
              id: placement_info["ID"],
            }
          )
      const result = response.getData().result
      $data["user_id"] = result["UF_CRM_660429F37CE46"]
      return result["UF_CRM_660429F37CE46"]
    } catch (err) {
      $logger.error('Error loading lead:', err)
      return "0"
    }
}
const fetchTickets = async () => {
  try {
    loading.value = true
    error.value = null
    $logger.info('Start fetch')
    const apiTicketsUrl = ""
    const apiUrl = config.public.apiTicketsUrl
    if (!apiUrl) {
      throw new Error('API URL is not configured')
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify($data)
    };
    const response = await fetch(apiUrl,requestOptions)

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
    $logger.info('Start End Fetch')
  }
}

onMounted(async () => {
  try {
    $b24 = await initializeB24Frame()
    const entity_f = {
      "lead":getLead,
      "contact":getContact,
      "deal":getDeal
    }
    const e_response = await $b24.callMethod('entity.get')
    const e_result = e_response.getData().result
    $logger.info("entity.get:", e_result)
    $userid = await entity_f[searchQuery.entity]()
    if ($userid != "0"){ fetchTickets() }
  } catch (err){
      $logger.info("Get entity error:", err)
      $userid = 0
  } 
})

onUnmounted(() => {
  $b24?.destroy()
})
</script>

<template>
<div class="p-5">
<B24Table id="datatable" :data="tickets" :columns="columns" class="flex-1" @select="onSelect"/>
</div>
</template>
