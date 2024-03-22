import { DirectoryMeta, FileMeta } from './FileExplorer.tsx';

const kilo = 1024;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function formatSize(size: number): string {
    if (size === 0) return '0 Bytes';

    const i = Math.floor(Math.log(size) / Math.log(kilo));
    return parseFloat((size / Math.pow(kilo, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

export function defaultSearchFunction<T, U>
(query: string, items: (FileMeta<U> | DirectoryMeta<T, U>)[]): (FileMeta<U> | DirectoryMeta<T, U>)[] {
    return items.filter((item) => item.filename.includes(query));
}