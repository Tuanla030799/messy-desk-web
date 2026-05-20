<template>
  <div class="overflow-hidden rounded-[1.25rem] border-2 border-ink bg-white shadow-doodle">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[560px] text-left">
        <thead class="bg-mint">
          <tr>
            <th v-for="column in columns" :key="column.key" class="border-b-2 border-ink px-4 py-3 text-sm font-black uppercase tracking-[0.12em]">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="odd:bg-paper/60">
            <td v-for="column in columns" :key="column.key" class="border-b border-ink/10 px-4 py-3 font-bold text-ink">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :column="column">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Array<{ key: string; label: string }>
  rows: Array<Record<string, unknown>>
}>()
</script>
