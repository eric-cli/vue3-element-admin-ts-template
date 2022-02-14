<template>
  <a :class="className" class="link--mallki" href="#">
    {{ text }}
    <span :data-letters="text" />
    <span :data-letters="text" />
  </a>
</template>

<script lang="ts" setup>
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "vue-element-admin-ts",
  },
});
</script>

<style lang="scss">
/* Mallki */

.link--mallki {
  font-weight: 800;
  color: #4dd9d5;
  font-family: "Dosis", sans-serif;
  transition: color 0.5s 0.25s;
  overflow: hidden;
  position: relative;
  display: inline-block;
  line-height: 1;
  outline: none;
  text-decoration: none;

  &:hover {
    transition: none;
    color: transparent;

    span::before {
      transition-delay: 0.3s;
      transform: translate3d(0, 0, 0);
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }

  &::before {
    content: "";
    width: 100%;
    height: 6px;
    margin: -3px 0 0 0;
    background: #3888fa;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }

  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }

  span {
    position: absolute;
    height: 50%;
    width: 100%;
    left: 0;
    top: 0;
    overflow: hidden;

    &::before {
      content: attr(data-letters);
      color: red;
      position: absolute;
      left: 0;
      width: 100%;
      color: #3888fa;
      transition: transform 0.5s;
    }

    &:nth-child(2) {
      top: 50%;
      &::before {
        bottom: 0;
        transform: translate3d(0, -100%, 0);
      }
    }
    &:first-child::before {
      top: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>
