import type { Meta, StoryObj } from 'storybook-solidjs';
import { Input } from '../components/Form/Input/Input.tsx';

const meta = {
    title: 'Components/Form/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['solid'],
            },
        },
        color: {
            control: {
                type: 'select',
                options: ['normal'],
            },
        },
        label: {
            control: {
                type: 'text',
            },
        },
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Input',
    },
};
