import styled, { keyframes } from 'styled-components';

const errorAnimation = keyframes`
    from {
        transform: scale(0) rotate(45deg);
        opacity: 0;
    }

    to {
        transform: scale(1) rotate(45deg);
        opacity: 1;
    }
`;

const firstLineAnimation = keyframes`
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const secondLineAnimation = keyframes`
    from {
        transform: rotate(90deg) scale(0);
        opacity: 0;
    }

    to {
        transform: rotate(90deg) scale(1);
        opacity: 1;
    }
`;

const Error = styled.div`
    width: 20px;
    height: 20px;
    background-color: #ff4b4b;
    border-radius: 50%;
    position: relative;
    transform: rotate(45deg);
    animation: ${errorAnimation} 0.3s ease-in-out forwards;

    &:before,
    &:after {
        content: '';
        width: 14px;
        height: 2px;
        position: absolute;
        bottom: 9px;
        left: 3px;
        border-radius: 2px;
        background-color: #fff;
        animation: ${firstLineAnimation} 0.3s ease-in-out forwards;
        animation-delay: 140ms;
    }

    &:after {
        transform: rotate(90deg);
        animation: ${secondLineAnimation} 0.3s ease-in-out forwards;
        animation-delay: 180ms;
    }
`;

export default Error;
