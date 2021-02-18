<template>
  <el-table
    :data="errorList"
    border
    style="width: 100%"
  >
    <el-table-column
      fixed
      prop="type"
      :label="t('sys.errorLog.tableColumnType')"
      width="80"
    >
      <template #default="scope">
        <el-tag>{{scope.row.type}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="url"
      label="URL"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="time"
      :label="t('sys.errorLog.tableColumnDate')"
      width="160"
    >
    </el-table-column>
    <el-table-column
      prop="file"
      :label="t('sys.errorLog.tableColumnFile')"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="message"
      :label="t('sys.errorLog.tableColumnMsg')"
      width="300"
    >
    </el-table-column>
    <el-table-column
      prop="stack"
      :label="t('sys.errorLog.tableColumnStackMsg')"
      width="300"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useI18n } from '/@/hooks/web/useI18n';

import { errorStore, ErrorInfo } from '/@/store/modules/error';

export default defineComponent({
  name: 'ErrorHandler',
  setup() {
    const { t } = useI18n();

    const errorList = errorStore.getErrorInfoState;

    return {
      errorList,
      t,
    };
  },
});
</script>
