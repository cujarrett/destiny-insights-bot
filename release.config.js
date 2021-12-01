const changelogTitle = `# Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).`

module.exports = {
  branches: ["main"],
  tagFormat: "v${version}",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "conventionalcommits",
      releaseRules: [{
        type: "chore",
        release: "patch"
      }]
    }],
    "@semantic-release/release-notes-generator", {
      preset: "conventionalcommits",
      presetConfig: {
        types: [
          { type: "feat", section: "Features" },
          { type: "fix", section: "Bug Fixes" },
          { type: "chore", hidden: false },
          { type: "docs", hidden: false },
          { type: "style", hidden: false },
          { type: "refactor", hidden: false },
          { type: "perf", hidden: false },
          { type: "test", hidden: false }
        ]
      }
    },
    ["@semantic-release/npm", { npmPublish: false }],
    ["@semantic-release/changelog", { changelogTitle }],
    "@semantic-release/git",
    "@semantic-release/github",
    ["@semantic-release/exec", {
      verifyReleaseCmd: "echo \"VERSION=${nextRelease.version}\" > RELEASE.env"
    }]
  ],
  debug: true
}
