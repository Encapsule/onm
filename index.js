////
/*
  Object Namespace Manager (onm)

  Copyright (C) 2015 Encapsule Project (http://encapsule.org)

  License: MIT (https://github.com/Encapsule/onm/blob/master/LICENSE)

  Source: https://github.com/Encapsule/onm

  Issues: https://github.com/Encapsule/onm/issues

  Designed and implemented by Christopher D. Russell

  Ongoing development of onm and other derived Encapsule Project
  repositories is funded through consulting engagements. Please
  follow @Encapsule on Twitter and GitHub and get in touch if we
  can help you with that awesome thing you're building.

*/


/*
  v0.2
  +-------------+---------------+
  | onm.Address | onm.Namespace |
  +-------------+---------------+
  | onm.Model   | onm.Store     |
  +-------------+---------------+

*/
module.exports.Model = require('./lib/onm-model');
module.exports.Address = require('./lib/onm-address');
module.exports.Store = require('./lib/onm-store');
module.exports.Namespace = require('./lib/onm-namespace');


/*
  v1.0
  +----------------+---------------+
  | onm.Coordinate | onm.Location  |
  +----------------+---------------+
  | onm.Map        | onm.Region    |
  +----------------+---------------+

*/


/*
  +-----+-----+
  | RAL | RLP |
  +-- --+-----+
  | RAS | DAO |
  +-----+ ----+
*/


/*
  Utility and test exports.
*/
module.exports.intrinsics = require('./lib/onm-intrinsic-data-models');
module.exports.util = require('./lib/onm-util-functions');

/*
  'node-uuid' package convenience export for clients who need need access
  to binary UUID, or standard hex string UUID representation vs. equivalent
  compressed IRUT string format provided by onm RISP.
*/
module.exports.uuid = require('node-uuid');