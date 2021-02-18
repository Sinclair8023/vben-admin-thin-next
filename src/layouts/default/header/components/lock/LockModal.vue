<template>
  <el-dialog
    title="提示"
    width="30%"
    :model-value="show"
    :class="prefixCls"
    :before-close="handleClose"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img
          :src="headerImg"
          :class="`${prefixCls}__header-img`"
        />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>
      <el-form
        label-position="top"
        ref="formRef"
      >
        <el-form-item
          prop="password"
          required
        >
          <el-input
            show-Password
            v-model="form.password"
          />
        </el-form-item>
      </el-form>

      <div :class="`${prefixCls}__footer`">
        <el-button
          type="primary"
          class="mt-2"
          @click="handleLock"
        >
        </el-button>
      </div>
    </div>
  </el-dialog>

</template>
<script lang="ts">
import { defineComponent, computed, ref, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useDesign } from '/@/hooks/web/useDesign';

import { userStore } from '/@/store/modules/user';
import { lockStore } from '/@/store/modules/lock';
import headerImg from '/@/assets/images/header.jpg';
import { propTypes } from '/@/utils/propTypes';
export default defineComponent({
  name: 'LockModal',
  props: {
    show: Boolean,
  },
  emits: ['update:show'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const { prefixCls } = useDesign('header-lock-modal');
    const formRef = ref();
    const password = ref<string>('');
    const getRealName = computed(() => {
      return userStore.getUserInfoState?.realName;
    });
    function handleClose(done) {
      emit('update:show', false);
      done?.();
    }
    async function handleLock() {
      await unref(formRef)!.validate();
      lockStore.commitLockInfoState({
        isLock: true,
        pwd: unref(password),
      });
      unref(formRef)!.resetFields();
      handleClose();
    }
    return {
      t,
      prefixCls,
      getRealName,
      handleLock,
      headerImg,
      formRef,
      password,
      handleClose,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-lock-modal';

.@{prefix-cls} {
  &__entry {
    position: relative;
    height: 240px;
    padding: 130px 30px 60px 30px;
    background: #fff;
    border-radius: 10px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }

  &__footer {
    text-align: center;
  }
}
</style>
