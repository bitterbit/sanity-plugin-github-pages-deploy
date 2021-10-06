import config from "config:github-pages-deploy";
import React from 'react'

console.log('config', config);

class Button extends React.Component {
    /**
     * @param repo of shape owner/name
     */
    triggerDeployment(repo) {
        console.log('trigger deployment', repo);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            console.log('state change');
        }

        xhr.open('POST', `https://api.github.com/repos/${repo}/dispatches`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${config.token}`);
        xhr.send('{"event_type": "Deploy triggered from Sanity Studio"}');
    }

    render() {
        return (
            <button onClick={() => this.triggerDeployment(this.props.repo)}>Deploy {this.props.repo}</button>
        )
    }
}

class Dashboard extends React.Component {
    render() {

        console.log('repositories', config.repositories);
        const buttons =  config.repositories.map((repo) => {
            return (<Button repo={repo} />)
        });

        console.log('buttons?', buttons);

        return (
            <div>
                <p>This is a blank slate for you to build on.</p>
                <p>Tools are just React components!</p>
                {buttons}
            </div>
        )
    }
}


export default Dashboard
