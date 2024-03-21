import type { Meta, StoryObj } from 'storybook-solidjs';
import { Link } from '../components/Interact/Link/Link.tsx';

const meta = {
    title: 'Components/Data Display/Link',
    component: Link,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        darkMode: {
            control: {
                type: 'boolean',
            },
        },
    },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Link',
    },
};
