# onm core DAOS subsystem

The Data-Addressable Object Store (DAOS) subsystem implements onm's core Data-Addressable Object (DAO) abstraction over an in-memory JSON document.

Architecturally, the DAOS subsystem is a master controller that responds to client requests through a complex delegation protocol involving the RLTP, RASP, RISP, and JSNP subsystems.

Typical client requests are to perform some data transformation operation on a resource in a DAO at some RAL.

Requests can come in a wide variety of equivalent forms. DOAS leverages RASP and RISP primarily to distill client requests into the form required by the RLTP subsystem. Once an RLTP request has been created, DOAS interacts with JNSP to establish a State Transition Frame (STF), delegates to RLTP, and returns the response to its caller.

Multiple DOAS calls can be aggregated into a single STF to force JNSP to coalesce journal notifications for the duration of the STF. This is useful because JNSP only publishes journal notifications to subscribers on STF boundaries to ensure that they do not have to discriminate intermediate results from stable results when responding to subscribed journal notifications.




