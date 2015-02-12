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

*/

// onm.Model - schema of a class of hierarchical data objects called namespaces.
module.exports.Model = require('./lib/onm-model');

// onm.Address - schema of a particular namespace in the model's defined address space.
module.exports.Address = require('./lib/onm-address');

// onm.Store - addressable, introspectable, observable, in-memory data cache of namespaces.
module.exports.Store = require('./lib/onm-store');

// onm.Namespace - address, introspection, and data access proxy object.
module.exports.Namespace = require('./lib/onm-namespace');

// onm.util (test/utility exports)
module.exports.util = require('./lib/impl/onm-util-functions');

