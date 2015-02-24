# onm core (Node.js / HTML 5)

_"So generic it's worthless."_

v1.0 onm core implements an extensible, infinite scope, globally unique, synchronous, URI addressable, strongly-typed, memory-mapped journaling filesystem for shared and application-specific JSON data types.

## Overview

_This document provides a terse overview of core concepts embodied in onm, explains how these concepts relate to one another, and map to core subsystem code._

A Namespace Descriptor (NSD) is a JSON object with sub-object and property name and value semantics defined by onm.

NSD's model, or specify abstractly, whatever application-specific JSON data object(s) you want. [1]

In small detail, NSD's define JSON _objects_ in terms of their properties and sub-objects.

NSD's may also be extended with arbitrary application-specific annotations (NSD properties declared using a special onm-defined syntax).

NSD's are composable with one another using onm-defined syntax flags, to form a directed graph.

Analysis of an NSD graph produces an optimized cache object called the Address Space Map (ASM).

ASM's encode information about (i.e. meta-data), the composition, properties, and semantics of a family of like-named, similarly structured JSON documents [1].

ASM's are machine-readable, declarative contracts over JSON data encoded in JSON.

ASM's are generally produced from NSD's authored by developers at design time. But, ASM's may be synthesized at runtime...

In typical use, a client would require-in an ASM (or obtain via network call) and use the object to initialize a memory-resident Runtime Address Space (RAS) database bound to the details encoded in the ASM. RAS are stateless, immutable, logical singletons with respect to the ASM they're bound to at construction.

Logically, a RAS represents the composition of a potentially infinite set of identically named, similarly shaped, JSON documents. But a RAS is not a JSON document but rather a lens through which to interpret JSON documents.

To acccess a JSON document via onm, it must be written into a Data-Addressable Object (DAO).

DAO containers are bound to a specific RAS at construction time, and may be default-constructed using information from RAS, or explicitly constructed with JSON.

In the case of DAO container construction, and more generally for all onm operations that invoke its Resource Location Transformation Processor (RLTP), onm attempts to provide as low a barrier as possible to the ingress of arbitrary JSON from external sources. [2]

Once a DAO has been initialized, the JSON document contained in it can be accessed and transformed by onm's Resource Location Transformation Processor (RLTP) subsystem.

In order to operate on resources in a DAO, the RLTP must know not only the value(s) of the data, but also what the data is. 

This information additional context information is obtained by RLTP from RAS using information contained in Resource Address Location (RAL) objects.

RAL's are RAS-generated objects that represent the specific address, or coordinates if you prefer, of a resource in an ASM's address space.

Just as a RAS is not a JSON document, a RAL is not a JSON resource but rather a proxy for that resource that encodes a presumptuous strategy for locating the resource given information picked from RAS.

To get a RAL, client code codes calls a RAS, or DOA instance providing a Resource Identifier String (RIS).

onm supports dot-delimited path, LRI, and URI RIS variants for use in various human and machine scenarios.

RIS strings are parsed to form RAS queries which may resolve to a RAL, or fail to indicate that desired resource is outside the address space of the queried RAS.

Provided a valid RIS, RASP will generate a RAL (basically a RIS blessed by the RAS).

onm's RLTP subsystem executes the resource location strategy encoded in a RAL against the actual contents of a DAO to affect access to specific resources in the DAO.

This sounds confusing but it's not: in essence onm provides your client code with two rings of protection from external JSON sources.

A RIS encodes an opportunistic strategy for locating a RAL in a RAS. Or if you look at it another way, a RIS encodes an assertion about the contents of a RAS. RIS parse failures alert you instantly to breaking changes to ASM-encoded JSON data exchange contracts introduced upstream.

