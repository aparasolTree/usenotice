import React from 'react';
import styled from 'styled-components';
import { useNoticeContext } from '../core/context';
import type { Notice as NoticeItem } from '../../src/types';

const NoticeContainer = styled.div`
    padding: 7px 15px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid rgba(17, 17, 26, 0.05);
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
`;

export default function Notice({ notice }: { notice: NoticeItem }) {
    const { style, className } = useNoticeContext();
    const { content, icon, remove } = notice;

    return (
        <NoticeContainer style={style} className={className}>
            {icon && <span style={{ marginRight: '5px' }}>{icon}</span>}
            {typeof content === 'function' ? content(remove) : (
                <span>{content}</span>
            )}
        </NoticeContainer>
    );
}
