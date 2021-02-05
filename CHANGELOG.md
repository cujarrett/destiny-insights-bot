# Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.23.2](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.23.1...v1.23.2) (2021-02-05)


### Bug Fixes

* **deps-dev:** bump semantic-release from 17.3.1 to 17.3.7 ([f0f5505](https://github.com/cujarrett/banshee-44-mods-bot/commit/f0f55052e8c16ab3839c39119c84f8233fdc20c1))

## [1.23.1](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.23.0...v1.23.1) (2021-02-04)


### Bug Fixes

* commit message config ([12f7ea2](https://github.com/cujarrett/banshee-44-mods-bot/commit/12f7ea2b3599ee056bd0493bf32e6b66134e9da1))

# [1.23.0](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.22.0...v1.23.0) (2021-01-25)


### Features

* switches default branch to main ([ab3991f](https://github.com/cujarrett/banshee-44-mods-bot/commit/ab3991f54d5e4a82283a532d870266c118f2f667))

# [1.22.0](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.7...v1.22.0) (2021-01-11)


### Features

* pushes tweet back one min ([3346507](https://github.com/cujarrett/banshee-44-mods-bot/commit/3346507b799c618ba30869327d96d001277170ab))

## [1.21.7](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.6...v1.21.7) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release after tag ([d785d6f](https://github.com/cujarrett/banshee-44-mods-bot/commit/d785d6fe2768e1f6ed9955e5362667bbbecc3da2))

## [1.21.6](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.5...v1.21.6) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release after tag ([adf442d](https://github.com/cujarrett/banshee-44-mods-bot/commit/adf442d0326c42fc11e8e64ddf1fbb22d2553286))

## [1.21.5](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.4...v1.21.5) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release after tag ([3dbabb1](https://github.com/cujarrett/banshee-44-mods-bot/commit/3dbabb1d39337407be784c341c43dea991ef6ef7))

## [1.21.4](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.3...v1.21.4) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release after tag ([c13ab04](https://github.com/cujarrett/banshee-44-mods-bot/commit/c13ab04e1a8e42566c13a4de23a9bf5c0438a404))

## [1.21.3](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.2...v1.21.3) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release order ([a963365](https://github.com/cujarrett/banshee-44-mods-bot/commit/a963365777d5b11f5e60282cbc267bb32da43146))

## [1.21.2](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.1...v1.21.2) (2021-01-11)


### Bug Fixes

* **cicd:** fixes release order ([79a6851](https://github.com/cujarrett/banshee-44-mods-bot/commit/79a68511787fa5240def55de6deccdaeec68addc))

## [1.21.1](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.21.0...v1.21.1) (2021-01-11)


### Bug Fixes

* **semantic-release:** fixes package automation ([dd96128](https://github.com/cujarrett/banshee-44-mods-bot/commit/dd961287e7a99c12bf2eae326f6ab7a58b04d142))

# [1.21.0](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.20.0...v1.21.0) (2021-01-11)


### Features

* cleans up build after adding semantic-release ([4703847](https://github.com/cujarrett/banshee-44-mods-bot/commit/4703847e0aa534c380dfa15d227d7bf0636db0b7))

# [1.20.0](https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.19.0...v1.20.0) (2021-01-11)

### Features

* **semantic-release:** adds semantic-release ([062f471](https://github.com/cujarrett/banshee-44-mods-bot/commit/062f4716be263cd4a1e4344de48cd0cda72a45f6))

## [v1.19.0] - 2020-12-11
### Changed
- :wrench: Migrates to AWS Param Store from AWS Secrets Manager
- :arrow_up: Updated dependencies

## [v1.18.0] - 2020-11-27
### Changed
- :wrench: Added point in time recovery for DynamoDB database

## [v1.17.0] - 2020-10-18
### Changed
- :wrench: Updated Braytech endpoint from upstream change
- :arrow_up: Updated dependencies

## [v1.16.0] - 2020-09-22
### Changed
- :wrench: Updated DynamoDB Terraform to not destroy the database on `terraform destroy`
- :wrench: Reduced DynamoDB read and write capacity

## [v1.15.1] - 2020-09-22
### Fixed
- :bug: Fixed bug with missing current mods sold factored into tweets data as
  the mods are not entered into the database until after the tweet is successful

## [v1.15.0] - 2020-09-21
### Changed
- :wrench: Updated Lambda timeout from 30 seconds to 60 seconds

## [v1.14.2] - 2020-09-21
### Fixed
- :bug: Fixed bug with last sold dates by avoiding adding the mod to the
  database until after the tweet was successful

## [v1.14.1] - 2020-09-21
### Fixed
- :bug: Fixed bug with daily tweet call

## [v1.14.0] - 2020-09-20
### Changed
- :wrench: CI Tests & Access

## [v1.13.1] - 2020-09-12
### Fixed
- :bug: Fixes bug with historic context for each tweet

## [v1.13.0] - 2020-09-12
### Added
- :sparkle: Adds historic context for each tweet

## [v1.12.0] - 2020-08-29
### Changed
- :rocket: Adds Terraform and Terraform Cloud

## [v1.11.0] - 2020-07-31
### Changed
- :sparkle: Removed thanks for 3,000 followers on tomorrows scheduled tweet

## [v1.10.0] - 2020-07-30
### Changed
- :sparkle: Added thanks for 3,000 followers on tomorrows scheduled tweet

### Fixed
- :wrench: Fixed CI/CD to not build for production during non master branch runs

## [v1.9.2] - 2020-07-26
### Changed
- :arrow_up: Updated dependencies

## [v1.9.1] - 2020-03-26
### Changed
- :arrow_up: Updated dependencies

## [v1.9.0] - 2019-12-30
### Changed
- :rocket: Migrates from Heroku to AWS Lambda
- :rocket: Migrates to Circle CI for CI/CD

## [v1.8.0] - 2019-10-16
### Changed
- :arrow_up: Updated dependencies
- :alien: Updates CI/CD to accommodate GitHub Actions move from HCL to YML :/

## [v1.7.2] - 2019-07-13
### Changed
- :arrow_up: Updated dependencies

## [v1.7.1] - 2019-07-10
### Changed
- :arrow_up: Updated dependencies

## [v1.7.0] - 2019-06-28
### Updated
- :alien: Braytech API (:raised_hands:)
- :rocket: Migrates from Travis CI to GitHub Actions :tada:

## [v1.6.0] - 2018-11-24
### Added
- :alembic: npm script `start` to echo the app version, useful for when you want to check version deployed

## [v1.5.0] - 2018-11-24
### Changed
- :wrench: Braytech endpoint where mods are looked up from

## [v1.4.0] - 2018-11-14
### Changed
- :building_construction: Twitter Bot to tweet via `npm run tweet` and removes time from the conditions of when to tweet

## [v1.3.0] - 2018-11-13
### Changed
- :building_construction: Twitter Bot to be a function as a service called by a cron job rather than be up all the time - save the :evergreen_tree:

## [v1.2.0] - 2018-11-12
### Added
- :alembic: App pulse to app to ensure it's up

## [v1.1.0] - 2018-11-11
### Added
- :sparkles: More info on server side logs
- :alembic: startup script used after deployment

## [v1.0.0] - 2018-11-11
### Added
- :sparkles: Integration with Braytech to search Banshee mods for sale
- :sparkles: Integration with Twitter to post tweets
- :rocket: Continuous Integration pipeline config

[v1.19.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.18.0...v1.19.0
[v1.18.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.17.0...v1.18.0
[v1.17.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.16.0...v1.17.0
[v1.16.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.15.1...v1.16.0
[v1.15.1]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.15.0...v1.15.1
[v1.15.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.14.2...v1.15.0
[v1.14.2]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.14.1...v1.14.2
[v1.14.1]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.14.0...v1.14.1
[v1.14.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.13.1...v1.14.0
[v1.13.1]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.13.0...v1.13.1
[v1.13.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.12.0...v1.13.0
[v1.12.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.11.0...v1.12.0
[v1.11.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.10.0...v1.11.0
[v1.10.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.9.2...v1.10.0
[v1.9.2]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.9.1...v1.9.2
[v1.9.1]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.9.0...v1.9.1
[v1.9.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.8.0...v1.9.0
[v1.8.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.7.2...v1.8.0
[v1.7.2]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.7.1...v1.7.2
[v1.7.1]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.7.0...v1.7.1
[v1.7.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.6.0...v1.7.0
[v1.6.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.5.0...v1.6.0
[v1.5.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.4.0...v1.5.0
[v1.4.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.3.0...v1.4.0
[v1.3.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.2.0...v1.3.0
[v1.2.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/cujarrett/banshee-44-mods-bot/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/cujarrett/banshee-44-mods-bot/releases/tag/v1.0.0
