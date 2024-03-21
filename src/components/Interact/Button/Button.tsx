import { Component, JSX, Match, mergeProps, splitProps, Switch } from 'solid-js';
import styles from './button.module.scss';
import { combineClassList } from '../../../utils/combineClassList.ts';

interface BaseButtonProps {
    variant?: 'solid' | 'light' | 'outline' | 'flat' | 'ghost' | 'glow';
    color?: 'primary';
    darkMode?: boolean;
    disabled?: boolean;
}

type RealButtonProps = BaseButtonProps & {
    as: 'button' | undefined;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = BaseButtonProps & {
    as: 'link';
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = RealButtonProps | LinkButtonProps;
const RealButton: Component<RealButtonProps> = (props: RealButtonProps) => {
    props = mergeProps(
        {
            variant: 'solid' as ButtonProps['variant'],
            color: 'primary' as ButtonProps['color'],
        },
        props,
    );
    const [style, children, others] = splitProps(
        props,
        ['variant', 'color', 'darkMode', 'disabled', 'class', 'classList'],
        ['children'],
    );
    const mainClass = () => styles[`button-${style.variant}-${style.color}`];

    return (
        <button
            disabled={style.disabled}
            classList={combineClassList(
                style.class,
                {
                    [mainClass()]: true,
                    [styles['button-disabled']]: style.disabled,
                    [styles['dark-mode']]: style.darkMode,
                },
                style.classList,
            )}
            {...others}
        >
            {children.children}
        </button>
    );
};

const LinkButton: Component<LinkButtonProps> = (props: LinkButtonProps) => {
    props = mergeProps(
        {
            variant: 'solid' as ButtonProps['variant'],
            color: 'primary' as ButtonProps['color'],
        },
        props,
    );
    const [style, children, others] = splitProps(
        props,
        ['variant', 'color', 'darkMode', 'disabled', 'class', 'classList'],
        ['children'],
    );
    const mainClass = () => styles[`button-${style.variant}-${style.color}`];

    return (
        <a
            classList={combineClassList(
                style.class,
                {
                    [mainClass()]: true,
                    [styles['button-disabled']]: style.disabled,
                    [styles['dark-mode']]: style.darkMode,
                },
                style.classList,
            )}
            {...others}
        >
            {children.children}
        </a>
    );
};

export const Button: Component<ButtonProps> = (props: ButtonProps) => {
    return (
        <Switch>
            <Match when={props.as === 'button' || props.as === undefined}>
                <RealButton {...(props as RealButtonProps)} />
            </Match>
            <Match when={props.as === 'link'}>
                <LinkButton {...(props as LinkButtonProps)} />
            </Match>
        </Switch>
    );
};
