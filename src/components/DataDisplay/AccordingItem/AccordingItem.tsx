import { Component, JSX } from 'solid-js';

interface AccordingItemProps {
    index: number,
    children: JSX.Element[]
    class?: string,
    classList?: {
        [key in string]: boolean
    }
}

interface AccordingItemHeadProps {
    icon?: JSX.Element;
    iconSize?: 'sm' | 'md' | 'lg'
    title?: string | JSX.Element;
    subtitle?: string | JSX.Element;
}

interface AccordingItemBodyProps extends JSX.BaseHTMLAttributes<HTMLDivElement> {}

type AccordingItemClass = Component<AccordingItemProps> & {
    Header: Component<AccordingItemHeadProps>,
    Body: Component<AccordingItemBodyProps>
}

// @ts-ignore
// TODO
const AccordingItem: AccordingItemClass = function(props) {
    return (
        <>
        </>
    )
} as AccordingItemClass;

// @ts-ignore
// TODO
AccordingItem.Header = (props) => {
    return (
        <>
        </>
    )
}
// @ts-ignore
// TODO
AccordingItem.Body = (props: AccordingItemBodyProps) => {
    return (
        <>
        </>
    )
}

export default AccordingItem