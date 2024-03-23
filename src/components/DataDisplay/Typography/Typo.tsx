import styles from './typo.module.scss';
import '../../../sass/global.scss';
import { Component, JSX, Match, mergeProps, splitProps, Switch } from 'solid-js';
import { combineClassList } from '../../../utils/combineClassList.ts';

interface TypoProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    emphasis?: boolean;
    darkMode?: boolean;
}

export const Typo: Component<TypoProps> = (props: TypoProps) => {
    props = mergeProps({ variant: 'p' as TypoProps['variant'] }, props);
    const [local, rest] = splitProps(props, [
        'variant',
        'emphasis',
        'darkMode',
        'children',
        'class',
        'classList',
    ]);
    const classListAccessor = () => {
        return combineClassList(
            local.class,
            {
                [styles[local.variant!]]: true,
                [styles.emphasize]: local.emphasis,
                [styles['dark-mode']]: local.darkMode,
            },
            local.classList,
        );
    };
    return (
        <Switch>
            <Match when={local.variant === 'h1'}>
                <h1 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h1>
            </Match>
            <Match when={local.variant === 'h2'}>
                <h2 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h2>
            </Match>
            <Match when={local.variant === 'h3'}>
                <h3 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h3>
            </Match>
            <Match when={local.variant === 'h4'}>
                <h4 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h4>
            </Match>
            <Match when={local.variant === 'h5'}>
                <h5 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h5>
            </Match>
            <Match when={local.variant === 'h6'}>
                <h6 classList={classListAccessor()} {...rest}>
                    {local.children}
                </h6>
            </Match>
            <Match when={local.variant === 'p'}>
                <p classList={classListAccessor()} {...rest}>
                    {local.children}
                </p>
            </Match>
        </Switch>
    );
};
