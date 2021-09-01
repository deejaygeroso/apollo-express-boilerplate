### v1.8.0 (July 2021)
- Added .prettierrc config.
- Added new glabal constant object for the list status codes.
- Moved AuthService to globa/lib directory.
- Refactored mongoose initialization.
- Refactored Server class.
- Removed some unused methods under global/functions directory.
- Renamed global/utilities directory to global/lib.  

### v1.7.0 (July 2021)

- Added readme and release documentation.
- Added processENV global variable. This will let us identify what processENV is used in our application.
- Added mongooseCollections global variable.
- Updated user queries, mutations and type definitions.
- Updated all packages to its latest versions. Nothing was broken upon the upgrade.
- Updated some deprecated typescript-eslint rules in eslint config.
- Updated type definitions on interfaces directory.
- Updated ActiveRecord Class to v1.1.0.
- Updated Logger Class to v1.0.0.
- Updated mongoose to v5.13.2.
- Updated @types/node: 15.14.1 (Downgrade from 16.3.1) since mongoose is dependent on v15.
- Removed body-parser package since its deprecated and already built in to express v4.
- Removed unused timeZone global variable.
- Removed unused codes.
- Removed gitlab-ci.yml.
- Removed pageSourceTracker from config/scripts/ directory.

### v1.6.0 (June 2020)

- Copied application architecture from my adally-server project.
