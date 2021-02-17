import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { getParentLayout } from '/@/router/constant';

const menu: MenuModule = {
  orderNo: 19,
  menu: {
    name: t('routes.demo.feat.feat'),
    path: '/feat',
    tag: {
      dot: true,
    },
    children: [
      {
        path: '',
        name: 'context',
        components: getParentLayout('Excel'),
        meta: {
          // icon: 'mdi:microsoft-excel',
          title: t('routes.demo.excel.excel'),
        },
        children: [
          {
            path: 'context-menu',
            name: '图片',
          },
        ]
      },

    ],
  },
};
export default menu;
