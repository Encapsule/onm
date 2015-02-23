# onm core

For v1.0 of onm I'm taking the work I've done for onm v0.3 release and reshaping it into a new low-level abstraction layer called onm core. The outer API will be whatever niceties people want. Note that it's this refactored core that's the kernel of planned work on a replacement for onm called jbus w/full support for JSON. This work is a step to ensure that I can work ahead on jbus as time permits AND get a stable, documented, onm v1.0 out the door this week. Last week's tool breaks just killed me...

## Overview

a resource identifier string (ris) specifies enough information to query the resource address space (ras) graph and resolve a resource address location (ral).

ral's are used to affect basic create, read, update, and delete (CRUD) and other higher-order operations on located resources (i.e. your in-memory JSON).

resource address spaces (ras) derive from user-supplied address space descriptor (asd) objects.

given an asd, you can ask onm to generate a ras for you.

given a ras, you can ask onm to generate a ral for you by passing it a ris.

given a ral, you can ask onm to generate another ral relative to the first using convenient ris syntax.

given a ral, you can ask onm to locate and transform the resource at the specified location.

all resource/transform operations return a resource location proxy (rlp) object.

rlp's are bound to a specific coordinate in the ras, and a specific data reference in a self-describing addressable object (sdao) container instance. serializing an sdao to JSON produces a self-describing addressable blob (sdab).

given a rlp:

- affect further operations to the proxied resource
- dereference the proxy to obtain direct access to the resource's in-memory JSON data
- generate ris and ral's relative to the proxied resources

## Terms

- ASD - Address Space Declaration - like onm v0.2 data model declaration
- ASC - Address Space Cache - compiled ASD
- RAL - Resource Address Location - like onm v0.2 onm.Address
- RAS - Resource Address Space - like onm v0.2 onm.Model
- RIS - Resource Identifier String - replacement for onm v0.2 path and hash strings
- RLP - Resource Location Proxy - like onm v0.2 onm.Namespace
- SDAO - Self-Describing Addressable Object - like v0.2 onm.Store
- SDAB - Self-Describing Addressable Blob - new concept

## Operations

onm(ASD) -> RAS

onm(ASC) -> RAS

onm(RAS) -> ASC

onm(RAS, RIS) -> RAL

onm(RAL) -> RIS

onm(RAL, RIS) -> RAL

onm(RAS, JSON) -> SDAO

onm(SDAO, RIS) -> RAL

onm(SDAO, RAL) -> RLP

onm(RLP) -> RIS

onm(RLP) -> RAL

onm(RLP) -> JSON

onm(RLP, RIS, JSON) -> RLP

## Subsystems

### JNSP (Journal Notification Stream Processor)

### RISP (Resource Identifier String Processor)

### RASP (Resource Address Space Processor)

### RLTP (Resource Location Transform Processor)


