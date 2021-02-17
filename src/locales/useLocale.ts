/**
 * Multi-language related operations
 */
import type { LocaleType } from '/@/locales/types';
import type { Ref } from 'vue';

import { unref } from 'vue';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';
import { locale } from 'element-plus'
import { i18n } from './setupI18n';

import 'moment/dist/locale/zh-cn';

export function useLocale() {
  const { getLang, getLocale, setLocale: setLocalSetting } = useLocaleSetting();

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  function changeLocale(lang: LocaleType): void {
    console.log(lang)
    if (i18n.mode === 'legacy') {
      i18n.global.locale = lang;
    } else {
      ((i18n.global.locale as unknown) as Ref<string>).value = lang;
    }
    setLocalSetting({ lang });
    // i18n.global.setLocaleMessage(locale, messages);

    switch (lang) {
      // Simplified Chinese
      case 'zh_CN':
        import('dayjs/locale/zh-cn');
        import('element-plus/lib/locale/lang/zh-cn').then((lang) => {
          locale(lang.default)
        });

        break;
      // English
      case 'en':
        import('dayjs/locale/en');
        import('element-plus/lib/locale/lang/en').then((lang) => {
          locale(lang.default)
        });
        break;

      // other
      default:
        break;
    }
  }

  // initialization
  function setLocale() {
    const lang = unref(getLang);
    lang && changeLocale(lang);
  }

  return {
    setLocale,
    getLocale,
    getLang,
    changeLocale,
  };
}
