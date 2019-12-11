import React, { useEffect } from 'react';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';
import { Main } from '@redhat-cloud-services/frontend-components';
import { IntlProvider } from 'react-intl';

import Routes from './Routes';
import './App.scss';

const App = (props) => {
    useEffect(() => {
        insights.chrome.init();
        try {
            insights.chrome.identifyApp('sources');
        } catch (_exception) {
            // eslint-disable-next-line no-console
            console.warn('Failed to initialize chrome navigation.');
        }
    }, []);

    return (
        <IntlProvider locale="en">
            <React.Fragment>
                <NotificationsPortal />
                <Main style={ { padding: 0 } } >
                    <Routes childProps={props} />
                </Main>
            </React.Fragment>
        </IntlProvider>
    );
};

export default App;
