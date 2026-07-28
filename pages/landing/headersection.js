import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { useEffect, useRef, useState } from 'react';

const HeaderSection = (props) => {
    const [menuActive, setMenuActive] = useState(false);
    const colorSchemeIcon = classNames('pi', { 'pi-sun': props.dark, 'pi-moon': !props.dark });
    const containerElement = useRef(null);
    const headerClassName = classNames('landing-header-section', { 'landing-header-active': menuActive });

    useEffect(() => {
        const onScroll = () => containerElement.current?.classList.toggle('landing-header-sticky', window.scrollY > 0);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section ref={containerElement} className={headerClassName}>
            <div className="landing-header-container flex justify-content-between align-items-center">
                <div className="landing-header-left">
                    <Link href="/" className="header-logo" aria-label="Mantle Flex home">Mantle Flex</Link>
                </div>
                <div className="landing-header-right flex align-items-center">
                    <nav className="scalein origin-top">
                        <ol className="list-none m-0 p-0 flex md:flex-row flex-column lg:align-items-center font-semibold">
                            <li className="mr-1"><Link href="/installation">Docs</Link></li>
                            <li className="mr-1"><a href="https://github.com/Mantle-UI/mantle-flex" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ol>
                    </nav>
                    <button type="button" className="linkbox border-none header-button mx-1 inline-flex align-items-center justify-content-center mr-1 cursor-pointer" onClick={() => props.onToggleColorScheme()} aria-label="Toggle color scheme">
                        <i className={colorSchemeIcon}></i>
                    </button>
                    <a href="https://discord.gg/BGs6EkpnDv" target="_blank" rel="noopener noreferrer" className="linkbox header-button flex align-items-center justify-content-center flex-shrink-0" aria-label="Mantle UI Discord"><i className="pi pi-discord"></i></a>
                    <a href="https://github.com/Mantle-UI/mantle-flex" target="_blank" rel="noopener noreferrer" className="linkbox header-button mr-1 flex align-items-center justify-content-center flex-shrink-0" aria-label="Mantle Flex on GitHub"><i className="pi pi-github"></i></a>
                    <button type="button" className="linkbox header-button inline-flex align-items-center justify-content-center lg:hidden menu-button" onClick={() => setMenuActive(!menuActive)} aria-label="Toggle navigation"><i className="pi pi-bars"></i></button>
                </div>
            </div>
        </section>
    );
};

export default HeaderSection;
