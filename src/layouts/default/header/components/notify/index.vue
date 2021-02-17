<template>
  <div :class="prefixCls">
    <el-popover
      title=""
      trigger="click"
      width="300"
      :popper-class="`${prefixCls}__overlay`"
      transition=""
    >
      <template #reference>
        <el-badge
          :value="count"
          is-dot
          type="danger"
          :class="`${prefixCls}__dot`"
        >
          <BellOutlined />
        </el-badge>
      </template>
      <el-tabs>
        <el-tab-pane
          v-for="item in tabListData"
          :key="item.name"
        >
          <template #label>
            {{ item.name }}
            <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
          </template>
          <NoticeList :list="item.list" />
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Badge } from 'ant-design-vue';
import { BellOutlined } from '@ant-design/icons-vue';
import { tabListData } from './data';
import NoticeList from './NoticeList.vue';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
  components: { BellOutlined, Badge, NoticeList },
  setup() {
    const { prefixCls } = useDesign('header-notify');

    let count = 0;

    for (let i = 0; i < tabListData.length; i++) {
      count += tabListData[i].list.length;
    }

    return {
      prefixCls,
      tabListData,
      count,
      numberStyle: {},
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-notify';

.@{prefix-cls} {
  padding-top: 2px;

  &__overlay {
    max-width: 360px;
  }
  .el-badge__content {
    top: 20px;
  }
}
</style>
