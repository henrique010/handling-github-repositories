import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, InputSubmit } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
        errorMessage: '',
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = (event) => {
        this.setState({ newRepo: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.setState({ loading: true });

            const { newRepo, repositories, error } = this.state;

            const response = await api.get(`/repos/${newRepo}`);

            const repositoryExists = repositories.find(
                (repository) => repository.name === newRepo
            );

            if (repositoryExists) {
                this.setState({
                    errorMessage: 'Repositório já foi adicionado',
                });
                throw new Error('Repositório duplicado');
            }

            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                error: error && false,
                errorMessage: error && '',
            });
        } catch (response) {
            const { errorMessage } = this.state;
            this.setState({
                loading: false,
                error: true,
                newRepo: '',
                errorMessage:
                    errorMessage.length > 0
                        ? errorMessage
                        : 'Respositório não encontrado',
            });
        }
    };

    render() {
        const {
            newRepo,
            repositories,
            loading,
            error,
            errorMessage,
        } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <InputSubmit
                        error={error}
                        errorMessage={errorMessage}
                        type="text"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton disa loading={loading}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories &&
                        repositories.map((repository) => (
                            <li key={repository.name}>
                                <span>{repository.name}</span>
                                <Link
                                    to={`/repository/${encodeURIComponent(
                                        repository.name
                                    )}`}
                                >
                                    Detalhes
                                </Link>
                            </li>
                        ))}
                </List>
            </Container>
        );
    }
}
