# onm core DAOS subsystem

The Data-Addressable Object Store (DAOS) subsystem implements onm's core Data-Addressable Object (DAO) abstraction over an in-memory JSON document.

Architecturally, the DAOS subsystem is a master controller that responds to client requests through a complex delegation protocol involving the RLTP, RASP, RISP, and JSNP subsystems.

Typical client requests are to perform some data transformation operation on a resource in a DAO at some RAL.

Requests can come in a wide variety of equivalent forms. DOAS leverages RASP and RISP primarily to distill client requests into the form required by the RLTP subsystem. Once an RLTP request has been created, DOAS interacts with JNSP to establish a State Transition Frame (STF), delegates to RLTP, and returns the response to its caller.

Multiple RLTP requests can be aggregated into a single STF managed by the DOAS on behalf of a DAO to force JNSP to coalesce journal notifications for the duration of the STF.

JNSP only publishes journal notifications to subscribers on STF boundaries. In other words, journal notification subscribers will not be notified of changes until an STF completes, at which point a coalesced journal is presented for analysis.

Coalesced journals are powerful as they contain only the net effective changes that occurred in an STF. For example, if a client increments an integerproperty value stored in a DAO from 4 to 5, and then sets the value back to 4 within an STF, subscribers to the property's journal notification stream will not be called because the property value has not changed.

