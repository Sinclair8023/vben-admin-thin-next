<template>
  <ui :class="prefixCls">
    <li
      class="list-item"
      v-for="item in list"
      :key="item.id"
    >
      <div class="list-item-avatar">
        <el-avatar
          v-if="item.avatar"
          :src="item.avatar"
          class="avatar"
        ></el-avatar>
        <span v-else> {{ item.avatar }}</span>
      </div>
      <div class="list-item-content">
        <div class="list-item-content-title">
          {{ item.title }}
          <div
            class="extra"
            v-if="item.extra"
          >
            <el-tag
              class="tag"
              :type="item.type"
            > {{ item.extra }}</el-tag>
          </div>
        </div>
        <div class="list-item-content-description">
          <div class="description">
            {{ item.description }}
          </div>
          <div class="datetime">
            {{ item.datetime }}
          </div>
        </div>
      </div>
    </li>
  </ui>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ListItem } from './data';
import { useDesign } from '/@/hooks/web/useDesign';
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
  },
  setup() {
    const { prefixCls } = useDesign('header-notify-list');
    return { prefixCls };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-header-notify-list';

.@{prefix-cls} {
  &::-webkit-scrollbar {
    display: none;
  }
  .list-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    &-avatar {
      margin-right: 16px;
    }
    &-content {
      flex: 1 0;
      &-title {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
      }
      &-description {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  &-item {
    padding: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;

    .title {
      margin-bottom: 8px;
      font-weight: normal;

      .extra {
        float: right;
        margin-top: -1.5px;
        margin-right: 0;
        font-weight: normal;

        .tag {
          margin-right: 0;
        }
      }

      .avatar {
        margin-top: 4px;
      }

      .description {
        font-size: 12px;
        line-height: 18px;
      }

      .datetime {
        margin-top: 4px;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>
