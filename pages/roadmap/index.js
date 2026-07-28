import Head from 'next/head';

export default function Roadmap() {
    return (
        <>
            <Head>
                <title>Mantle Flex Roadmap</title>
                <meta name="description" content="The public roadmap for Mantle Flex." />
            </Head>
            <div className="doc-main">
                <h1>Roadmap</h1>
                <p>Mantle Flex development is guided by community needs and compatibility with the existing utility API.</p>
                <h2>Current priorities</h2>
                <ul>
                    <li>Maintain a reliable, documented release process.</li>
                    <li>Improve the documentation experience and accessibility.</li>
                    <li>Address bugs and compatibility issues reported by users.</li>
                    <li>Evaluate new utilities through open issues and community discussion.</li>
                </ul>
                <p>Propose or follow work in the <a href="https://github.com/Mantle-UI/mantle-flex/issues" target="_blank" rel="noopener noreferrer">issue tracker</a>.</p>
            </div>
        </>
    );
}
