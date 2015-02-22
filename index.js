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

  Ongoing development of onm and other derived Encapsule Project
  repositories is funded through consulting engagements. If onm
  resonates with you, there's likely more that you could be doing
  with Encapsule Project alienware. Please follow @Encapsule on
  GitHub and Twitter and share the love with your friends.

*/

module.exports.Model = require('./lib/onm-model');
module.exports.Address = require('./lib/onm-address');
module.exports.Store = require('./lib/onm-store');
module.exports.Namespace = require('./lib/onm-namespace');
module.exports.intrinsics = require('./lib/common/onm-intrinsic-data-models');
module.exports.util = require('./lib/common/onm-util-functions');

