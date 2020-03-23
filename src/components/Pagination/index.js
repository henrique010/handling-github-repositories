import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Container, IndexButton } from './styles';

export default class Pagination extends Component {
    static propTypes = {
        pageIndexes: PropTypes.shape([]).isRequired,
    };

    state = {
        indexSelected: 1,
    };

    handleSelectedIndex = (index) => {
        this.setState({
            indexSelected: index,
        });
    };

    render() {
        const { pageIndexes } = this.props;
        const { indexSelected } = this.state;
        return (
            <Container>
                {pageIndexes.map((index) => (
                    <li key={index}>
                        <IndexButton
                            onClick={() => this.handleSelectedIndex(index)}
                            selected={index === indexSelected && true}
                        >
                            {index}
                        </IndexButton>
                    </li>
                ))}
            </Container>
        );
    }
}
