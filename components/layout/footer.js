import pkg from '../../package.json';

export default function Footer() {
    const version = pkg.version;

    return (
        <div className="layout-footer">
            <div>
                <span>Mantle Flex {version} · </span>
                <a href="https://github.com/Mantle-UI/mantle-flex" target="_blank" rel="noopener noreferrer">Open source on GitHub</a>
            </div>
        </div>
    );
}
