import styles from './divider.module.scss';
import { Component, mergeProps } from 'solid-js';

interface DividerProps {
    direction?: 'horizontal' | 'vertical';
    minWidth?: string;
}

export const Divider: Component<DividerProps> = (props) => {
    props = mergeProps({ direction: 'horizontal' as DividerProps['direction'] }, props);
    function getRealMinWidth(direction: DividerProps['direction'], minWidth: DividerProps['minWidth']) {
        if (direction === 'horizontal') {
            return { ['min-width']: minWidth };
        } else {
            return { ['min-height']: minWidth ?? '0' };
        }
    }
    return <hr
        classList={{
        [styles.divider]: true,
        [styles.horizontal]: props.direction === 'horizontal',
        [styles.vertical]: props.direction === 'vertical',
    }}
        style={getRealMinWidth(props.direction, props.minWidth)}
    />;
}