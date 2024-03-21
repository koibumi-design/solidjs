import { Component, mergeProps, splitProps } from 'solid-js';
import styles from './spinner.module.scss';

interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'normal';
    darkMode?: boolean;
}

export const Spinner: Component<SpinnerProps> = (props: SpinnerProps) => {
    props = mergeProps(
        {
            size: 'medium' as SpinnerProps['size'],
            color: 'normal' as SpinnerProps['color'],
        },
        props,
    );
    const [style] = splitProps(props, ['size', 'color', 'darkMode']);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 231 231"
            classList={{
                [styles.spinner]: true,
                [styles.sm]: style.size === 'small',
                [styles.md]: style.size === 'medium',
                [styles.lg]: style.size === 'large',
                [styles['color-primary']]: style.color === 'primary',
                [styles['color-normal']]: style.color === 'normal',
                [styles['dark-mode']]: style.darkMode,
            }}
        >
            <path
                fill="currentColor"
                d="M224.78,79.41,183,207.91H47.92L6.17,79.41,115.47,0ZM115.47,26.17,31.05,87.5,63.3,186.74H167.65L199.89,87.5Z"
            ></path>
        </svg>
    );
};
