import { Accessor, Component, createSignal, onMount, Show, splitProps } from 'solid-js';
import { Menu, MenuProps } from '../Menu/Menu.tsx';

interface popController {
    isOpen: Accessor<boolean>;
    /**
     * You must call this function to open the pop menu.
     * @param clientX the `clientX` of the `MouseEvent`
     * @param clientY the `clientY` of the `MouseEvent`
     */
    onOpen: (clientX: number, clientY: number) => void;
    position: () => { x: number, y: number };
    onClose: () => void;
}

export function createPopController(): popController {
    const [isOpen, setIsOpen] = createSignal(false);
    const [x, setX] = createSignal(0);
    const [y, setY] = createSignal(0);
    const onOpen = (x: number, y: number) => {
        setX(x);
        setY(y);
        setIsOpen(true);
    };
    const position = () => {
        return { x: x(), y: y() };
    };
    const onClose = () => {
        setIsOpen(false);
    };
    return { isOpen, onOpen, position, onClose };
}

interface PopMenuProps extends MenuProps {
    isOpen: boolean;
    position: { x: number, y: number };
    onClose: () => void;
}

export const PopMenu: Component<PopMenuProps> = (props) => {
    let ref: HTMLDivElement;
    const [local, rest] = splitProps(
        props, ['isOpen', 'position', 'onClose', 'items'],
    );
    const handleClickOutside = (event: MouseEvent) => {
        if (!ref.contains(event.target as Node)) {
            local.onClose();
        }
    }
    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })
    const newItems = () => {
        return local.items.map((item) => {
            return {
                ...item,
                onClick: () => {
                    item.onClick?.();
                    local.onClose();
                },
            };
        });
    };
    return (
        <Show when={local.isOpen}>
            <div
                ref={
                    // @ts-ignore
                    ref
                }
                style={{
                    position: 'fixed',
                    top: `${local.position.y}px`,
                    left: `${local.position.x}px`,
                    'z-index': 114514,
                }}
            >
                <Menu items={newItems()} {...rest} />
            </div>
        </Show>
    );
};