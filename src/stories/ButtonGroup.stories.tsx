import type { Meta, StoryObj } from 'storybook-solidjs';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup.tsx';

const meta = {
    title: 'Components/Interact/Button Group',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: {
                type: 'select',
                options: ['row', 'column'],
            },
        },
        children: {
            control: {
                type: '',
            },
            description: 'The buttons to be displayed in the group',
        },
    },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {
        children: (
            <>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
            </>
        ),
        direction: 'row',
    },
};

export const Column: Story = {
    args: {
        children: (
            <>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
            </>
        ),
        direction: 'column',
    },
};
