<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="form" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar ' + form.status">
        <CommentDropdown v-model="form.comment_disabled" />
        <PlatformDropdown v-model="form.platforms" />
        <SourceUrlDropdown v-model="form.source_uri" />
        <el-button
          v-loading="loading"
          style="margin-left: 10px"
          type="success"
          @click="submitForm(postForm)"
        >
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm"> Draft </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput v-model="form.title" :maxlength="100" name="name" required> Title </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select
                      v-model="form.author"
                      :remote-method="getRemoteUserList"
                      filterable
                      default-first-option
                      remote
                      placeholder="Search user"
                    >
                      <el-option
                        v-for="(item, index) in userListOptions"
                        :key="item + index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label-width="120px"
                    label="Publish Time:"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="displayTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="Select date and time"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="90px"
                    label="Importance:"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="form.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display: inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px" label-width="70px" label="Summary:">
          <el-input
            v-model="form.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span v-show="contentShortLength" class="word-counter"
            >{{ contentShortLength }}words</span
          >
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="form.content" :height="400" />
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px">
          <Upload v-model="form.image_uri" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  // TODO
  import type { ElForm } from "element-plus"
  import { fetchArticle } from "@/apis/article"
  import { searchUser } from "@/apis/remote-search"
  import { validURL } from "@/utils/validate"
  import useTagsViewStore from "@/stores/tagsView"

  type FormInstance = InstanceType<typeof ElForm>
  const postForm = ref<FormInstance>()
  const tagsViewStore = useTagsViewStore()
  const defaultForm = {
    status: "draft",
    title: "", // 文章题目
    content: "", // 文章内容
    content_short: "", // 文章摘要
    source_uri: "", // 文章外链
    image_uri: "", // 文章图片
    display_time: new Date(), // 前台展示时间
    id: undefined,
    platforms: ["a-platform"],
    comment_disabled: false,
    importance: 0
  }

  const prop = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  })

  const form: any = ref({ ...defaultForm })
  const loading: any = ref(false)
  const userListOptions = ref([])
  const validateRequire = (rule, value, callback) => {
    if (value === "") {
      ElMessage({
        message: `${rule.field}为必传项`,
        type: "error"
      })
      callback(new Error(`${rule.field}为必传项`))
    } else {
      callback()
    }
  }
  const validateSourceUri = (rule, value, callback) => {
    if (value) {
      if (validURL(value)) {
        callback()
      } else {
        ElMessage({
          message: "外链url填写不正确",
          type: "error"
        })
        callback(new Error("外链url填写不正确"))
      }
    } else {
      callback()
    }
  }
  const rules = ref({
    image_uri: [{ validator: validateRequire }],
    title: [{ validator: validateRequire }],
    content: [{ validator: validateRequire }],
    source_uri: [{ validator: validateSourceUri, trigger: "blur" }]
  })
  const tempRoute = ref({})
  const contentShortLength = computed(() => {
    return form.value.content_short.length
  })
  const displayTime = computed({
    // set and get is useful when the data
    // returned by the back end api is different from the front end
    // back end return => "2013-06-25 06:59:25"
    // front end need timestamp => 1372114765000
    get() {
      return +new Date(form.value.display_time)
    },
    set(val: any) {
      form.value.display_time = new Date(val)
    }
  })
  const fetchData = (id) => {
    fetchArticle(id)
      .then((response) => {
        form.value = response.data

        // just for test
        form.value.title += `   Article Id:${form.value.id}`
        form.value.content_short += `   Article Id:${form.value.id}`

        // set tagsview title
        // this.setTagsViewTitle();

        // set page title
        // this.setPageTitle();
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const draftForm = () => {
    if (form.value.content.length === 0 || form.value.title.length === 0) {
      ElMessage({
        message: "请填写必要的标题和内容",
        type: "warning"
      })
      return
    }
    ElMessage({
      message: "保存成功",
      type: "success",
      showClose: true,
      duration: 1000
    })
    form.value.status = "draft"
  }
  const getRemoteUserList = (query) => {
    searchUser(query).then((response) => {
      if (!response.data.items) return
      userListOptions.value = response.data.items.map((v) => v.name)
    })
  }
  const setTagsViewTitle = () => {
    const title = "Edit Article"
    const route: any = { ...tempRoute.value, title: `${title}-${form.value.id}` }
    tagsViewStore.updateVisitedView(route)
  }
  const setPageTitle = () => {
    const title = "Edit Article"
    useTitle(`${title} - ${form.value.id}`)
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true
        ElNotification({
          title: "成功",
          message: "发布文章成功",
          type: "success",
          duration: 2000
        })
        form.value.status = "published"
        loading.value = false
        return true
      }
      console.log("error submit!")
      return false
    })
  }
  onMounted(() => {
    const route = useRoute()
    if (prop.isEdit) {
      const id = route.params && route.params.id
      fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    tempRoute.value = { ...route }
  })
</script>

<style lang="scss" scoped>
  // @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        // @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea ::v-deep {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
