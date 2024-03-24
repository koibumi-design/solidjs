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
                filename: 'file2.apk',
                size: 2048,
                lastModified: new Date(),
            },
            {
                filename: 'file3.7z',
                size: 114514,
                lastModified: new Date(),
            },
            {
                filename: 'file4.js',
                size: 1919810,
                lastModified: new Date(),
            },
            {
                filename: 'file5.epub',
                size: 123456,
                lastModified: new Date(),
            },
            {
                filename: 'file6.mp4',
                size: 1919,
                lastModified: new Date(),
            },
            {
                filename: 'file7.mp3',
                size: 810,
                lastModified: new Date(),
            },
            {
                filename: 'file8.jpg',
                size: 810,
                lastModified: new Date(),
            },
            {
                filename: 'file9.png',
                size: 810,
                lastModified: new Date(),
            },
            {
                filename: 'file10.docx',
                size: 810,
                lastModified: new Date(),
            },
            {
                filename: 'file11.pptx',
                size: 810,
                lastModified: new Date(),
            },
            {
                filename: 'file12.xlsx',
                size: 810,
                lastModified: new Date(),
            }
        ],
        subdirectories: [
            {
                filename: 'subdirectory1',
                size: 0,
                lastModified: new Date(),
                files: [
                    {
                        filename: 'file1.txt',
                        size: 1024,
                        lastModified: new Date(),
                    }
                ],
                subdirectories: [],
            },
        ],
    },
    actions: [
        {
            name: 'you will see a log when you click this item',
            action: function(path: string[]): void {
                console.log(path.join('/'));
            },
        },
    ]
};

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
