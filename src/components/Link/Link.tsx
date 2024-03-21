import styles from './link.module.scss';
import '../../sass/global.scss';
import { Component, JSX, splitProps } from 'solid-js';

interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
    darkMode?: boolean;
}

export const Link: Component<LinkProps> = (props: LinkProps) => {
    const [local, rest] = splitProps(props, ['darkMode', 'children']);
    return (
        <a
            classList={{
                [styles.link]: true,
                [styles['dark-mode']]: local.darkMode,
            }}
            {...rest}
        >
            {local.children}
        </a>
    );
};
