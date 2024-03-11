# actions

Reusable GitHub Actions and workflows that can be used to implement [`static`](https://github.com/from-static) application design patterns.


## Available Workflows

### `static`

[.github/workflows/static.yml](./.github/workflows/static.yml)

This is the core workflow that can be used to implement a `static` application design pattern. It uses the `static` action to build and deploy a static website to GitHub Pages.

### Usage

```yaml
name: static
on:
  # Runs on pushes to "main"
  push:
    branches:
      - main
  # Allows manual dispatch
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "static"
  cancel-in-progress: false

jobs:
  static:
    uses: from-static/actions/.github/workflows/static.yml@main
```

### Workflow Injected Properties

The `static` workflow injects the following properties into the provided `static.json` file during the build process:


- Sourced from [`actions/configure-pages@4`](https://github.com/actions/configure-pages/blob/1f0c5cde4bc74cd7e1254d0cb4de8d49e9068c7d/action.yml#L22)
  - `_static.base_url`
    - GitHub Pages site full base URL.
    - Exampls: `"https://from-static.github.io/static-resume"`, `"https://www.example.com"`
  - `_static.origin`
    - GitHub Pages site origin.
    - Example: `"https://from-static.github.io"`, `"https://www.example.com"`
  - `_static.host`
    - GitHub Pages site host.
    - Example: `"from-static.github.io"`, `"www.example.com"`
  - `_static.base_path`
    - GitHub Pages site full base path.
    - Example: `"/static-resume"`, `""`