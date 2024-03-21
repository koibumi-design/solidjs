import type { Meta, StoryObj } from 'storybook-solidjs';
import { Typo } from '../components/DataDisplay/Typography/Typo';

const meta = {
    title: 'Components/Data Display/Typography',
    component: Typo,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            },
        },
        darkMode: {
            control: {
                type: 'boolean',
            },
        },
    },
} satisfies Meta<typeof Typo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        children: 'Heading 1',
        variant: 'h1',
    },
};

export const H2: Story = {
    args: {
        children: 'Heading 2',
        variant: 'h2',
    },
};

export const H3: Story = {
    args: {
        children: 'Heading 3',
        variant: 'h3',
    },
};

export const H4: Story = {
    args: {
        children: 'Heading 4',
        variant: 'h4',
    },
};

export const H5: Story = {
    args: {
        children: 'Heading 5',
        variant: 'h5',
    },
};

export const H6: Story = {
    args: {
        children: 'Heading 6',
        variant: 'h6',
    },
};

export const P: Story = {
    args: {
        children: 'This is a paragraph',
    },
};
