////
/*
  Object Namespace Manager (onm)

  +-------------+---------------+
  | onm.Address | onm.Namespace |
  +-------------+---------------+
  | onm.Model   | onm.Store     |
  +-------------+---------------+

  Copyright (C) 2015 Encapsule Project (http://encapsule.org)

  License: MIT (https://github.com/Encapsule/onm/blob/master/LICENSE)

  Source: https://github.com/Encapsule/onm

  Issues: https://github.com/Encapsule/onm/issues

  Designed and implemented by Christopher D. Russell

  Encapsule Project is funded by helping small web and cloud start-ups
  own their competition with beyond-next-generation alienware like onm.

  Help us help you: hire us to consult on your next project to unlock
  the potential of Encapsule Project's MIT-licensed core JSON data
  modeling, mathematical graph, software routing, compositional micro-
  service cloud infrastructure, and front-end client components.

*/

// onm.Model - schema of a class of hierarchical data objects called namespaces.
module.exports.Model = require('./lib/onm-model');

// onm.Address - schema of a particular namespace in the model's defined address space.
module.exports.Address = require('./lib/onm-address');

// onm.Store - addressable, introspectable, observable, in-memory data cache of namespaces.
module.exports.Store = require('./lib/onm-store');

// onm.Namespace - address, introspection, and data access proxy object.
module.exports.Namespace = require('./lib/onm-namespace');

// onm.intrinsics - object namespace containing onm-intrinsic data model declaration objects.
module.exports.intrinsics = require('./lib/impl/onm-intrinsic-data-models');

// onm.util (test/utility exports)
module.exports.util = require('./lib/impl/onm-util-functions');

