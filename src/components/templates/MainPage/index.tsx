import { Footer } from '../../organisms/Footer';
import { Header } from '../../organisms/Header';
import { Main } from '../../organisms/Main';
import { Wrapper } from '../Wrapper';

import bg from '../../../assets/images/bg.png';

export const MainPage = () => {
    return (
        <div
            className="lg:bg-contain  bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Header logged={true} />
            <Wrapper>
                <Main />
            </Wrapper>
            <Footer />
        </div>
    );
};
