import styled from 'styled-components';

const Warn = styled.div`
    width: 20px;
    height: 20px;
    background-color: #e6a23c;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:before,
    &:after {
        content: '';
        display: block;
        width: 3px;
        background-color: #fff;
    }

    &:before {
        height: 8px;
        border-radius: 2px;
    }

    &:after {
        height: 3px;
        border-radius: 50%;
        margin-top: 2px;
    }
`;

export default Warn;
