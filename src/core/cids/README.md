# onm core CIDS subsystem

Class Identification Subsystem (CIDS) implements onm core's class typing system that leverages a simple JavaScript object annotation protocol, strong unique identifiers, and normalized set/get functions, and an some in-memory look-up tables to affect generic type-based programming idioms in JavaScript.

Virtually all core subsystems leverage CIDS when verifying the type of objects they're passed as input, and for generating the objects they return as output.

The Native Type Conversion Library (NTCL) provides the ingress to this protocol for native JavaScript and JSON values by providing functions for generating appropriately cid-labeled wrapper objects which are required by most core subsystem request protocols.




