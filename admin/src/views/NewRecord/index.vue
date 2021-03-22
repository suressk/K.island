<template>
  <div class="new-record">
    <h3 class="primary-title">字里行间，发现创作的乐趣</h3>

    <div class="form-container">
      <div class="form-item">
        <el-input type="text" placeholder="Title" v-model="title" clearable />
        <el-select placeholder="Tag" v-model="tag" clearable>
          <el-option
            v-for="tagOption in tagOptions"
            :key="tagOption"
            :value="tagOption"
            :label="tagOption"
          />
        </el-select>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useNewRecord from './useNewRecord'

export default defineComponent({
  name: "NewRecord",
  setup() {
    return {
      ...useNewRecord()
    }
  }
})
</script>

<style lang="scss">
.new-record {
  width: 100%;
  height: 100%;
  .primary-title {
    color: var(--primary);
    border-left: 3px solid var(--primary);
    font-size: 18px;
    font-weight: 700;
    padding: 10px 20px;
  }
  .form-container {
    margin: 10px auto;
  }
}
</style>
