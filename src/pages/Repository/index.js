import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabList, Tab } from 'react-tabs';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';

import { Loading, Owner, IssueList, Label } from './styles';
import 'react-tabs/style/react-tabs.css';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    page: 1,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    handleTab = async (index, lastIndex) => {
        if (index !== lastIndex) {
            let state = '';
            if (index === 0) state = 'open';
            else if (index === 1) state = 'closed';
            else if (index === 2) state = 'all';

            const { match } = this.props;

            const repoName = decodeURIComponent(match.params.repository);

            const response = await api.get(`/repos/${repoName}/issues`, {
                params: { state },
            });

            this.setState({ issues: response.data });
        }
    };

    render() {
        const { repository, issues, loading } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <Tabs onSelect={this.handleTab}>
                    <TabList>
                        <Tab>Abertas</Tab>
                        <Tab>Fechadas</Tab>
                        <Tab>Todas</Tab>
                    </TabList>
                </Tabs>
                <IssueList>
                    {issues.map((issue) => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map((label) => (
                                        <Label color={label.color}>
                                            {label.name}
                                        </Label>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}
