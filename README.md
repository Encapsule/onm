# Encapsule Project onm

Around the office "onm" stands for "Oh never mind." and all but a few generally hate it for reasons I admit to be valid.

So I've taken onm on a walk and we've been talking. We converse in tests; I ask questions and onm tells me 'fuck you.' But I am winning slowly.

Unless you already know onm, don't bother trying to learn it right now. The docs are horrible, and betray a functional but cumbersome API surface atop a challenging set of concepts not so skillfully caged in code (my first JavaScript project ever so give me a break).

The Wiki docs are still online for the few of you using onm currently. For the rest, v1 is coming in the not-so-distant future. And, I think it will be worth taking the time to get to know v1: [v1 onm core notes](https://github.com/Encapsule/onm/blob/chris/v1.0-core-refactor/src/core/README.md)

#### Tests

[![Build Status](https://travis-ci.org/Encapsule/onm.svg?branch=chris%2Fv1.0-core-refactor)](https://travis-ci.org/Encapsule/onm)

#### Package

The latest onm package is available via npm:

        npm install onm

See also: [https://www.npmjs.org/package/onm](https://www.npmjs.org/package/onm)

onm is distributed in [CommonJS ](http://en.wikipedia.org/wiki/CommonJS) format for easiy use in node:

        var onm = requrie('onm');
        // onm blah blah blah...

onm is extremely useful in the client as well and is fully compatible. However, you will have to transform onm's CommonJS source for use in the browser using a build tool such as [browserify](http://browserify.org/).

I've been writing _everything_ in CommonJS and using the [grunt-browserify](https://www.npmjs.org/package/grunt-browserify) plug-in for [Grunt](http://gruntjs.com/) to pack up everything I need for my HTML5 SPA (including onm), and it's been working well so far.

There are few related packages you might be interested in as well: [onm-server-rest-routes](https://www.npmjs.org/package/onm-server-rest-routes), [onm-client-rest-api](https://www.npmjs.org/package/onm-client-rest-api), [onmd-scdl](https://www.npmjs.org/package/onmd-scdl)...

#### Sources

Sources are available under [MIT license](http://opensource.org/licenses/MIT) on GitHub: [Encapsule/onm](https://github.com/Encapsule/onm)

#### Documentation

onm's small API surface belies its power: [Encapsule/onm/wiki](https://github.com/Encapsule/onm/wiki)



