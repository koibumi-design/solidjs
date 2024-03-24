import { DirectoryMeta, FileMeta } from './FileExplorer.tsx';
import { Component, Match, Show, Switch } from 'solid-js';
import styles from './fileItem.module.scss';
import { BackIcon, FolderIcon, SmartFileIcon } from './Icon.tsx';
import { Typo } from '../../DataDisplay/Typography/Typo.tsx';
import { formatDate, formatSize } from './utils.ts';

interface ItemProps {
    type: 'file' | 'directory' | 'back';
    meta: FileMeta | DirectoryMeta | '..';
    backText?: string;
    onMouseDown?: (event: MouseEvent) => void;
}

export const Item: Component<ItemProps> = (props: ItemProps) => {
    return (
        <li
            class={styles.item}
            onMouseDown={props.onMouseDown}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }}
        >
            <span class={styles.icon} >
                <Switch>
                    <Match when={props.type === 'file'}>
                        <SmartFileIcon fileName={(props.meta as FileMeta).filename} />
                    </Match>
                    <Match when={props.type === 'directory'}>
                        <FolderIcon />
                    </Match>
                    <Match when={props.type === 'back'}>
                        <BackIcon />
                    </Match>
                </Switch>
            </span>
            <Typo emphasis class={styles.fileName}>
                <Show when={props.type !== 'back'}
                      fallback={'. .'}
                >
                    {(props.meta as FileMeta).filename}
                </Show>
            </Typo>

            <span class={styles.meta}>
                <Show
                    when={props.type !== 'back'}
                    fallback={(
                        <>
                            <span>
                            {props.backText}
                            </span>
                            <span></span>
                        </>
                    )}
                >
                    <span>
                        {formatSize((props.meta as FileMeta).size)}
                    </span>
                    <span>
                        {formatDate((props.meta as FileMeta).lastModified)}
                    </span>
                </Show>
            </span>

        </li>
    );
};