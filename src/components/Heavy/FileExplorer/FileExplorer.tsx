import { Component, createSignal, For, mergeProps, Show } from 'solid-js';
import { BreadcrumbItem, Breadcrumbs } from '../../Interact/Breadcrumbs/Breadcrumbs.tsx';
import { defaultSearchFunction } from './utils.ts';
import { SearchInput } from '../../Interact/SearchInput/SearchInput.tsx';
import { Card } from '../../DataDisplay/Card/Card.tsx';
import { Pagination } from '../../Interact/Pagination/Pagination.tsx';
import { Item } from './Item.tsx';
import styles from './file-explorer.module.scss';
import { createPopController, PopMenu } from '../../Interact/PopMenu/PopMenu.tsx';

export interface FileAction {
    name: string;
    action: (path: string[]) => void;
}

export interface I18N {
    searchPlaceholder: string;
    searchButton: string;
    back: string;
}

export interface FileMeta {
    filename: string;

    /**
     * size in bytes
     */
    size: number;
    lastModified: Date;
}

export interface DirectoryMeta extends FileMeta {
    files: FileMeta[];
    subdirectories: DirectoryMeta[];

    /**
     * If this is true, the directory will call `fetchFiles` when it is opened
     * not implemented yet
     */
    isLazyLoad?: boolean;
    hasLoaded?: boolean;
    fetchFiles?: (self: DirectoryMeta) => [FileMeta[], DirectoryMeta[]];
}

export interface FileExplorerProps {
    root: DirectoryMeta;
    actions?: FileAction[];

    /**
     * file and directory per page.
     * default is 10
     */
    filePerPage?: number;

    /**
     * custom search function. default is `String.includes()` method
     * @param query search query
     * @param items files and directories
     */
    customSearchFunction?: (
        query: string,
        items: (FileMeta | DirectoryMeta)[],
    ) => (FileMeta | DirectoryMeta)[];

    i18n?: I18N;
    variant?: 'quartz' | 'glass' | 'lightGlass';
}

const EnglishText: I18N = {
    searchButton: 'Search',
    searchPlaceholder: 'Search Files...',
    back: 'Back',
};

function judgeType(item: FileMeta | DirectoryMeta) {
    if ((item as DirectoryMeta).files === undefined) {
        return 'file';
    } else {
        return 'directory';
    }
}

