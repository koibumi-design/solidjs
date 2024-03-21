import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import styles from './buttonGroup.module.scss';

interface ButtonGroupProps {
    direction?: 'row' | 'column';
    children: JSX.Element[];
    class: string;
}

export const ButtonGroup: Component<ButtonGroupProps> = (props: ButtonGroupProps) => {
    props = mergeProps({ direction: 'row' as ButtonGroupProps['direction'] }, props);
    const [local, others] = splitProps(props, ['direction', 'children', 'class']);

    return (
        <div
            classList={{
                [styles[local.direction!]]: true,
                [local.class]: true,
                [styles['button-group']]: true,
            }}
            {...others}
        >
            {local.children}
        </div>
    );
};