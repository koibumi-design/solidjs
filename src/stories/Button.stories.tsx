import type { Meta, StoryObj } from 'storybook-solidjs';
import { Button } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: 'Components/Interact/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['solid', 'light', 'outline', 'flat', 'ghost', 'glow'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary'],
      },
    },
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Solid: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
  },
};

export const Light: Story = {
  args: {
    children: 'Button',
    variant: 'light',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Flat: Story = {
  args: {
    children: 'Button',
    variant: 'flat',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Glow: Story = {
  args: {
    children: 'Button',
    variant: 'glow',
  },
};