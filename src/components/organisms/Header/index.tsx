import { Logo } from '../../atoms/Icons/Logo';
import { Nav } from '../../molecules/Nav';
import { MobileMenu } from '../../molecules/MobileMenu';
import { SteamButton } from '../../molecules/SteamButton';
import { ProfileButton } from '../../molecules/ProfileButton';
import { ThemeToggle } from '../../atoms/ThemeToggle';
import { LanguageToggle } from '../../atoms/LanguageToggle';
import { CartButton } from '../../atoms/CartButton';
import { useAuth } from '../../../auth/useAuth';

export const Header = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <header className="sticky top-0 z-30 border-b border-border/70 glass">
            <nav className="container flex items-center justify-between py-3">
                <Logo />
                <Nav />
                <div className="hidden lg:flex items-center gap-1">
                    <ThemeToggle />
                    <LanguageToggle />
                    <CartButton />
                    {!isLoading &&
                        (isAuthenticated ? <ProfileButton /> : <SteamButton />)}
                </div>
                <div className="flex items-center gap-1 lg:hidden">
                    <CartButton />
                    <MobileMenu />
                </div>
            </nav>
        </header>
    );
};
