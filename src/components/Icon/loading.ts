import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Loading = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 2px solid #ddd;
    border-right-color: #aaa;
    animation: ${loadingAnimation} 0.5s linear infinite;
`;

export default Loading;
