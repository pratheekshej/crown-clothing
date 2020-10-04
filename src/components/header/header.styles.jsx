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
    // margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)``;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;