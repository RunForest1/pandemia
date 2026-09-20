import { Footer } from '../../organisms/Footer';
import { Header } from '../../organisms/Header';
import { Hero } from '../../organisms/Hero';
import { Main } from '../../organisms/Main';
import { Wrapper } from '../Wrapper';

export const MainPage = () => {
    return (
        <div className="bg-surface">
            <Header />
            <Hero />
            <Wrapper>
                <Main />
            </Wrapper>
            <Footer />
        </div>
    );
};
