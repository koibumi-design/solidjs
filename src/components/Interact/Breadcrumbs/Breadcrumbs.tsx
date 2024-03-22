import { Component, For, JSX, Show } from 'solid-js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.tsx';
import { Button } from '../Button/Button.tsx';
import styles from './bread.module.scss';
import '../../../sass/global.scss';

interface BreadcrumbsProps {
    path: BreadcrumbItem[];
}

export interface BreadcrumbItem {
    display: string | JSX.Element;
    link?: string;
}

export const Breadcrumbs: Component<BreadcrumbsProps> = (props) => {
    let len = () => {
        return props.path.length;
    }
    return (
        <ButtonGroup class={styles.breadcrumb}>
            <For each={props.path}>
                {(item, index) => {
                    return (
                        <>
                            <Button
                                as="link"
                                href={item.link}
                                size="tiny"
                                variant="light"
                                class={styles.bread}
                            >
                                {item.display}
                            </Button>
                            <Show when={index() < len() - 1}>
                                <span>
                                    {'>'}
                                </span>
                            </Show>
                        </>
                    )
                }}
            </For>
        </ButtonGroup>
    )
}