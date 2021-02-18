<template>
  <el-dialog
    :title="t('layout.header.lockScreen')"
    :model-value="show"
    width="30%"
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
        ref="lockForm"
        :model="formRef"
      >
        <el-form-item
          prop="password"
          required
          :label="t('layout.header.lockScreenPassword')"
        >
          <el-input
            show-Password
            v-model="formRef.password"
          />
        </el-form-item>
      </el-form>

      <div :class="`${prefixCls}__footer`">
        <el-button
          type="primary"
          @click="handleLock"
        >
          {{ t('layout.header.lockScreenBtn') }}
        </el-button>
      </div>
    </div>
  </el-dialog>

</template>
<script lang="ts">
import { defineComponent, computed, ref, unref, reactive } from 'vue';
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
    const lockForm = ref(null);
    const formRef = reactive({ password: '' });
    const getRealName = computed(() => {
      return userStore.getUserInfoState?.realName;
    });
    function handleClose(done) {
      done();
      emit('update:show', false);
    }
    async function handleLock() {
      await unref(lockForm)!.validate();
      lockStore.commitLockInfoState({
        isLock: true,
        pwd: formRef.password,
      });
      unref(lockForm)!.resetFields();
      handleClose();
    }
    return {
      t,
      prefixCls,
      getRealName,
      handleLock,
      headerImg,
      lockForm,
      formRef,
      handleClose,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-header-lock-modal';

.@{prefix-cls} {
  &__entry {
    position: relative;
    height: 280px;
    padding: 130px 30px 60px 30px;
    background: #fff;
    border-radius: 10px;
    margin-top: -30px;
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
    .el-button {
      width: 100%;
    }
  }
}
</style>
