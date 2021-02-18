import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const feat: AppRouteModule = {
  path: '/feat',
  name: 'FeatDemo',
  component: LAYOUT,
  redirect: '/feat/icon',
  meta: {
    icon: 'ic:outline-featured-play-list',
    title: t('routes.feat.feat'),
  },
  children: [
    {
      path: 'context-menu',
      name: 'ContextMenuDemo',
      component: () => import('/@/views/demo/feat/context-menu.vue'),
      meta: {
        title: t('routes.feat.contextMenu'),
      },
    },
    {
      path: 'error-log',
      name: 'ErrorLog',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.feat.errorLog'),
      },
    },
    {
      path: 'image',
      name: 'image',
      component: () => import('/@/views/demo/feat/image.vue'),
      meta: {
        title: 'image',
      },
    },
  ]
};

export default feat;
