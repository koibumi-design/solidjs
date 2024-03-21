import type { Meta, StoryObj } from 'storybook-solidjs';
import { Card } from '../components/Card/Card.tsx';
import { Typo } from '../components/Typography/Typo.tsx';

const Body = () =>
    (<>
        <Typo variant="h3">Card Head</Typo>
        <Typo>Card Body</Typo>
        <Typo>
            Koibbumi is the most moe Solid.js UI component library ✨
        </Typo>
    </>);

const meta = {
    title: 'Components/Data Display/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['glass', 'lightGlass', 'quartz'],
            },
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Quartz: Story = {
    args: {
        children: <Body />,
        variant: 'glass',
    },
};
