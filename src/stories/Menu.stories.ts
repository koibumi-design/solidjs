import type { Meta, StoryObj } from 'storybook-solidjs';
import { Menu } from '../components/Interact/Menu/Menu.tsx';

const meta = {
    title: 'Components/Interact/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['quartz', 'glass', 'lightGlass'],
            },
        },
        darkMode: {
            control: 'boolean',
        },
        borderless: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Quartz: Story = {
    args: {
        items: [
            { content: 'Item 1', color: 'primary'},
            { content: 'Item 2' },
            { content: 'Item 3' },
        ],
        variant: 'quartz',
    },
};