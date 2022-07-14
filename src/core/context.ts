import React, { useContext } from 'react';
import type { UseNoticeOptions } from '../types';

const NoticeContext = React.createContext<UseNoticeOptions>({});

const useNoticeContext = () => useContext(NoticeContext);
const NoticeProvider = NoticeContext.Provider;

export {
    useNoticeContext, NoticeProvider,
};
