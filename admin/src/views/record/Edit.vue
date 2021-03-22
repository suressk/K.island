<template>
  <div class="edit-record scroller-light">
    <h3 class="primary-title">字里行间，发现创作的乐趣</h3>

    <div class="form-container">
      <div class="form-item">
        <a-input
          type="text"
          placeholder="Title"
          v-model="title"
          allowClear
          style="width: 360px;margin-right: 20px;"
        />

        <a-select placeholder="Tag" v-model:value="tag" allowClear style="width: 250px;">
          <a-select-option
            v-for="tagOption in tagOptions"
            :key="tagOption"
            :value="tagOption"
          >
            {{ tagOption }}
          </a-select-option>
        </a-select>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEditRecord from './useEditRecord'
import { Input, Select } from 'ant-design-vue'

export default defineComponent({
  name: "EditRecord",
  components: {
    AInput :Input,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  setup() {
    return {
      ...useEditRecord()
    }
  }
})
</script>

<style lang="scss">
.edit-record {
  width: 100%;
  height: 100%;
  .primary-title {
    color: var(--primary);
    border-left: 3px solid var(--primary);
    font-size: 18px;
    font-weight: 700;
    padding: 5px 20px;
  }
  .form-container {
    margin: 30px auto 10px;
    .form-item {
      margin: 10px;
    }
  }
}
</style>
