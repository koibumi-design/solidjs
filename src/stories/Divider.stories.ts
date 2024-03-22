import type { Meta, StoryObj } from 'storybook-solidjs';
import { Divider } from '../components/DataDisplay/Divider/Divider.tsx';

const meta = {
    title: 'Components/Data Display/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: {
                type: 'inline-radio',
                options: ['horizontal', 'vertical'],
            },
        },
        minWidth: {
            control: 'text',
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
        minWidth: '100px',
    },
};

export const Vertical: Story = {
    args: {
        direction: 'vertical',
        minWidth: '100px',
    },
};
