import styled, { keyframes } from 'styled-components';

const successAnimation = keyframes`
    0% {
        height: 0;
        width: 0;
        opacity: 0;
    }
    40% {
        height: 0;
        width: 6px;
        opacity: 1;
    }
`;

const successAnimationCircle = keyframes`
    from {
        transform: scale(0) rotate(45deg);
        opacity: 0;
    }

    to {
        transform: scale(1) rotate(45deg);
        opacity: 1;
    }
`;

const Success = styled.div`
    width: 20px;
    height: 20px;
    background-color: #61d345;
    border-radius: 50%;
    transform: rotate(45deg);
    position: relative;
    animation: ${successAnimationCircle} 0.3s ease-in-out forwards;

    &:after {
        content: '';
        box-sizing: border-box;
        border-right: 2px solid;
        border-bottom: 2px solid;
        animation: ${successAnimation} 0.3s ease-in-out forwards;
        border-color: #fff;
        height: 10px;
        width: 6px;
        position: absolute;
        bottom: 6px;
        left: 7px;
    }
`;

export default Success;
