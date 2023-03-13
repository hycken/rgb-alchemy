import React from 'react';
import { Settings } from '../models/Settings';
import { GameView } from '../components/GameView';

enum LoadingState {
    Loading = 'Loading',
    Loaded = 'Loaded',
    Failed = 'Failed'
}

interface GameLoaderState {
    userId?: string
    settings?: Settings
    state: LoadingState
}

// Loads the initial settings from the server. 
export class GameLoader extends React.Component<{}, GameLoaderState> {
    state = {
        userId: undefined,
        settings: undefined,
        state: LoadingState.Loading
    }

    componentDidMount() {
        this.loadGame()
    }

    async loadGame() {
        let host = window.location.hostname;
        let url: string
        if (this.state.userId) {
            url = `http://${host}:9876/init/user/${this.state.userId}`;
        } else {
            url = `http://${host}:9876/init`;
        }
        try {
            const response = await fetch(url);
            const result = await response.json() as Settings

            if (!result.userId) { throw Error(); }

            this.setState({
                userId: result.userId,
                settings: result,
                state: LoadingState.Loaded
            });

        } catch {
            this.setState({ state: LoadingState.Failed });
        }
    }

    restart(): void {
        this.setState({ settings: undefined }, () => {
            this.loadGame();
        });
    }

    render() {
        switch (this.state.state) {
            case LoadingState.Loading:
                return <section>Loading...</section>;
            case LoadingState.Failed:
                return <section>API failed to respond.</section>;
            case LoadingState.Loaded:
                if (!this.state.settings) { return <section>No settings found.</section>; }
                return <GameView settings={this.state.settings} restart={this.restart.bind(this)}></GameView >
        }
    }
}