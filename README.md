# Datapod-for-React Core

This is the core code which produces new versions for my open-source project **Datapod-for-React**.

Specific content in this site is also exposed online as the content for my personal site [edwardtanguay.netlify.app](http://edwardtanguay.netlify.app).

## Developer

- [Edward Tanguay](http://tanguay.info)

## Technology

- React
- TypeScript
- SASS

## Setup

- clone repository
- `npm install`
- `npm start` (starts both backend and frontend)

## FAQs

### What two purposes does this project serve?

- I push code to this repository which gets immediately published as my personal project [edwardtanguay.netlify.app](http://edwardtanguay.netlify.app)
- when I create a significant, new feature for this site, I run a code-generation process which produces a new version of my open-source framework **Datapod-for-React**

### What is the difference between Datapod-for-React Core and Datapod-for-React?

**Datapod-for-React Core** is a code base which produces my best-effort personal site edwardtanguay.netlify.app which is a central place for all my projects. It contains all the personal information for that site, as well as serves as a place for me to try out new functionality with React/TypeScript, various libraries, etc. to see if and how they work both offline and online in browser and smart phones, etc. 

**Datapod-for-React** is the third implementation of my Datapod Framework (the two others were Datapod-for-PHP and Datapod-for-Node-Express). It is a framework that allows you to more easily work with data and host data-driven websites. 

### Why do you generate the code for your Datapod-for-React framework instead of develop it manually?

I mainly want to work on my edwardtanguay.netlify.app, developing both content and features for it. When I build new features for it, I don't want to have to then copy them back into my Datapod site, but simply have them generated automatically. 

### How can other developers contribute to Datapod-for-React Core or Datapod-for-React?

Since Datapod-for-React Core is just a personal project only part of which is published at edwardtanguay.netlify.app, the only contributors I have are developers with whom I'm working on a specific feature that is not yet published at Datapod-for-React.

And since each new version of Datapod-for-React is generated instead of coded and pushed manually, developers who are interested in extending it fork the project for their own, and when they develop a significant feature or have a specific fix for a bug, they simply make it known to me, and I include it in the next generated version, giving them credit for their contribution in the version history.

## Current Projects in Datapod-for-React Core

### Distributed Data Sharing (DDS)

DDS is a concept that allows sites and applications to use each other's content as base content for their own sites, e.g. changing it, extending it, correcting it, while keeping track of the distributed sharing trail. Key features include:

- the content of a participating site is exposed as API or JSON files which are accessible to other sites
- other sites read in this data, and present it to the site owner who can republish it on their own site as their own content, and thereby also changing, extending, or correcting this data
- sites that share data will be able to consume the shared data of other sites and thus notify their own owners of changes, corrections and extensions made to their own content 

## Versions: Datapod-for-React Core

- 2022-03-19 - 0.01.03 - added version information
- 2022-03-19 - 0.01.02 - cleaned up base code and made repository public
- 2022-03-19 - 0.01.01 - added npm-run-all which starts both frontend and backend
- 2022-03-19 - 0.01.00 - state of app as of 2022-03-19
