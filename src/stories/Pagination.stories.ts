import type { Meta, StoryObj } from 'storybook-solidjs';
import { Pagination } from '../components/Interact/Pagination/Pagination.tsx';

const meta = {
    title: 'Components/Interact/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        maxPage: 10,
        currentPage: 1,
    },
};