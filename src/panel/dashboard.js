import config from "config:github-pages-deploy";
import React from 'react'

import {
    Container,
    Card,
    Heading,
    Stack,
    Button,
    Inline,
} from '@sanity/ui'

console.log('config', config);

class DeployButton extends React.Component {
    /**
     * @param repo of shape owner/name
     */
    triggerDeployment(repo) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.github.com/repos/${repo}/dispatches`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${config.token}`);
        xhr.send('{"event_type": "Deploy triggered from Sanity Studio"}');
    }


    render() {
        return (
            <Button
                fontSize={[2, 2, 3]}
                onClick={() => this.triggerDeployment(this.props.repo)}
                mode="ghost"
                padding={[3, 3, 4]}
                text={`Deploy ${this.props.repo}`}
                key={this.props.repo}
            />
        )
    }
}

class Dashboard extends React.Component {

    render() {
        const buttons = config.repositories.map((repo, index) => {
            return (<DeployButton repo={repo} key={index} />)
        });

        return (
            <Container width={3}>
                <Card padding={4}>
                    <Stack space={3}>
                        <Heading marginBottom={2}>Github Pages Deploy</Heading>
                        <Inline space={[3, 3, 4]}>
                            {buttons}
                        </Inline>
                    </Stack>
                </Card>
            </Container>
        )
    }
}


export default Dashboard
