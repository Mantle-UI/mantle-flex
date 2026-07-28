import { DocSectionCode } from '../common/docsectioncode';
import { DocSectionText } from '../common/docsectiontext';

export function LoadFromCDNDoc(props) {
    const code = `<link rel="stylesheet" href="https://unpkg.com/@mantle-ui/flex@latest/mantleflex.css">
    `;

    return (
        <>
            <DocSectionText {...props}>
                <p>Mantle Flex can also be loaded from a CDN using a link tag.</p>
            </DocSectionText>
            <DocSectionCode code={code} />
        </>
    );
}
