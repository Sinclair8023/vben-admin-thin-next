<template>
  <div class="login">
    <div class="login-mask"></div>
    <div class="login-form-wrap">
      <div class="mx-6 login-form">
        <AppLocalePicker
          v-if="showLocale"
          class="login-form__locale"
        />
        <div class="px-2 py-10 login-form__content">
          <header>
            <img
              :src="logo"
              class="mr-4"
            />
            <h1>{{ title }}</h1>
          </header>

          <el-form
            class="login-form__main"
            :model="formData"
            :rules="formRules"
            ref="formRef"
          >
            <el-form-item name="account">
              <el-input
                size="large"
                v-model="formData.account"
                placeholder="username: yoda"
              />
            </el-form-item>
            <el-form-item name="password">
              <el-input
                size="large"
                show-password
                visibilityToggle
                v-model="formData.password"
                placeholder="password: 123456"
              />
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <!-- No logic, you need to deal with it yourself -->
                  <el-checkbox
                    v-model:checked="autoLogin"
                    size="small"
                  >{{
                    t('sys.login.autoLogin')
                  }}</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :style="{ 'text-align': 'right' }">
                  <!-- No logic, you need to deal with it yourself -->
                  <el-button
                    type="link"
                    size="small"
                  >
                    {{ t('sys.login.forgetPassword') }}
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                class="rounded-sm"
                :block="true"
                @click="login"
                :loading="formState.loading"
              >
                {{ t('sys.login.loginButton') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref, toRaw } from 'vue';
import { AppLocalePicker } from '/@/components/Application';

import { userStore } from '/@/store/modules/user';

import { useMessage } from '/@/hooks/web/useMessage';
import { useGlobSetting, useProjectSetting } from '/@/hooks/setting';
import logo from '/@/assets/images/logo.png';
import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  components: {
    AppLocalePicker,
  },
  setup() {
    const formRef = ref<any>(null);
    const autoLoginRef = ref(false);

    const globSetting = useGlobSetting();
    const { locale } = useProjectSetting();
    const { notification } = useMessage();
    const { t } = useI18n();

    const formData = reactive({
      account: 'yoda',
      password: '123456',
    });

    const formState = reactive({
      loading: false,
    });

    const formRules = reactive({
      account: [{ required: true, message: t('sys.login.accountPlaceholder'), trigger: 'blur' }],
      password: [{ required: true, message: t('sys.login.passwordPlaceholder'), trigger: 'blur' }],
    });

    async function handleLogin() {
      const form = unref(formRef);
      if (!form) return;
      formState.loading = true;
      try {
        const valid = await form.validate();
        if (!valid) {
          return;
        }
        const userInfo = await userStore.login(
          toRaw({
            password: formData.password,
            username: formData.account,
          })
        );
        if (userInfo) {
          notification.success({
            title: t('sys.login.loginSuccessTitle'),
            message: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          });
        }
      } catch (error) {
      } finally {
        formState.loading = false;
      }
    }
    return {
      formRef,
      formData,
      formState,
      formRules,
      login: handleLogin,
      autoLogin: autoLoginRef,
      title: globSetting && globSetting.title,
      logo,
      t,
      showLocale: locale.show,
    };
  },
});
</script>
<style lang="less">
.login-form__locale {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
}

.login {
  position: relative;
  height: 100vh;
  background: url(../../../assets/images/login/login-bg.png) no-repeat;
  background-size: 100% 100%;

  &-mask {
    display: none;
    height: 100%;
    background: url(../../../assets/images/login/login-in.png) no-repeat;
    background-position: 30% 30%;
    background-size: 80% 80%;

    .respond-to(xlarge, { display: block;});
  }

  &-form {
    position: relative;
    bottom: 60px;
    width: 400px;
    background: @white;
    border: 10px solid rgba(255, 255, 255, 0.5);
    border-width: 8px;
    border-radius: 4px;
    background-clip: padding-box;
    .respond-to(xlarge, { margin: 0 120px 0 50px});

    &__main {
      margin: 30px auto 0 auto !important;
    }

    &-wrap {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      width: 100%;
      height: 100%;
      // height: 90%;
      justify-content: center;
      align-items: center;
      .respond-to(xlarge, {
        justify-content: flex-end;
          });
    }

    &__content {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 60px 0 40px 0;
      border: 1px solid #999;
      border-radius: 2px;

      header {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: inline-block;
          width: 48px;
        }

        h1 {
          margin-bottom: 0;
          font-size: 24px;
          text-align: center;
        }
      }

      form {
        width: 80%;
      }
    }
  }
}
</style>
