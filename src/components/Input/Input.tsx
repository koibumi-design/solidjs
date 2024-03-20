import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import styles from './input.module.scss';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: 'solid';
    color?: 'normal';
    darkMode?: boolean;
    disabled?: boolean;
}

export const Input: Component<InputProps> = (props: InputProps) => {
    props = mergeProps(
        {
            variant: 'solid' as InputProps['variant'],
            color: 'normal' as InputProps['color'],
        },
        props,
    );
    const [local, others] = splitProps(
        props,
        ['variant', 'color', 'darkMode', 'disabled', 'label', 'placeholder'],
    );
    const mainClass = () => styles[`input-${local.variant}-${local.color}`];
    const labelTextFallback = () => {
        if (local.placeholder == '') {
            return ''
        } else {
            return local.label
        }
    }
    const placeholderTextFallback = () => {
        if (local.placeholder == '') {
            return local.label
        } else {
            return local.placeholder
        }
    }

    return (
        <label
            classList={{
                [mainClass()]: true,
                [styles['dark-mode']]: local.darkMode,
                [styles['fix-margin-top']]: local.label === '' || local.placeholder === '',
            }}
        >
            {labelTextFallback()}
            <input
                disabled={local.disabled}
                placeholder={placeholderTextFallback()}
                {...others}
            />
        </label>
    )
}