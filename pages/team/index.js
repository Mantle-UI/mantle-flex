import Head from 'next/head';

export default function Team() {
    return (
        <>
            <Head>
                <title>About Mantle Flex</title>
                <meta name="description" content="Mantle Flex is maintained by the Mantle UI community." />
            </Head>
            <div className="doc-main">
                <h1>About Mantle Flex</h1>
                <p>Mantle Flex is an independent, community-maintained CSS utility library in the Mantle UI ecosystem.</p>
                <p>It continues the established utility-class API while the community maintains the project, documentation, and future direction in the open.</p>
                <p>
                    Join the conversation on <a href="https://discord.gg/BGs6EkpnDv" target="_blank" rel="noopener noreferrer">Discord</a> or contribute through the <a href="https://github.com/Mantle-UI/mantle-flex" target="_blank" rel="noopener noreferrer">Mantle Flex repository</a>.
                </p>
            </div>
        </>
    );
}
