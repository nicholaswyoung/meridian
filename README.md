# Meridian

![CI Status](https://api.travis-ci.org/UntilNow/meridian.svg?branch=master)

An opinionated, high-level networking and storage toolkit for JavaScript applications.

## Goals

Meridian aims to make managing API payloads a concern of the past. It loads,
caches, and updates your data automatically. It handles relationships, embedded
(or included) payloads, and more. By building on a shared foundation, you'll be
able to build faster and with more confidence.

The tooling is also future-proof: Meridian supports HTTP out of the box, but in
the future, expect it to support Websockets and other data transports.

## Opinions

Meridian is built on top of reliable technologies, each with a proven track
record of performance and reliability. The project focuses on usability and
performance equally, but if forced to choose, performance will likely come out
on top. (If a tool isn't performant, developers will eventually abandon it, or
won't run tests to properly maintain integrations with it. Hence
the performance-oriented focus.)

Below are a few paragraphs covering tools that comprise the foundation of the
project, and why we chose them. Plus, remarks on how development should proceed:

**Universal by Default**

Meridian should run anywhere that JavaScript does. It must execute, without
deprecation warnings or errors on [Node](http://nodejs.org) v4.x or greater, and
in any [A Grade Browsers](https://wiki.mozilla.org/Support/Browser_Support), at
the time of a release.

**JSON:API**

JSON:API is a standard for building APIs in JSON, that aims to reduce
bikeshedding, and help us get on with the task of writing great software. As of
now, Meridian supports *only* [JSON:API](http://jsonapi.org) compliant APIs.

**LevelUP**

Loaded data is stored by [LevelUP](https://github.com/Level/levelup). The default backend is
[Memdown](https://github.com/Level/memdown), an in-memory implementation of
LevelDB, but you'll eventually be able to choose another storage system.

**Fetch**

The included HTTP client is based on JavaScript's `fetch` standard, a composable
system for creating, managing, and executing HTTP requests.

## License

For further detail, see the accompanying `LICENSE` document.
