<template>
  <div>
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button
        :loading="loading"
        style="margin-left: 16px"
        size="small"
        type="primary"
        @click="handleUpload"
      >
        Browse
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as XLSX from "xlsx"
  import { isExcel } from "@/utils/validate"

  const excelUploadInput = ref<HTMLDivElement | null>(null)
  const props = defineProps({
    beforeUpload: {
      type: Function,
      default() {
        return () => {}
      }
    },
    onSuccess: {
      type: Function,
      default() {
        return () => {}
      }
    }
  })
  const loading = ref(false)
  const excelData = ref({
    header: null,
    results: null
  })
  const generateData = ({ header, results }) => {
    excelData.value.header = header
    excelData.value.results = results
    if (props.onSuccess) {
      props.onSuccess(excelData.value)
    }
  }

  const handleDragover = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleUpload = () => {
    excelUploadInput.value!.click()
  }
  const getHeaderRow = (sheet) => {
    const headers = []
    const range = XLSX.utils.decode_range(sheet["!ref"])
    let C
    const R = range.s.r
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; C += 1) {
      /* walk every column in the range */
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = `UNKNOWN ${C}` // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }
  const readerData = (rawFile) => {
    loading.value = true
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "array" })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        generateData({ header, results })
        loading.value = false
        resolve(true)
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }
  const upload = (rawFile) => {
    // TODO:
    excelUploadInput.value = null // fix can't select the same excel

    if (!props.beforeUpload) {
      readerData(rawFile)
      return
    }
    const before = props.beforeUpload(rawFile)
    if (before) {
      readerData(rawFile)
    }
  }

  const handleDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (loading.value) return
    const { files } = e.dataTransfer
    if (files.length !== 1) {
      ElMessage.error("Only support uploading one file!")
      return false
    }
    const rawFile = files[0] // only use files[0]

    if (!isExcel(rawFile)) {
      ElMessage.error("Only supports upload .xlsx, .xls, .csv suffix files")
      return false
    }
    upload(rawFile)
    e.stopPropagation()
    e.preventDefault()
  }
  const handleClick = (e) => {
    const { files } = e.target
    const rawFile = files[0] // only use files[0]
    if (!rawFile) return
    upload(rawFile)
  }
</script>

<style lang="scss" scoped>
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>
