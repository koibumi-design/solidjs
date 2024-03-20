import { addons } from '@storybook/manager-api';
import {create} from '@storybook/theming';
import logo from '../koibumi.svg';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'Koibumi Design React',
        brandImage: logo,
    })
});