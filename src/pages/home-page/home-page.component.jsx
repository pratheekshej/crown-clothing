import React from 'react';
import Directory from './../../components/directory/directory.component';
import { HomePageContainer } from './home-page.styles';

const HomePage = ({ history }) => {
    window.scrollTo(0, 0);
    return (
        <HomePageContainer>
            <Directory history={history} />
        </HomePageContainer>
    );
}

export default HomePage;