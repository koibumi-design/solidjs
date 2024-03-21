import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import styles from './card.module.scss';
import '../../sass/global.scss';
import { combineClassList } from '../../utils/combineClassList.ts';

interface CardProps extends JSX.BaseHTMLAttributes<HTMLDivElement> {
    darkMode?: boolean;
    variant?: 'glass' | 'lightGlass' | 'quartz';
    shadow?: boolean;
    borderless?: boolean;
}

export const Card: Component<CardProps> = (props) => {
    props = mergeProps(
        {
            darkMode: false,
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
        'class',
        'classList',
    ]);
    return (
        <div
            classList={combineClassList(
                local.class,
                {
                    [styles.card]: true,
                    [styles['dark-mode']]: local.darkMode,
                    [styles.glass]: local.variant === 'glass',
                    [styles['light-glass']]: local.variant === 'lightGlass',
                    [styles['no-shadow']]: !local.shadow,
                    [styles.borderless]: local.borderless,
                },
                local.classList,
            )}
            {...rest}
        >
            {local.children}
        </div>
    );
};
