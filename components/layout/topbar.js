import { DocSearch } from '@docsearch/react';
import { classNames } from '@mantle-ui/react/utils';
import { useEffect, useRef } from 'react';

export default function Topbar(props) {
    const colorSchemeIcon = classNames('pi', { 'pi-sun': props.dark, 'pi-moon': !props.dark });

    const onMenuButtonClick = () => {
        props.onMenuButtonClick();
    };

    const changeColorScheme = () => {
        props.onToggleColorScheme();
    };

    const handleDocSearchTransformItems = (items) => {
        const isLocalhost = process.env.NODE_ENV !== 'production';

        return items.map((item) => {
            if (isLocalhost) {
                const url = new URL(item.url);

                url.protocol = window.location.protocol;
                url.hostname = window.location.hostname;
                url.port = window.location.port;
                url.pathname = url.pathname.replace(/^\/mantle-flex(?=\/|$)/, '') || '/';
                item.url = url.toString();
            }

            return item;
        });
    };

    const containerElement = useRef(null);
    const scrollListener = useRef();

    const bindScrollListener = () => {
        scrollListener.current = () => {
            if (containerElement && containerElement.current) {
                if (window.scrollY > 0) containerElement.current.classList.add('layout-topbar-sticky');
                else containerElement.current.classList.remove('layout-topbar-sticky');
            }
        };

        window.addEventListener('scroll', scrollListener.current);
    };

    const unbindScrollListener = () => {
        if (scrollListener.current) {
            window.removeEventListener('scroll', scrollListener.current);
            scrollListener.current = null;
        }
    };

    useEffect(() => {
        bindScrollListener();

        return function unbind() {
            unbindScrollListener();
        };
    }, []);

    return (
        <div ref={containerElement} className="layout-topbar">
            <div className="layout-topbar-inner">
                <button type="button" className="link-button menu-button" onClick={onMenuButtonClick} aria-haspopup aria-label="Menu" style={{ borderColor: 'var(--menu-border-color)' }}>
                    <i className="pi pi-bars"></i>
                </button>
                <span className="font-bold text-xl text-900">Mantle Flex</span>

                <ul className="flex list-none m-0 p-0 gap-2 align-items-center ml-2">
                    <li>
                        <DocSearch
                            appId="473OAGLWFO"
                            apiKey="b4dc5205df58e30da26b455573a41c24"
                            indexName="Mantle Flex Docs"
                            debug={false}
                            transformItems={handleDocSearchTransformItems}
                        />
                    </li>
                    <li>
                        <a
                            className="flex link-button border-1 border-solid w-2rem h-2rem  border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            onClick={changeColorScheme}
                            style={{ borderColor: 'var(--menu-border-color)' }}
                        >
                            <i className={classNames('text-700', colorSchemeIcon)}></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/Mantle-UI/mantle-flex"
                            className="flex link-button border-1 border-solid w-2rem h-2rem border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            style={{ borderColor: 'var(--menu-border-color)' }}
                        >
                            <i className="pi pi-github text-700"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://discord.gg/BGs6EkpnDv"
                            className="flex link-button border-1 border-solid w-2rem h-2rem  border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            style={{ borderColor: 'var(--menu-border-color)' }}
                        >
                            <i className="pi pi-discord text-700"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
