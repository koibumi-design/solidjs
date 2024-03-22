import { Component, For, JSX, mergeProps } from 'solid-js';
import styles from './menu.module.scss';
import '../../../sass/global.scss';

export interface MenuProps {
    items: MenuItem[];
    variant?: 'quartz' | 'glass' | 'lightGlass';
    darkMode?: boolean;
    borderless?: boolean;
}

export interface MenuItem {
    content: string | JSX.Element;
    color?: 'normal' | 'primary';
    onClick?: () => void;
}

export const Menu: Component<MenuProps> = (props) => {
    props = mergeProps({
        variant: 'quartz' as MenuProps['variant'],
        darkMode: false,
        borderless: false,
    }, props);
    return (
        <ul classList={{
            [styles.menu]: true,
            [styles.borderless]: props.borderless,
            [styles.quartz]: props.variant === 'quartz',
            [styles.glass]: props.variant === 'glass',
            [styles['light-glass']]: props.variant === 'lightGlass',
            [styles['dark-mode']]: props.darkMode,
        }}>
            <For each={props.items}>
                {item => {
                    item = mergeProps({
                        color: 'normal' as MenuItem['color'],
                    }, item);
                    return (
                        <li
                            classList={{
                                [styles.item]: true,
                                [styles['primary-color']]: item.color === 'primary',
                                [styles['normal-color']]: item.color === 'normal',
                                [styles['dark-mode']]: props.darkMode,
                            }}
                            onClick={item.onClick}
                        >
                            {item.content}
                        </li>
                    );
                }}
            </For>
        </ul>
    );
};