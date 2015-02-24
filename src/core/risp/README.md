# onm core RISP subsystem

The Resource Identifier String Processor (RISP) subsystem interacts with a Resource Address Map (RAS) to provide routines for deserializing onm-format Resource Identifier Strings (RIS) into Resource Address Location (RAL) objects. And, for serializing RAL's back to RIS.

onm v1.0 supports four different RIS formats:
- readable - dot-delimited path useful for humans
- hash - a compressed locally useful identifier (not exposed publicly)
- lri - URI variant that may only be deserialized using a specific Address Space Map (ASM) named explicity by version.
- uri - URI variant that may be deserialized using any of a set of backwards-compatible Address Space Maps (ASM).
