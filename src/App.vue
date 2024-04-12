<script setup lang="ts">
</script>

<template>
  <el-container>
    <el-header>
      <div class="logo">
        LOGO
        <!-- <img src="./logo.png" alt="Logo"> -->
      </div>
      <div class="right-section">
        <el-icon>
          <Sunny v-if="theme === 'light'" />
          <Moon v-else />
        </el-icon>
      </div>
    </el-header>
    <el-main>
      <!-- Content goes here -->
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: #f0f0f0;
}

.logo img {
  width: 100px;
  height: auto;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-section > * {
  margin-left: 10px;
}

.el-main {
  flex-grow: 1;
}
</style>
