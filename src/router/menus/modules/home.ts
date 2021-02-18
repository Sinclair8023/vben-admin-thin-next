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
      name: 'house',
    },
  },
];
export default menu;
