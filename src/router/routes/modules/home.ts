import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/welcome',
  meta: {
    icon: 'bx:bx-home',
    title: t('routes.dashboard.welcome'),
  },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: {
        title: t('routes.dashboard.welcome'),
        affix: true,
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'house',
      name: 'house',
      component: () => import('/@/views/dashboard/house/index.vue'),
      meta: {
        title: 'house',
        affix: true,
        icon: 'bx:bx-home',
      },
    },
  ],
};

export default dashboard;
