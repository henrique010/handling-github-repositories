import styled, { css } from 'styled-components';

export const Container = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    flex-wrap: wrap;

    li {
        margin: 2px 4px;
    }
`;

export const IndexButton = styled.button.attrs({
    type: 'button',
})`
    padding: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #eee;
    font-weight: 600;
    border: 1px solid #fff;

    ${(props) =>
        props.selected
            ? css`
                  background: #7159c1;
                  color: #fff;
                  width: 44px;
                  height: 44px;
              `
            : css`
                  background: #eee;
              `}

    &:hover {
        background: #7159c1;
        color: #fff;
    }
`;
