import styled, { css } from 'styled-components';

export const Container = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
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
    background: #eee;
    border: 1px solid #ddd;

    ${(props) =>
        props.selected
            ? css`
                  background: #7159c1;
                  color: #fff;
              `
            : css`
                  background: #eee;
              `}

    &:hover {
        background: #7159c1;
        color: #fff;
    }
`;
