import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule[] = [
  {
    orderNo: 0,
    menu: {
      path: '/home/welcome',
      name: t('routes.dashboard.welcome'),
    },
  },
  {
    orderNo: 1,
    menu: {
      path: '/home/house',
      name: 'house123',
    },
  },
  {
    orderNo: 19,
    menu: {
      name: t('routes.demo.feat.feat'),
      path: '/feat',
      tag: {
        dot: true,
      },
      children: [
        {
          path: 'context-menu',
          name: t('routes.demo.feat.contextMenu'),
        },
        {
          path: 'context-menu',
          name: t('routes.demo.feat.contextMenu'),
        },
      ],
    },
  }
];
export default menu;
