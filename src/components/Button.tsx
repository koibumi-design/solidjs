import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import styles from './button.module.scss';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The variant of the button
     * @default 'solid'
     */
    variant?: 'solid' | 'light' | 'outline' | 'flat' | 'ghost' | 'glow';
    color?: 'primary';
    darkMode?: boolean;
    disabled?: boolean;
}

export const Button: Component<ButtonProps> = (props: ButtonProps) => {
    props = mergeProps(
        {
            variant: 'solid' as ButtonProps['variant'],
            color: 'primary' as ButtonProps['color'],
        },
        props,
    );
    const [style, children, others] = splitProps(
        props,
        ['variant', 'color', 'darkMode', 'disabled'],
        ['children'],
    );
    const mainClass = () => styles[`button-${style.variant}-${style.color}`];

    return (
        <button
            disabled={style.disabled}
            classList={{
                [mainClass()]: true,
                [styles['button-disabled']]: style.disabled,
                [styles['dark-mode']]: style.darkMode,
            }}
            {...others}
        >
            {children.children}
        </button>
    );
};
