<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="form"
      :rules="loginRules"
      class="login-form"
      autocomplete="off"
      label-position="left"
      size="default"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="form.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="off"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="submitForm"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-row class="form-btns" justify="space-around">
        <el-button :loading="loading" @click.prevent="resetForm(loginFormRef)"
          >Reset</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          @click.prevent="submitForm(loginFormRef)"
          >Login</el-button
        >
      </el-row>

      <div style="position: relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog = true"
        >
          Or connect with
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" v-model="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <SocialSignin />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { validUsername } from "@/utils/validate";
import SocialSignin from "./components/SocialSignin.vue";
import useUserStore from "@/stores/user";
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    // callback(new Error("Please enter the correct user name"));
    callback(new Error("请输入正确的用户名"));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    // callback(new Error("The password can not be less than 6 digits"));
    callback(new Error("密码不能小于6位数字"));
  } else {
    callback();
  }
};
const loginRules = reactive({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }],
});
const passwordType = ref("password");
const form = reactive({
  username: "",
  password: "",
});
let username = ref(null);
let password = ref(null);
let redirect = ref(null);
let otherQuery = ref({});
let capsTooltip = ref(false);
let loading = ref(false);
let showDialog = ref(false);

const checkCapslock = (e) => {
  const { key } = e;
  capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
};

const showPwd = () => {
  if (passwordType.value === "password") {
    passwordType.value = "";
  } else {
    passwordType.value = "password";
  }
  nextTick(() => {
    password.value.focus();
  });
};
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      loading.value = true;
      userStore
        .login(form)
        .then((res) => {
          console.log(res);
          router.push({
            path: "/",
          });
          // router.push({
          //   path: redirect || "/",
          //   query: otherQuery,
          // });
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);

          loading.value = false;
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  console.log(formEl);

  if (!formEl) return;
  formEl.resetFields();
};

watch(
  () => route,
  (route) => {
    console.log(route);
    const query = route.query;
    if (query) {
      redirect.value = query.redirect;
      otherQuery.value = getOtherQuery(query);
    }
  }
);

onMounted(() => {
  if (form.username === "") {
    username.value.focus();
  } else if (form.password === "") {
    password.value.focus();
  }
});
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  height: 100vh;

  .el-input {
    height: 48px;
    width: 85%;

    :deep(input) {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 48px;
      caret-color: $cursor;
      display: block;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .form-btns {
      margin-bottom: 30px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    transform: translate(0, -50%);
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
