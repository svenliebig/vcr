# Changelog

All notable changes to this project will be documented in this file.

## [0.9.2] - 17.10.2017

### Added

- fixed topbar
- bs.to link is now live, add it in the single series view
- stylings
- bugfix

## [0.9.3] - 18.10.2017

### Added

- performance update upgrade
- tabs for seasons in series view

## [0.9.4] - 18.10.2017

### Added

- Suche vorausgewählt beim auf die Seite gehen
- Serien Link von der Manage Seite, verbessertes Aussehen auf der Manage Seite

## [0.9.5] - 18.10.2017

### Added

- bs.to Link appends the season number
- season toggle now in front of episodes
- changelog

## [0.9.6] - 23.10.2017

### Added

- filter for animes or normal series by a dropdown
- fixed a bug where large animes wasn't toggleable
- fixed if not bs.to link, then dont append season (for example onepiece-tube)

## [0.9.7] - 24.10.2017

### Added

- fixed login didn't forward after an error

## [0.9.8] - 18.11.2017

### Added

- dayli update job for the series
- back - link from the view page
- link on image of the series to the view

### Removed

- Update All button, because there is a dayli job that updates all series at 1 AM EST
- All methods related to this feature
- link to the view series page, it is now available by clicking the image

## [0.9.9] - 19.11.2017

### Added

- toggle complete series in the board now
- restructured the complete project and replaced some duplicated code

### Removed

- Arrows in the board series navigation
- unused functions

## [0.9.10] - 23.11.2017

### Added

- PropTypes to some components

## [0.9.11] - 24.11.2017

### Added

- Implement a definition less file, to manage the colors in one file

## [0.9.12] - 25.11.2017

### Added

- Move the dropdown component into a subfolder of component
- Stylings outside of the dropdown.less

### Removed

- Color styling from dropdown.less, a component should not inherit his own colors
## [0.9.13] - 04.12.2017

### Added

- Travis + Docker + Codeclimate

## [0.9.14] - 12.12.2017

### Added

- New link for otaku stream
- CSS adjustments
- Project structure

## [0.9.15] - 13.12.2017

### Added

- Remove button in series view
- Test Coverage
- Test for toggleButton

## [0.9.16] - 14.12.2017


### Added

- Unit tests

### Fixed

- Bug where data was corrupted when season number -1 came from moviedb

## [0.9.17] - 16.12.2017


### Added

- Upgraded Dependencies in package.json
- Created a debug launch option for the unit tests

## [0.9.18] - 23.12.2017

### Fix

- New links got cleared when series was added again

## [0.9.19] - 14.01.2018

### Add

- Preferences Dialog

## [0.9.20] - 14.01.2018

### Add

- Integrate Compare to other users

## [0.9.21] - 14.01.2018

### Add

- Compare and Add

## [0.9.22] - 14.01.2018

### Fixed

- Button Toggles @Board

## [0.9.23] - 18.01.2018

### Added

- Enhanced tooltips for Episodes

## [0.9.24] - 19.01.2018

### Added

- Intgrate Jenkins and CD to http://tv.beta.slyox.de

## [0.9.25] - 20.01.2018

### Fixed

- Refactoring Code
- Removed some old console.log

## [0.9.26] - 21.01.2018

### Fixed

- Refactoring Code
- Removed some old console.log

## [0.9.27] - 21.01.2018

### Refactor

- removed console.log

## [0.9.28] - 21.01.2018

### feat

- create patch script

## [0.9.29] - 21.01.2018

### fix

- fix the converter from bstolink to links>bsto, he deleted the links after the 2nd load because he wrote empty bstolink in to links>bsto

## [0.9.30] - 21.01.2018

### refactor

- series filter system, using some instead of foreach to break the most iterations earlier

## [0.9.31] - 21.01.2018

### chore

- update the load cycle, so the series will get a new 'watched' flag when they are saved - now only series with open episodes are loaded

## [0.9.32] - 21.01.2018

### fix

- addSeries from managed did not set the completlyWatched Flag

## [0.9.33] - 21.01.2018

### fix

- loadtime consoles

## [0.9.34] - 22.01.2018

### feat

- implement message model
- implement message service

## [0.9.35] - 22.01.2018

### feat

- implement message frontend

## [0.9.36] - 23.01.2018

### fix

- couldnt toggle series that had no creator
- couldnt toggle series in view because missing converter

## [0.9.37] - 23.01.2018

### feat

- implement eventbus

## [0.9.38] - 23.01.2018

### feat

- implement eventhandler

## [0.9.39] - 23.01.2018

### refactor

- using eventhandler for the most repository calls, living the singleton pattern \o/

## [0.9.40] - 23.01.2018

### refactor

- Login and InputText

## [0.9.41] - 24.01.2018

### refactor

- promisify the moviedatabase api
- replace all references to the movie db api with the eventHandler
- refactor load cycle of series from api, to recursive load seasons and return the promise

## [0.9.42] - 24.01.2018

### refactor

- using eventHandler to write, get and clear Messaged

## [0.9.43] - 24.01.2018

### refactor

- series code in board view

## [0.9.44] - 25.01.2018

### refactor

- service part

## [0.9.45] - 27.01.2018

### feat

- implement chat
- fix username input

## [0.9.46] - 28.01.2018

### feat

- adding features to the chat

## [0.9.47] - 28.01.2018

### feat

- implement chat messages
- implement user overview

## [0.9.48] - 28.01.2018

### fix

- view series, didnt load from user repository

## [0.9.49] - 29.01.2018

### feat

- add text input support for chat

## [0.9.50] - 29.01.2018

### feat

- implement messages and offline / online states

## [0.9.51] - 29.01.2018

### feat

- compare from chat with other users