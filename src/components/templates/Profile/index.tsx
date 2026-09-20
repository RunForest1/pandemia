import { Footer } from '../../organisms/Footer';
import { Header } from '../../organisms/Header';
import { RightSide } from '../../organisms/RightSide';
import { Wrapper } from '../Wrapper';

export const Profile = () => {
    return (
        <div className="bg-surface min-h-screen">
            <Header />
            <Wrapper>
                <RightSide />
            </Wrapper>
            <Footer />
        </div>
    );
};
