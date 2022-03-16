<template>
  <div ref="el" :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue"
  import { scrollTo } from "@/utils/scroll-to"
  // const el = ref<HTMLElement | null>(null);
  const props = defineProps({
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(["update:limit", "pagination", "update:page"])
  const pageSize: any = computed({
    get() {
      return props.limit
    },
    set(val) {
      console.log(val)

      emit("update:limit", val)
    }
  })
  const currentPage: any = computed({
    get() {
      return props.page
    },
    set(val) {
      emit("update:page", val)
    }
  })
  const handleSizeChange = (val) => {
    emit("update:page", 1)
    emit("pagination", { page: currentPage, limit: val })
    if (props.autoScroll) {
      scrollTo(0, 800)
    }
  }
  const handleCurrentChange = (val) => {
    emit("pagination", { page: val, limit: pageSize })
    if (props.autoScroll) {
      scrollTo(0, 800)
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>
