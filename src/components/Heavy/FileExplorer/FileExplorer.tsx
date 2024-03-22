import { createEffect, createSignal, mergeProps } from 'solid-js';
import { BreadcrumbItem, Breadcrumbs } from '../../Interact/Breadcrumbs/Breadcrumbs.tsx';
import { defaultSearchFunction } from './utils.ts';
import { SearchInput } from '../../Interact/SearchInput/SearchInput.tsx';
import { Card } from '../../DataDisplay/Card/Card.tsx';

export interface FileAction {
    name: string;
    action: (path: string[]) => void;
}

export interface I18N {
    searchPlaceholder: string;
    searchButton: string;
}

export interface FileMeta<T = undefined> {
    filename: string;

    /**
     * size in bytes
     */
    size: number;
    lastModified: Date;

    appendix?: T;
}

export interface DirectoryMeta<T = undefined, U = undefined> extends FileMeta<T> {
    files: FileMeta<U>[];
    subdirectories: DirectoryMeta<T, U>[];

    /**
     * If this is true, the directory will call `fetchFiles` when it is opened
     */
    isLazyLoad?: boolean;
    hasLoaded?: boolean;
    fetchFiles?: (self: DirectoryMeta<T, U>) => void;
}

export interface FileExplorerProps<T = undefined, U = undefined> {
    root: DirectoryMeta<T, U>;
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
        items: (FileMeta<U> | DirectoryMeta<T, U>)[],
    ) => (FileMeta<U> | DirectoryMeta<T, U>)[];

    i18n?: I18N;
    variant?: 'quartz' | 'glass' | 'lightGlass'
    darkMode?: boolean;
}

const EnglishText: I18N = {
    searchButton: 'Search',
    searchPlaceholder: 'Search Files...',
};

export function FileExplorer<T = undefined, U = undefined>(props: FileExplorerProps<T, U>) {
    props = mergeProps({
        filePerPage: 10,
        customSearchFunction: defaultSearchFunction,
        i18n: EnglishText,
        variant: 'quartz' as FileExplorerProps['variant'],
        darkMode: false,
    }, props);

    const [root, setRoot] = createSignal(props.root);

    // When some file is clicked, this signal will be updated
    // `onClick` in `MenuItem` will capture this signal
    const [clickedFilePath, setClickedFilePath] = createSignal<string[]>([]);

    const [currentPath, setCurrentPath] = createSignal<string[]>(['/']);
    const [dirStack, setDirStack] = createSignal<DirectoryMeta<T, U>[]>([root()]);
    const [currentDirectory, setCurrentDirectory] = createSignal<DirectoryMeta<T, U>>(root());

    const [pageNumberMemoryStack, setPageNumberMemoryStack] = createSignal<number[]>([0]);
    const [currentPageNumber, setCurrentPageNumber] = createSignal<number>(0);

    // to jump to the file path
    const [breadcrumbProps, setBreadcrumbProps] = createSignal<BreadcrumbItem[]>([]);
    createEffect(() => {
        setBreadcrumbProps(
            currentPath().map((path, index) => {
                return {
                    display: path,
                    isButton: true,
                    onClick: () => {
                        setCurrentPath(currentPath().slice(0, index + 1));
                    },
                };
            }),
        );
    });
    createEffect(() => {
        if (dirStack().length === currentPath().length) {
            return;
        }
        setDirStack(
            dirStack().slice(0, currentPath().length + 1),
        );
    });
    createEffect(() => {
        setCurrentDirectory(dirStack()[currentPath().length]);
    });

    function onSearch(query: string) {
        const searchDir: DirectoryMeta<T, U> = {
            filename: 'Search Result',
            size: 0,
            lastModified: new Date(),
            files: [],
            subdirectories: [],
        };
        const currentItems: (FileMeta<U> | DirectoryMeta<T, U>)[] =
            (currentDirectory().files as (FileMeta<U> | DirectoryMeta<T, U>)[])
                .concat(currentDirectory().subdirectories);
        const searchResult =
            props.customSearchFunction!(
                query,
                currentItems,
            );
        const files = searchResult.filter(
            (item) => !(item as DirectoryMeta<T, U>).files,
        );
        const subdirectories = searchResult.filter(
            (item) => (item as DirectoryMeta<T, U>).files,
        );
        searchDir.files = files as FileMeta<U>[];
        searchDir.subdirectories = subdirectories as DirectoryMeta<T, U>[];
        const pathTop = currentPath()[currentPath().length - 1];
        if (pathTop !== 'Search Result') {
            setCurrentPath([...currentPath(), 'Search Result']);
        } else {
            setCurrentPath(currentPath());
        }
    }

    return (
        <Card darkMode={props.darkMode} variant={props.variant}>
            <SearchInput
                onSearch={onSearch}
                placeholder={props.i18n!.searchPlaceholder}
                customSearchButton={props.i18n!.searchButton}
                darkMode={props.darkMode}
            />
            <Card
                shadow={false}
                variant={props.variant}
                style={{
                    padding: '0.5rem 0.75rem'
                }}
            >
                <Breadcrumbs path={breadcrumbProps()} />
            </Card>

        </Card>
    );
}