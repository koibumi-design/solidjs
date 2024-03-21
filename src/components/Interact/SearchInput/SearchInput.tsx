import { Component, createSignal, JSXElement, mergeProps } from 'solid-js';
import { Input } from '../../Form/Input/Input.tsx';
import { Button } from '../Button/Button.tsx';
import styles from './searchInput.module.scss';

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    buttonVariant?: 'solid' | 'outline' | 'flat' | 'ghost';
    buttonColor?: 'primary';
    darkMode?: boolean;
    disabled?: boolean;
    customSearchButton?: JSXElement;
}

export const SearchInput: Component<SearchInputProps> = (props) => {
    props = mergeProps(props, {
        placeholder: '',
        buttonVariant: 'solid' as SearchInputProps['buttonVariant'],
        buttonColor: 'primary' as SearchInputProps['buttonColor'],
        customSearchButton: 'Search',
    });
    const [input, setInput] = createSignal('');
    function onSearchHandler() {
        props.onSearch?.(input());
    }
    return (
        <search class={styles['search-input']}>
            <Input
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={input()}
                darkMode={props.darkMode}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearchHandler();
                    }
                }}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                disabled={props.disabled}
                variant={props.buttonVariant}
                color={props.buttonColor}
                darkMode={props.darkMode}
                onClick={onSearchHandler}
            >
                {props.customSearchButton}
            </Button>
        </search>
    );
};
