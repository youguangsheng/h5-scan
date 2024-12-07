<template>
  <router-view></router-view>
</template>

<script setup></script>

<style>
* {
  padding: 0;
  margin: 0;
  /* box-sizing: border-box; */
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.upload-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
