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