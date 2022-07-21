import React from 'react';
import defaultOptions from '../default';
import type {
    Notice, NoticeRefOptions, OnRect, TemplateFn,
} from '../types';
import genId from './genId';

export const cretaeNotice = (content: string | TemplateFn, options: NoticeRefOptions): Notice => {
    const {
        icon,
        autoRemove,
        position,
        animate,
        duration,
        className, style,
    } = { ...defaultOptions, ...options };

    return {
        icon,
        style,
        animate,
        content,
        position,
        duration,
        className,
        autoRemove,
        id: genId(),
        visible: true,
        set: () => { },
        remove: () => { },
    };
};

export const createRefRect = (onRect: OnRect) => (
    ref: HTMLElement | null,
) => {
    if (ref) {
        const rect = ref.getBoundingClientRect();
        onRect(rect);
    }
};

export const createAnimate = (notice: Notice): React.CSSProperties | undefined => {
    const { enter, leave } = notice.animate || {};
    if (enter && leave) {
        return {
            animation: `${notice.visible ? enter : leave} 0.3s ease-in-out forwards`,
        };
    }

    return undefined;
};

export const positionMap = {
    bottom: 'end',
    top: 'start',
    left: 'start',
    right: 'end',
    center: 'center',
};

export const createStyle = (offset: number, notice: Notice): React.CSSProperties => {
    const { position = 'center-top', id } = notice;
    const top = position.includes('top');
    const verticalStyle = top ? { top: 0 } : { bottom: 0 };

    return {
        zIndex: id,
        position: 'absolute',
        left: 0,
        width: '100%',
        transition: 'transform 0.3s ease-in-out',
        transform: `translateY(${offset * (top ? 1 : -1)}px)`,
        display: 'flex',
        justifyContent: positionMap[position.split('-')[0]],
        ...verticalStyle,
    };
};
