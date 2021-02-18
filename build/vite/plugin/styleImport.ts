/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';
export function configStyleImportPlugin() {
  const stylePlugin = styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        resolveStyle: (name) => {
          // locales 文件没有css文件,为了避免报错替换为加载el-menu-item
          const styleName = name === 'locale' ? 'el-menu-item' : name
          return `element-plus/lib/theme-chalk/${styleName}.css`;
        },
      },
    ],
  });
  return stylePlugin;
}
