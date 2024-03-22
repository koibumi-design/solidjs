import type { Meta, StoryObj } from 'storybook-solidjs';
import { FileExplorer, FileExplorerProps } from '../components/Heavy/FileExplorer/FileExplorer.tsx';
import { Component } from 'solid-js';

const exampleProps: FileExplorerProps = {
    root: {
        filename: 'root',
        size: 0,
        lastModified: new Date(),
        files: [
            {
                filename: 'file1.txt',
                size: 1024,
                lastModified: new Date(),
            },
            {
                filename: 'file2.txt',
                size: 2048,
                lastModified: new Date(),
            }
        ],
        subdirectories: [
            {
                filename: 'subdirectory1',
                size: 0,
                lastModified: new Date(),
                files: [],
                subdirectories: [],
            }
        ],
    },
}

const meta = {
    title: 'Components/Heavy/FileExplorer',
    component: FileExplorer as Component<any>,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: exampleProps as any,
} satisfies Meta<typeof FileExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
