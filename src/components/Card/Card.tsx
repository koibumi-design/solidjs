import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import styles from './card.module.scss';

interface CardProps extends JSX.BaseHTMLAttributes<HTMLDivElement> {
    darkMode?: boolean;
    variant?: 'glass' | 'lightGlass' | 'quartz';
    shadow?: boolean;
    borderless?: boolean;
}

export const Card: Component<CardProps> = (props) => {
    props = mergeProps(
        {
            darkMode: true,
            variant: 'quartz' as CardProps['variant'],
            shadow: true,
            borderless: false,
        },
        props,
    );
    const [local, rest] = splitProps(props, [
        'darkMode',
        'variant',
        'shadow',
        'borderless',
        'children',
    ]);
    return (
        <div
            classList={{
                [styles.card]: true,
                [styles['dark-mode']]: local.darkMode,
                [styles.glass]: local.variant === 'glass',
                [styles['light-glass']]: local.variant === 'lightGlass',
                [styles['no-shadow']]: !local.shadow,
                [styles.borderless]: local.borderless,
            }}
            {...rest}
        >
            {local.children}
        </div>
    );
};
