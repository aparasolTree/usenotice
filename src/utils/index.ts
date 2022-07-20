import type { LoadingNotice, Notice } from '../types';
import defaultOptions from '../default';
import genId from './genId';
import { isObject } from './is';

export * from './create';
export * from './is';
export {
    genId,
};

export const setNotice = (notice: Notice, options: LoadingNotice) => {
    notice.set(options);
    setTimeout(
        () => notice.remove(),
        (options.duration || defaultOptions.duration),
    );
};

export const getObject = (value: unknown, prop: string) => (isObject(value) ? value : { [prop]: value });
