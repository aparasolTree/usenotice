import React, { useLayoutEffect, useMemo, useRef } from 'react';
import ReactDom from 'react-dom/client';
import type {
    IconOptions, CustomOptions,
    LoadingOptions, NoticeRef, SuccessOptions, TemplateFn, UseNoticeOptions, WarnOptions,
} from '../types';
import Notice from './notice-manger';
import Success from '../components/Icon/success';
import Error from '../components/Icon/error';
import Loading from '../components/Icon/loading';
import Warn from '../components/Icon/warn';
import { NoticeProvider } from './context';

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
        const success = (content: string, options: SuccessOptions = {}) => { ref.current?.addNotice(content, { icon: <Success />, ...options }); };
        const error = (content: string, options: ErrorOptions = {}) => { ref.current?.addNotice(content, { icon: <Error />, ...options }); };
        const warn = (content: string, options: WarnOptions = {}) => { ref.current?.addNotice(content, { icon: <Warn />, ...options }); };
        const icon = (content: string, options: IconOptions) => { ref.current?.addNotice(content, options); };
        const loading = (asyncFunc: () => Promise<any>, options: LoadingOptions) => {
            const { addNotice } = ref.current || {};
            const {
                loading, success, error, ...loadingOptions
            } = options;
            if (addNotice) {
                const loadingNotice = addNotice(loading, { icon: <Loading />, autoRemove: false, ...loadingOptions });
                asyncFunc().then(() => {
                    loadingNotice.set({ content: success, icon: <Success /> });
                }).catch(() => {
                    loadingNotice.set({ content: error, icon: <Error /> });
                }).finally(() => {
                    setTimeout(() => loadingNotice.remove(), 1000);
                });
            }
        };
        const custom = (template: TemplateFn, options: CustomOptions = {}) => {
            ref.current?.addNotice(template, { autoRemove: false, ...options });
        };

        return {
            success, error, loading, warn, custom, icon,
        };
    }, []);
}
