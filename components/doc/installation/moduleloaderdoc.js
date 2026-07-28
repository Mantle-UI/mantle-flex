import { DocSectionCode } from '../common/docsectioncode';
import { DocSectionText } from '../common/docsectiontext';

export function ModuleLoaderDoc(props) {
    const code1 = `
npm install @mantle-ui/flex
                `;

    const code2 = `
/node_modules/@mantle-ui/flex/mantleflex.css
            `;

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Mantle Flex is available at <a href="https://www.npmjs.com/package/@mantle-ui/flex">NPM</a> for usage with a module bundler such as webpack.
                </p>
            </DocSectionText>
            <DocSectionCode code={code1} import />
            <DocSectionText>
                <p>After installation you may include the library by importing from node_modules.</p>
            </DocSectionText>

            <DocSectionCode code={code2} import />
        </>
    );
}
