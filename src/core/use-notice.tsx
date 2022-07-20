import React, { useLayoutEffect, useMemo, useRef } from 'react';
import ReactDom from 'react-dom/client';
import type {
    LoadingOptions, MethodOptions, UseNoticeOptions,
    NoticeRef, TemplateFn, UseNoticeReturn, LoadingReturn, LoadingNotice,
} from '../types';
import Notice from './notice-manger';
import {
    Success, Warn, Error, Loading,
} from '../components/Icon';
import { NoticeProvider } from './context';
import { getObject, setNotice } from '../utils';

const IconMap = { error: Error, success: Success, warn: Warn };

export default function useNotice(options: UseNoticeOptions = {}) {
    const ref = useRef<NoticeRef>(null);
    useLayoutEffect(() => {
        const container = document.createElement('div');
        ReactDom.createRoot(container).render(
            <NoticeProvider value={options}>
                <Notice ref={ref} />
            </NoticeProvider>,
        );
        document.body.append(container);

        return () => {
            container.remove();
        };
    }, []);

    return useMemo(() => {
        const basicNoticeMetohd = Object.fromEntries(['success', 'error', 'warn'].map((method) => [
            method, (content: string, options: MethodOptions) => {
                const Icon = IconMap[method];
                ref.current?.addNotice(content, { icon: <Icon />, ...options });
            },
        ]));

        const loading = (content: string, options: MethodOptions = {}) => {
            const loadingNotice = ref.current!.addNotice(content, { icon: <Loading />, ...options, autoRemove: false });
            const basicLoading = Object.fromEntries(['success', 'error', 'warn'].map((method) => [
                method, (options: LoadingNotice | string) => {
                    const Icon = IconMap[method];
                    setNotice(loadingNotice, { icon: <Icon />, ...(getObject(options, 'content')) });
                },
            ]));
            const custom = (template: TemplateFn, options: MethodOptions = {}) => {
                const opt = { content: template, ...options };
                return setNotice(loadingNotice, opt);
            };

            return {
                custom, ...basicLoading,
            } as LoadingReturn;
        };

        const promise = async (asyncFunc: () => Promise<any>, options: LoadingOptions) => {
            const { addNotice } = ref.current || {};
            const {
                loading: loadingContent, success, error, ...loadingOptions
            } = options;

            if (addNotice) {
                const actions = loading(loadingContent, loadingOptions);
                try {
                    await asyncFunc();
                    actions.success(success);
                } catch {
                    actions.error(error);
                }
            }
        };

        const custom = (template: TemplateFn, options: MethodOptions = {}) => {
            ref.current?.addNotice(template, { autoRemove: false, ...options });
        };

        return {
            promise, custom, loading, ...basicNoticeMetohd,
        } as UseNoticeReturn;
    }, []);
}