A RAL similarly encodes an opportunistic location strategy but targets instead a resource in a DAO. Viewed as an assertion, failure by the RLTP to locate a resource (i.e. execute the RAL's encoded location strategy against actual DAO data) typically indicates a bug, or uncommunicated breaking change in the routine that produced the JSON in the DAO.

In a perfect world, the producer of the JSON your code consumes provides you with its ASM so you can just bail and check your package dependencies if you hit a bunch of RIS parse failures.

But even with an ASM in hand, shit happens: resources go missing, or aren't what you expect them to be when you find them. RLTP location failures on RAL's alert to quickly that the data that your processing isn't what you expected.

The intent of this is to provide a simple but highly effective bulkheading protocol for proactively identifying upstream JSON data contract changes _before_ your routines operate on unknown data so that you can fail early with actionable telemetry. There's not really a good and consistent way to do this right now and it needless slows development, and absolutely fucking kills development teams trying to decipher complex distributed systems breaks. Bulkheading your functions lets you diagnose failures in your code using a binary search approach oftentimes using little more than failure telemetry.

Succesful location and/or transformation of a JSON resource in a DOAS instance produces a Resource Location Proxy (RLP) object that encapsulates a RAL, and a reference to the JSON resource addressed by the RLTP operation.

RLP object references are magic:

Given an RLP you can ask onm:

- **what is it?** Query RASP and determine the type of the data (and any other application-specific property declared in your NSD).
- **what is its value?** Query RLTP and open and create, and transform JSON in the DOA (covers all CRUD + other operations not discussed here).
- **when does it change?** - Query JNSP to register a notification filter and callback function.

DOA containers support a new JSON ingress/outgress format called a Data-Addressable Blob (DAB) that aggregates DAO JSON data and ASM meta-data in a single self-describing JSON object.

## Terms

- NSD - Namespace Descriptor - user, or machine generated namespace declaration
- ASM - Address Space Map - a compiled NSD
- RAS - Runtime Address Space - an in-memory ASM
- DAO - Data-Addressable Object - generic in-memory JSON document store
- RAL - Resource Address Location - a RIS parsed by a RAS in memory
- RIS - Resource Identifier String - one of several onm-defined URI formats
- RLP - Resource Location Proxy - proxy for a DAO resource
- DAB - Data-Addressable Blob - self-describing JSON object containing an ARM, and enough information to reconstruct the JSON document in a DAO.

## Operations

### onm(NSD) -> ASM

A Namespace Descriptor (NSD) can be compiled into an Address Space Map (ASM) object.

### onm(NSD) -> RAS

A Namespace Descriptor (NSD) can be compiled into an Address Space Map (ASM) object and then used immediately to construct a Runtime Address Space (RAS) database.

### onm(ASM) -> RAS

An Address Space Map (ASM) object can be used to construct a Runtime Address Space (RAS) database.

### onm(RAS) -> ASM

A Runtime Address Space (RAS) database can be serialized to an Address Space Map (ASM) object.

### onm(RAS, RIS) -> RAL

A Resource Identifier String (RIS) can be parsed by a Runtime Address Space (RAS) database to produce a Runtime Address Locator (RAL) object.

### onm(RAS, RIS) -> NSD

A Resource Identifier String (RIS) can be parsed by a Runtime Address Space (RAS) database to obtain its identified Namespace Descriptor (NSD) within an Address Space Map (ASM).

### onm(RAL) -> RIS

A Runtime Address Locator (RAL) can be serialized to a Resource Identifier String (RIS).

### onm(RAL) -> NSD

A Runtime Address Locator (RAL) can be queried to return its identified Namepsace Descriptor (NSD) in an Address Space Map (ASM).

### onm(RAL, RIS) -> RAL

A Runtime Address Locator (RAL) can be used along with a Resource Identifier String (RIS) offset to generate a new Resource Address Locator (RAL) object.

### onm(RAS, JSON) -> DAO

A Data-Addressable Object (DAO) JSON document proxy is constructed by onm given a Runtime Address Space (RAS) database, and options JSON initialization data.

### onm(DAO, RIS) -> RAL

A Data-Addressable Object (DAO) container proxies for RASP and can parse Resource Identifier Strings (RIS).

### onm(DAO, RAL) -> RLP

A Data-Addressable Obejct (DOA) container proxies for RLTP and can affect resource location/transform operations on a Resource Address Locator (RAL) to produce a Resource Location Proxy (RLP) result.

### onm(RLP) -> RIS

Resource Location Proxy (RLP) objects are associated with a Resource Address Locator (RAL) and can be serialized to a Resource Identifier String (RIS).

### onm(RLP) -> RAL

Resource Location Proxy (RLP) can be queried to return its associated Resource Address Locator (RAL).

### onm(RLP, RIS, JSON) -> RAL

Resource Location Proxy (RLP) can be queried to locate/transform data in a DOA on resources located at a relative path specified by Resource Locator String (RIS) with data JSON.

### onm(RLP, RIS, JSON) - RLP

Runtime Location Proxy (RLP) can be queries to affect resource locate/transform operations on resources located at a relative path specified by a Resource Identifier String (RIS).

### onm(RLP) -> JSON

The JSON data branch proxied by a Resource Location Proxy (RLP) may be serialized to raw JSON.

### onm(RLP) - DAB

The JSON data branch proxied by a Resource Location Proxy (RLP) may be serialized to a Data-Addressable Blob (DAB).

### onm(RLP) -> NSD

A Resource Location Proxy (RLP) can be queried to return the NSD in the ASM associated with its RAL.

## Subsystems

### DAOS (Data-Addressable Object Store)

### JNSP (Journal Notification Stream Processor)

### RASP (Resource Address Space Processor)

### RISP (Resource Identifier String Processor)

### RLTP (Resource Location Transform Processor)


[1] onm v1.x cannot be used to model a JSON document with a root element of JSON value type array. Additionally, v1.x cannot address through arrays into sub-namespace structures; nodes in the DAO of JSON value type array are to onm, _properties_, of a namespace that by convention is always of JSON value type object.

[2] There are a few diffult-to-explain but well reported and tested cases where the RLTP subsystem will reject arbitrary client JSON due to framing issues. Rather than spending a lot of time documenting these exceptional cases, I'm working to augment RASP with full JSON semantics in a later release.

[3] JSON is not in and of itself, self-describing. That is, a JSON document contains values. Developers with forsight often encode meta-data along with their actual data in JSON. But this introduces a custom code depenedency and for that reason fails miserably at scale.