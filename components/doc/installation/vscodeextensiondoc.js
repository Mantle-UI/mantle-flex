import { DocSectionText } from '../common/docsectiontext';

export function VSCodeExtensionDoc(props) {
    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Community editor extensions may provide code completion and snippets for Mantle Flex utility classes. Check your editor marketplace for Mantle Flex support.
                </p>
            </DocSectionText>
        </>
    );
}
