<script lang="tsx">
import { defineComponent, ref, unref } from 'vue';
import { ElTooltip } from 'element-plus';
import AppSearchModal from './AppSearchModal.vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: 'AppSearch',
  components: {
    AppSearchModal,
    ElTooltip,
  },
  setup() {
    const showModal = ref(false);
    const { prefixCls } = useDesign('app-search');
    const { getShowSearch } = useHeaderSetting();
    const { t } = useI18n();

    function handleSearch() {
      showModal.value = true;
    }

    function handleClose() {
      showModal.value = false;
    }

    return () => {
      if (!getShowSearch.value) {
        return null;
      }
      return (
        <div class={prefixCls} onClick={handleSearch}>
          <ElTooltip content={t('common.searchText')}>
            <g-icon prefix="ant-design" icon="search-outlined" />
          </ElTooltip>
          <AppSearchModal onClose={handleClose} visible={unref(showModal)} />
        </div>
      );
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-search';

.@{prefix-cls} {
  padding: 2px;
}
</style>
