import { h } from 'vue'
import { ElMessageBox, ElMessage, ElNotification, ElLoading } from 'element-plus';
import { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
import { useI18n } from './useI18n';
import MessageBox from 'element-plus/lib/el-message-box';
import type { ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type';

export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: String): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';

function renderContent({ message }: Pick<ElMessageBoxOptions, 'message'>) {
  return h(<div innerHTML={`<div>${message as string}</div>`}></div>)
}

const getBaseOptions = () => {
  const { t } = useI18n();
  return {
    confirmButtonText: t('common.okText'),
  };
};

function createModalOptions(options: ElMessageBoxOptions): ElMessageBoxOptions  {
  return {
    ...getBaseOptions(),
    ...options,
    message: renderContent(options),
  };
}

function createSuccessModal(options: ElMessageBoxOptions) {
  return MessageBox(createModalOptions({ ...options, type: 'success'}))
}

function createErrorModal(options: ElMessageBoxOptions) {
  return MessageBox(createModalOptions({ ...options, type: 'error'}))
}

function createInfoModal(options: ElMessageBoxOptions) {
    return MessageBox(createModalOptions({ ...options, type: 'info'}))
}

function createWarningModal(options: ElMessageBoxOptions) {
   return MessageBox(createModalOptions({ ...options, type: 'warning'}))
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: ElMessage,
    notification: ElNotification,
    createConfirm: ElMessageBox,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
    createLoading: ElLoading
  };
}
