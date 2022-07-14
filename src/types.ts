import React from "react";

type Horizontal = 'left' | 'center' | 'right';
type Vertical = 'top' | 'bottom';
export type Position = `${Horizontal}-${Vertical}`;

export type Fn<R, A extends []> = (...args: A) => R;
export type TemplateFn = (remove: Fn<any, any>) => React.ReactNode;
export type Animate = { leave: string, enter: string };

export interface Notice {
    id: string;
    content: string | TemplateFn;
    visible: boolean;
    set: (options: Pick<Notice, 'content' | 'icon'>) => void;
    remove: () => void;

    icon?: string | React.ReactNode;
    duration?: number;
    position?: Position;
    height?: number;
    animate?: Animate;
    autoRemove?: boolean;
}

export type Options = Partial<Pick<Notice, 'duration' | 'animate' | 'position'>>;
export type IconOptions = Options & { icon: string | React.ReactNode };
export type SuccessOptions = Options;
export type ErrorOptions = Options;
export type WarnOptions = Options;
export type CustomOptions = Options;
export interface LoadingOptions extends Options {
    success: string,
    error: string,
    loading: string,
}

export type UseNoticeOptions = Partial<Pick<Notice, 'duration' | 'animate' | 'position'>>;
export type NoticeRefOptions = Partial<Pick<Notice, 'icon' | 'autoRemove' | 'position' | 'animate' | 'duration'>>;

export interface NoticeRef {
    addNotice: (content: Notice['content'], options: NoticeRefOptions) => Notice;
}


export type OnRect = (rect: DOMRect) => void;