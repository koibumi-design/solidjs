import { createContext } from 'solid-js';

export interface HandlerContextType {
    onExpand: (index: number) => void,
    onCollapse: (index: number) => void,
}

const HandlerContext = createContext<HandlerContextType>({
    onExpand: () => {},
    onCollapse: () => {},
});

export default HandlerContext;