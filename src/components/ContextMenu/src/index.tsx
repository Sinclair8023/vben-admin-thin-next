import './index.less';

import type { ContextMenuItem, ItemContentProps } from './types';
import type { FunctionalComponent, CSSProperties } from 'vue';

import { defineComponent, nextTick, onMounted, computed, ref, unref, onUnmounted } from 'vue';

import Icon from '/@/components/Icon';
import { Menu, Divider } from 'ant-design-vue';
import { ElMenu, ElMenuItem, ElSubmenu, ElMenuItemGroup } from 'element-plus'
import { contextMenuProps } from './props';

const prefixCls = 'context-menu';

const ItemContent: FunctionalComponent<ItemContentProps> = (props) => {
  const { item } = props;
  return (
    <span style="display: inline-block; width: 100%;" onClick={props.handler.bind(null, item)}>
      {props.showIcon && item.icon && <Icon class="mr-2" icon={item.icon} />}
      <span>{item.label}</span>
    </span>
  );
};

export default defineComponent({
  name: 'ContextMenu',
  props: contextMenuProps,
  setup(props) {
    const wrapRef = ref<ElRef>(null);
    const showRef = ref(false);

    const getStyle = computed(
      (): CSSProperties => {
        const { axis, items, styles, width } = props;
        const { x, y } = axis || { x: 0, y: 0 };
        const menuHeight = (items || []).length * 40;
        const menuWidth = width;
        const body = document.body;

        const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
        const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
        return {
          ...styles,
          width: `${width}px`,
          left: `${left + 1}px`,
          top: `${top + 1}px`,
        };
      }
    );

    onMounted(() => {
      nextTick(() => (showRef.value = true));
    });

    onUnmounted(() => {
      const el = unref(wrapRef);
      el && document.body.removeChild(el);
    });

    function handleAction(item: ContextMenuItem, e: MouseEvent) {
      const { handler, disabled } = item;
      if (disabled) return;
      showRef.value = false;

      e?.stopPropagation();
      e?.preventDefault();
      handler?.();
    }

    function renderMenuItem(items: ContextMenuItem[]) {
      return items.map((item) => {
        const { disabled, label, children, divider = false } = item;

        const DividerComp = divider ? <Divider key={`d-${label}`} /> : null;
        if (!children || children.length === 0) {
          return (
            <>
              <ElMenuItem disabled={disabled} class={`${prefixCls}__item`} key={label}>
                <ItemContent showIcon={props.showIcon} item={item} handler={handleAction} />
              </ElMenuItem>
              {DividerComp}
            </>
          );
        }
        if (!unref(showRef)) return null;

        return (
          <ElSubmenu
            key={label}
            index={label}
            disabled={disabled}
            popupClassName={`${prefixCls}__popup`}
            title={<ItemContent showIcon={props.showIcon} item={item} handler={handleAction} />}
          >
            <ElMenuItemGroup>
              {renderMenuItem(children)}
            </ElMenuItemGroup>
          </ElSubmenu>
        );
      });
    }
    return () => {
      const { items } = props;
      if (!unref(showRef)) return null;
      return (
        <ElMenu
          mode="vertical"
          class={prefixCls}
          ref={wrapRef}
          style={unref(getStyle)}
          collapse
        >
          {renderMenuItem(items)}
        </ElMenu>
      );
    };
  },
});
