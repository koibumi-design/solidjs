import { Component, For, mergeProps } from 'solid-js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.tsx';
import { Button } from '../Button/Button.tsx';

interface PaginationProps {
    darkMode?: boolean;
    maxPage: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
    class?: string;
}

/**
 * display 1st page, last page, and 2 pages before and after the current page
 */
function getDisplayArray(currentPage: number, maxPage: number): number[] {

    let pages: number[] = [];

    // Ensure currentPage and maxPage are within valid bounds (> 0)
    currentPage = Math.max(1, currentPage);
    maxPage = Math.max(1, maxPage);

    // Include the first page if there's at least one page
    if (maxPage >= 1) {
        pages.push(1);
    }

    // Calculate the range around the current page, ensuring pages are > 0
    const startPage = Math.max(currentPage - 2, 2); // Starts from 2 to avoid adding 1 again
    const endPage = Math.min(currentPage + 2, maxPage - 1); // Ends before the last page if possible

    // Add the range of pages around the current page
    for (let page = startPage; page <= endPage; page++) {
        if (!pages.includes(page)) {
            pages.push(page);
        }
    }

    // Include the last page if it's not the first page and not already included
    if (maxPage > 1 && !pages.includes(maxPage)) {
        pages.push(maxPage);
    }

    return pages;
}

export const Pagination: Component<PaginationProps> = (props: PaginationProps) => {
    props = mergeProps({
        darkMode: false,
    }, props);
    function getVariant(page: number, currentPage: number) {
        return page == currentPage ? 'solid' : 'ghost';
    }
    return (
        <ButtonGroup
            class={props.class}
            direction='row'
        >
            <Button
                variant='solid'
                size="small"
                darkMode={props.darkMode}
                disabled={props.currentPage === 1}
                onClick={() => props.onPageChange?.(props.currentPage - 1)}
            >
                {'<'}
            </Button>
            <For each={getDisplayArray(props.currentPage, props.maxPage)}>
                {(page) => (
                    <Button
                        variant={getVariant(page, props.currentPage)}
                        darkMode={props.darkMode}
                        size="small"
                        onClick={() => props.onPageChange?.(page)}
                    >
                        {page}
                    </Button>
                )}
            </For>
            <Button
                variant='solid'
                darkMode={props.darkMode}
                size="small"
                disabled={props.currentPage === props.maxPage}
                onClick={() => props.onPageChange?.(props.currentPage + 1)}
            >
                {'>'}
            </Button>
        </ButtonGroup>
    )
}