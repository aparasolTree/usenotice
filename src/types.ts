import React from "react";

type Horizontal = 'left' | 'center' | 'right';
type Vertical = 'top' | 'bottom';
export type Position = `${Horizontal}-${Vertical}`;

export type Fn<R, A extends []> = (...args: A) => R;
export type TemplateFn = (remove: Fn<any, any>) => React.ReactNode;
export type Animate = { leave: string, enter: string };

type SetNotice = Partial<Pick<Notice, 'content' | 'icon' | 'duration' | 'animate'>>;
export interface Notice {
    id: string;
    content: string | TemplateFn;
    visible: boolean;
    set: (options: SetNotice) => void;
    remove: () => void;

    icon?: string | React.ReactNode;
    duration?: number;
    position?: Position;
    height?: number;
    animate?: Animate;
    autoRemove?: boolean;
}

export interface UseNoticeReturn {
    warn: (content: string, options?: MethodOptions) => void;
    error: (content: string, options?: MethodOptions) => void;
    loading: (content: string, options?: MethodOptions) => any;
    success: (content: string, options?: MethodOptions) => void;
    custom: (template: TemplateFn, options?: MethodOptions) => void;
    promise: (asyncFunc: () => Promise<any>, options?: LoadingOptions) => Promise<void>;
}

export type MethodOptions = Partial<Pick<Notice, 'duration' | 'animate' | 'position'>>;
export type LoadingNotice = SetNotice;
export interface LoadingOptions extends MethodOptions {
    success: string | LoadingNotice,
    error: string | LoadingNotice,
    loading: string,
}
export type LoadingReturn = {
    warn: (options: LoadingNotice | string) => void;
    error: (options: LoadingNotice | string) => void;
    success: (options: LoadingNotice | string) => void;
    custom: (template: TemplateFn, options?: MethodOptions) => void;
}

export type UseNoticeOptions = MethodOptions & {
    className?: string;
    style?: React.CSSProperties;
};
export type NoticeRefOptions = Partial<Pick<Notice, 'icon' | 'autoRemove' | 'position' | 'animate' | 'duration'>>;
export interface NoticeRef {
    addNotice: (content: Notice['content'], options: NoticeRefOptions) => Notice;
}

export type OnRect = (rect: DOMRect) => void;