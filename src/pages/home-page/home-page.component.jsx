import React from 'react';
import Directory from './../../components/directory/directory.component';
import { HomePageContainer } from './home-page.styles';

const HomePage = ({ history }) => {
    return (
        <HomePageContainer>
            <Directory history={history} />
        </HomePageContainer>
    );
}

export default HomePage;