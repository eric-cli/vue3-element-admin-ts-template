<template>
  <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
  Switch roles:
  <el-radio-group v-model="switchRoles">
    <el-radio-button label="editor" />
    <el-radio-button label="admin" />
  </el-radio-group>
</template>

<script setup lang="ts">
  import useUserStore from "@/stores/user"

  const userStore = useUserStore()
  const roles = computed(() => {
    return userStore.roles
  })
  const emit = defineEmits(["change"])
  const switchRoles: any = computed({
    get() {
      return userStore.roles[0]
    },
    set(val) {
      userStore.changeRoles(val).then(() => {
        console.log(val)
        emit("change")
      })
    }
  })
</script>

<style lang="scss" scoped></style>
