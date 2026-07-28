import Head from 'next/head';
import React from 'react';
import { DocSectionNav } from '../../components/doc/common/docsectionnav';
import { DocSections } from '../../components/doc/common/docsections';
import { ClassesDoc } from '../../components/doc/animationduration/classesdoc';
import { ExamplesDoc } from '../../components/doc/animationduration/examples';

const PositionPage = () => {
    const docs = [
        {
            id: 'classes',
            label: 'Classes',
            component: ClassesDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            component: ExamplesDoc
        }
    ];

    return (
        <div>
            <Head>
                <title>Animation Duration - Mantle Flex</title>
                <meta name="description" content="Mantle Flex Animation Duration defines how long an animation should take to complete." />
            </Head>
            <div className="doc">
                <div className="doc-main">
                    <div className="doc-intro">
                        <h1>Animation Duration</h1>
                        <p>
                            Defines how long an animation should take to complete. Under{' '}
                            <code>prefers-reduced-motion: reduce</code>, utilities above 150ms are capped at 150ms.
                        </p>
                    </div>
                    <DocSections docs={docs} />
                </div>
                <DocSectionNav docs={docs} />
            </div>
        </div>
    );
};

export default PositionPage;
