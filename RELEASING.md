# Releasing Mantle Flex

Releases are started manually from the `Release` GitHub Actions workflow on `main`.

The workflow determines the next version from merged pull requests since the
latest Mantle release tag:

- `breaking-change` label: major
- linked issue type `feature`: minor
- linked issue type `bug`: patch

Mantle Flex continues from the upstream `3.3.1` tag and starts Mantle releases
at `3.4.0`. Run the first release with `initial_release` enabled. Later releases
calculate the next version from merged changes after the `v3.4.0` Mantle tag.

Before the first release, configure:

- repository variable `RELEASE_ALLOWED_ACTORS`
- repository variable `RELEASE_APP_CLIENT_ID`
- repository secret `RELEASE_APP_PRIVATE_KEY`
- protected `release` environment
- GitHub App with repository contents write access and ruleset bypass access
- npm Trusted Publisher for `@mantle-ui/flex` and this repository workflow

Publishing runs from the `Publish to npm` workflow after a GitHub Release is
published. It builds and publishes `dist-lib` with npm provenance, without a
stored npm token.
