import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Container, IndexButton } from './styles';

export default class Pagination extends Component {
    static propTypes = {
        pageIndexes: PropTypes.shape([]).isRequired,
        paginate: PropTypes.func.isRequired,
    };

    state = {
        indexSelected: 1,
    };

    handleSelectedIndex = (newIndexSelected) => {
        const { paginate } = this.props;
        this.setState({
            indexSelected: newIndexSelected,
        });

        paginate(newIndexSelected);
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
