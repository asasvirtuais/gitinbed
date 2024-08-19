> Git in bed or get embedded

Creates, updates, and removes embeddings of the repository files based on GIT A (Added Files), M (Modified Files), R (Removed Files), using Voyage and Pinecone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/asasvirtuais/gitinbed.svg)](https://GitHub.com/asasvirtuais/gitinbed/releases/)

### Usage example with Workflow file

.github/workflows/git-repo-embed.yml
```.yml
name: gitinbed

on:
  push:
    branches:
      - main

jobs:
  update-embeddings:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Get changed files
      id: changed-files
      uses: tj-actions/changed-files@v44

    - name: Update Embeddings
      uses: asasvirtuais/gitinbed@main
      env:
        VOYAGE_MODEL: voyage-large-2-instruct
        PINECONE_INDEX: ${{ github.repository_owner }}
        PINECONE_NAMESPACE: ${{ github.event.repository.name }}
        PINECONE_API_KEY: ${{ secrets.PINECONE_API_KEY }}
        VOYAGE_API_KEY: ${{ secrets.VOYAGE_API_KEY }}
      with:
        created: ${{ steps.changed-files.outputs.added_files }}
        updated: ${{ steps.changed-files.outputs.modified_files }}
        removed: ${{ steps.changed-files.outputs.deleted_files }}
```

### Pinecone results:
![asasvirtuais-Pinecone-Console](https://github.com/user-attachments/assets/6ed20d9e-f541-417e-a868-031159dab564)