export const FileExplorer:Component<FileExplorerProps> = function (props) {
    props = mergeProps({
        filePerPage: 10,
        customSearchFunction: defaultSearchFunction,
        i18n: EnglishText,
        variant: 'quartz' as FileExplorerProps['variant'],
    }, props);

    // When some file is clicked, this signal will be updated
    // `onClick` in `MenuItem` will capture this signal
    const [clickedFilePath, setClickedFilePath] = createSignal<string[]>([]);

    // The directory stack that you are currently in
    const [dirStack, setDirStack] = createSignal<DirectoryMeta[]>([props.root]);

    // when back to the previous directory, the previous page number has been stored in this signal
    const [pageNumberMemoryStack, setPageNumberMemoryStack] = createSignal<number[]>([0]);

    const {
        isOpen,
        onOpen,
        position,
        onClose,
    } = createPopController();

    function currentDir() {
        return dirStack()[dirStack().length - 1];
    }

    function pushDir(dir: DirectoryMeta) {
        setPageNumberMemoryStack([...pageNumberMemoryStack(), 0]);
        setDirStack([...dirStack(), dir]);
    }

    function popDir() {
        if (dirStack().length === 1) {
            return;
        }
        const newDirStack = dirStack().slice(0, dirStack().length - 1);
        const newPageNumberMemoryStack = pageNumberMemoryStack().slice(0, pageNumberMemoryStack().length - 1);
        setDirStack(newDirStack);
        setPageNumberMemoryStack(newPageNumberMemoryStack);
    }

    function jumpToDir(index: number) {
        const newDirStack = dirStack().slice(0, index + 1);
        const newPageNumberMemoryStack = pageNumberMemoryStack().slice(0, index + 1);
        setDirStack(newDirStack);
        setPageNumberMemoryStack(newPageNumberMemoryStack);
    }

    function currentPageNumber() {
        return pageNumberMemoryStack()[pageNumberMemoryStack().length - 1] + 1;
    }

    function setCurrentPageNumber(pageNumber: number) {
        console.log('call setCurrentPageNumber');
        const dirLength = dirStack().length;
        const newArray = pageNumberMemoryStack()
            .map((value, index) => {
                if (index === dirLength - 1) {
                    return pageNumber - 1;
                } else {
                    return value;
                }
            })
        setPageNumberMemoryStack(newArray);
    }

    function breadcrumbItems() {
        const items: BreadcrumbItem[] = [];
        for (let i = 0; i < dirStack().length; i++) {
            items.push({
                display: dirStack()[i].filename,
                isButton: true,
                onClick: () => jumpToDir(i),
            });
        }
        return items;
    }

    function currentItems() {
        const dir = currentDir();
        const files = dir.files;
        const subdirectories = dir.subdirectories;
        return (subdirectories as (FileMeta | DirectoryMeta)[])
            .concat(files);
    }

    function maxPage() {
        return Math.ceil(currentItems().length / props.filePerPage!);
    }

    function getMenuItems() {
        const actions = props.actions!;
        return actions.map(action => ({
            content: action.name,
            onClick: () => action.action(clickedFilePath()),
        }));
    }

    function currentItemsOnPage() {
        const items = currentItems();
        const start = (currentPageNumber() - 1) * props.filePerPage!;
        return items.slice(start, start + props.filePerPage!);
    }

    function handleMouseDown(item: FileMeta | DirectoryMeta):
        (event: MouseEvent) => void
        {
        const type = judgeType(item);
        if (type === 'file') {
            const thisItem = item as FileMeta;
            if (props.actions === undefined) {
                return () => {}
            }
            return (event: MouseEvent) => {
                if (event.button === 0 || event.button === 2) {
                    setClickedFilePath(
                        [
                            ...(
                                dirStack()
                                    .map(dir => dir.filename)
                            ),
                            thisItem.filename
                        ]
                    );
                    onOpen(event.clientX, event.clientY);
                }
            }
        } else {
            const thisItem = item as DirectoryMeta;
            return (event: MouseEvent) => {
                if (event.button === 0) {
                    pushDir(thisItem);
                }
            }
        }
    }

    const handleBack = () => (e: MouseEvent) => {
        if (e.button === 0) {
            popDir();
        }
    }

    return (
        <Card variant={props.variant}>
            <SearchInput
                placeholder={props.i18n!.searchPlaceholder}
                customSearchButton={props.i18n!.searchButton}
            />
            <Card
                shadow={false}
                variant={props.variant}
                style={{
                    padding: '0.5rem 0.75rem',
                }}
            >
                <Breadcrumbs path={breadcrumbItems()} />
            </Card>
            <Card
                shadow={false}
                variant={props.variant}
            >
                <ul class={styles.fileList}>
                    <Show when={dirStack().length > 1}>
                        <Item
                            type="back" meta=".." backText={props.i18n?.back}
                            onMouseDown={handleBack()}
                        />
                    </Show>
                    <For each={currentItemsOnPage()}>
                        {item => (
                            <Item
                                type={judgeType(item)}
                                meta={item}
                                onMouseDown={handleMouseDown(item)}
                            />
                        )}
                    </For>
                </ul>
            </Card>
            <Show when={props.actions !== undefined}>
                <PopMenu
                    isOpen={isOpen()}
                    position={position()}
                    onClose={onClose}
                    items={getMenuItems()}
                />
            </Show>
            <Show when={maxPage() > 1}>
                <Pagination
                    maxPage={maxPage()}
                    currentPage={currentPageNumber()}
                    onPageChange={setCurrentPageNumber}
                />
            </Show>
        </Card>
    );
}