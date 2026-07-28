import Head from 'next/head';
import { classNames } from '@mantle-ui/react/utils';
import NewsSection from '../components/news/newssection';
import FooterSection from './landing/footersection';
import HeaderSection from './landing/headersection';
import HeroSection from './landing/herosection';

export default function Home(props) {
    const rootClassName = classNames('landing', { 'landing-light': !props.dark, 'landing-dark': props.dark, 'landing-news-active': props.newsActive });

    const toggleColorScheme = () => {
        props.onThemeChange(!props.dark);
    };

    return (
        <div className={rootClassName}>
            <Head>
                <title>Mantle Flex - Utility-First CSS Library</title>
                <meta charSet="UTF-8" />
                <meta name="description" content="Mantle Flex is a utility-first CSS library for responsive web interfaces." />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mantle Flex | Utility-First CSS Library" />
                <meta name="twitter:description" content="Mantle Flex is a utility-first CSS library for responsive web interfaces." />
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Mantle Flex - Utility-First CSS Library"></meta>
                <meta property="og:url" content="https://mantle-ui.github.io/mantle-flex/"></meta>
                <meta property="og:description" content="Mantle Flex is a utility-first CSS library for responsive web interfaces." />
                <meta property="og:ttl" content="604800"></meta>
                <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg`} type="image/svg+xml"></link>
            </Head>
            <div className="landing-intro">
                {props.newsActive && <NewsSection announcement={props.announcement} onClose={props.onNewsClose} />}
                <HeaderSection dark={props.dark} onToggleColorScheme={toggleColorScheme} />
                <HeroSection />
            </div>
            <FooterSection dark={props.dark} />
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return page;
};
