import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const OptionContainerStyles = css`
    padding: 10px 15px;
    &:hover {
        cursor: cursor;
        font-weight: bold;
    }
`;

export const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`; // margin-bottom: 25px;

export const LogoContainer = styled(Link)`
    display: flex;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    margin-left: 15px;
`;

export const OptionsContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`; // width: 50%;

export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;