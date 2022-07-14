import { useCallback, useMemo, useState } from 'react';
import type {
    Notice, NoticeRefOptions, TemplateFn,
} from '../types';
import { cretaeNotice } from '../utils/create';
import { useNoticeContext } from './context';

export default function useNoticer() {
    const context = useNoticeContext();
    const [notices, setNotices] = useState<Notice[]>([]);

    const calculateOffset = useCallback((notice: Notice) => {
        const sameDirection = notices.filter((n) => notice.position === n.position);
        const noticeIndex = sameDirection.findIndex((n) => n.id === notice.id);
        const noticeBeforeLength = sameDirection.filter((n, i) => i < noticeIndex && n.visible).length;

        return sameDirection
            .filter((n) => n.visible)
            .slice(0, noticeBeforeLength)
            .reduce((total, curr) => total + (curr.height || 0), 0);
    }, [notices]);

    const actions = useMemo(() => {
        const updateHeight = (id: string, height: number) => {
            setNotices((prevNotices) => prevNotices.map((n) => (n.id === id ? { ...n, height } : n)));
        };

        const removeNotice = (id: string) => {
            setNotices((prev) => prev.filter((n) => n.id !== id));
        };

        const hideNotice = (id: string) => {
            setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, visible: false } : n)));
            setTimeout(() => removeNotice(id), 1000);
        };

        const addNotice = (content: string | TemplateFn, opts: NoticeRefOptions = {}) => {
            const newNotice = cretaeNotice(content, { ...context, ...opts });
            setNotices((prev) => [newNotice, ...prev]);
            newNotice.remove = () => hideNotice(newNotice.id);
            newNotice.set = ({
                content, icon, animate, duration,
            }) => setNotices((prev) => {
                const notice = prev.find(({ id }) => id === newNotice.id);
                if (notice) {
                    content && (notice.content = content);
                    icon && (notice.icon = icon);
                    animate && (notice.animate = animate);
                    duration && (notice.duration = duration);
                }

                return [...prev];
            });

            if (newNotice.autoRemove) {
                setTimeout(() => hideNotice(newNotice.id), newNotice.duration || context.duration);
            }

            return newNotice;
        };

        return { addNotice, updateHeight };
    }, [JSON.stringify(context)]);

    return [notices, { ...actions, calculateOffset }] as const;
}
