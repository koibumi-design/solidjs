import { Component, createEffect, createSignal, For, JSX, Match, mergeProps, Show, Switch } from 'solid-js';
import { Card } from '../Card/Card.tsx';
import HandlerContext, { HandlerContextType } from './context.ts';

interface AccordingProps {
    class?: string;

    /**
     * ## Variant props
     * The According is warped in a `<Card>` component,
     * and the variant prop is passed to the `<Card>` component.
     * `<Card>` component doesn't have `flat` variant, `flat` is meaning that
     * the According will be warped in a `<div>` element rather than a `<Card>` component.
     * */
    variant?: 'quartz' | 'glass' | 'lightGlass' | 'flat';
    shadow?: boolean;
    darkMode?: boolean;

    /**
     * If true, the `<AccordingItem>` will be warped in a `<Card>` component.
     */
    separate?: boolean;

    children: JSX.Element[];

    /**
     * If true, only one `<AccordingItem>` can be expanded at a time.
     */
    mutex?: boolean;
    onExpand?: (index: number) => void;
    onCollapse?: (index: number) => void;
    defaultExpanded?: number[];
}




function warpInCard(
    element: JSX.Element,
    variant: 'quartz' | 'glass' | 'lightGlass' | 'flat',
    shadow: boolean,
    darkMode: boolean,
): JSX.Element {
    return (
        <Show
            when={variant !== 'flat'}
            fallback={<div>{element}</div>}
        >
            <Card
                variant={variant as 'quartz' | 'glass' | 'lightGlass'}
                shadow={shadow}
                darkMode={darkMode}>
                {element}
            </Card>
        </Show>
    );
}

export const According: Component<AccordingProps> = (props: AccordingProps) => {
    props = mergeProps(props, {
        variant: 'quartz' as AccordingProps['variant'],
        shadow: true,
        darkMode: false,
        defaultExpanded: [],
        mutex: false,
    });
    const [expanded, setExpanded] =
        createSignal<Array<boolean>>(
            new Array(props.children.length).fill(false),
        );
    createEffect(() => {
        const expandedIndexes = props.defaultExpanded!;
        const newArray = new Array(props.children.length).fill(false);
        expandedIndexes.forEach((index) => {
            newArray[index] = true;
        });
        setExpanded(newArray);
    });

    function getHandlerContext(mutex: boolean): HandlerContextType {
        if (mutex) {
            return {
                onExpand: (index) => {
                    const oldExpanded = expanded().findIndex((value) => value);
                    const newArray = new Array(props.children.length).fill(false);
                    newArray[index] = true;
                    setExpanded(newArray);
                    props.onExpand?.(index);
                    props.onCollapse?.(oldExpanded);
                },
                onCollapse: (index) => {
                    const newArray = new Array(props.children.length).fill(false);
                    setExpanded(newArray);
                    props.onCollapse?.(index);
                },
            }
        } else {
            return {
                onExpand: (index) => {
                    const newArray = expanded().slice();
                    newArray[index] = true;
                    setExpanded(newArray);
                    props.onExpand?.(index);
                },
                onCollapse: (index) => {
                    const newArray = expanded().slice();
                    newArray[index] = false;
                    setExpanded(newArray);
                    props.onCollapse?.(index);
                },
            }
        }
    }

    return (
        <HandlerContext.Provider value={getHandlerContext(props.mutex!)}>
            <Switch>
                <Match when={props.separate}>
                    <For each={props.children}>
                        {
                            (child) =>
                                warpInCard(
                                    child, props.variant!, props.shadow!, props.darkMode!,
                                )
                        }
                    </For>
                </Match>
                <Match when={!props.separate && props.variant !== 'flat'}>
                    <Card
                        variant={props.variant as 'quartz' | 'glass' | 'lightGlass'}
                        shadow={props.shadow!}
                        darkMode={props.darkMode!}
                        class={props.class}
                    >
                        {props.children}
                    </Card>
                </Match>
                <Match when={props.variant === 'flat'}>
                    <div class={props.class}>
                        {props.children}
                    </div>
                </Match>
            </Switch>
        </HandlerContext.Provider>
    );
};