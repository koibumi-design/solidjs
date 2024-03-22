import type { Meta, StoryObj } from 'storybook-solidjs';
import { Breadcrumbs } from '../components/Interact/Breadcrumbs/Breadcrumbs.tsx';

const meta = {
    title: 'Components/Interact/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        path: [
            { display: 'Home', link: '#' },
            { display: 'Library', link: '#' },
            { display: 'Books', link: '#' },
        ],
    },
};
