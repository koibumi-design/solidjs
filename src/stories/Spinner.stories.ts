import type { Meta, StoryObj } from 'storybook-solidjs';
import { Spinner } from '../components/Feedback/Spinner/Spinner';

const meta = {
    title: 'Components/Feedback/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            },
        },
        color: {
            control: {
                type: 'select',
                options: ['primary', 'normal'],
            },
        },
        darkMode: {
            control: {
                type: 'boolean',
            },
        },
    },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'medium',
        color: 'normal',
    },
};

export const Primary: Story = {
    args: {
        size: 'medium',
        color: 'primary',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        color: 'normal',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        color: 'primary',
    },
};

export const DarkMode: Story = {
    args: {
        size: 'medium',
        color: 'normal',
        darkMode: true,
    },
};
