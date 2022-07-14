import React, { useImperativeHandle } from 'react';
import styled, { keyframes } from 'styled-components';

import type { Notice as NoticeType, NoticeRef } from '../types';
import { createAnimate, createRefRect, createStyle } from '../utils/create';
import Notice from '../components/Notice';
import useNoticer from './use-noticer';

const NoticeContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    pointer-events: none;
`;

const noticeEnter = keyframes`
    from { transform: translateY(-100%) scale(0); }
    to { transform: translateY(0) scale(1); }
`;

const noticeLeave = keyframes`
    from { transform: translateY(0) scale(1); }
    to { transform: translateY(-100%) scale(0); }
`;

const NoticeAnimate = styled.div<{ notice: NoticeType }>`
    animation: ${({ notice }) => (notice.visible ? noticeEnter : noticeLeave)} 0.3s ease-in-out forwards;
`;

export default React.forwardRef<NoticeRef>((_, ref) => {
    const [notices, { addNotice, calculateOffset, updateHeight }] = useNoticer();
    useImperativeHandle(ref, () => ({ addNotice }));

    return (
        <NoticeContainer>
            {notices.map((n) => {
                const offset = calculateOffset(n);
                const noticeRef = n.height ? undefined : createRefRect((rect) => {
                    updateHeight(n.id, rect.height);
                });

                return (
                    <div
                        key={n.id}
                        ref={noticeRef}
                        style={createStyle(offset, n)}
                    >
                        <NoticeAnimate notice={n} style={createAnimate(n)}>
                            <Notice notice={n} />
                        </NoticeAnimate>
                    </div>
                );
            })}
        </NoticeContainer>
    );
});
