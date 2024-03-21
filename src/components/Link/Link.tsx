import styles from './link.module.scss';
import '../../sass/global.scss';
import { Component, JSX, splitProps } from 'solid-js';
import { combineClassList } from '../../utils/combineClassList.ts';

interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
    darkMode?: boolean;
}

export const Link: Component<LinkProps> = (props: LinkProps) => {
    const [local, rest] = splitProps(props, [
        'darkMode',
        'children',
        'class',
        'classList',
    ]);
    return (
        <a
            classList={combineClassList(
                local.class,
                {
                    [styles.link]: true,
                    [styles['dark-mode']]: local.darkMode,
                },
                local.classList,
            )}
            {...rest}
        >
            {local.children}
        </a>
    );
};
