# Automotive Context

Use this reference when requirements touch automotive engineering concerns beyond basic product wording.

## Common Requirement Categories

- Vehicle function behavior
- ECU or controller behavior
- Sensor and actuator behavior
- Signal and network interfaces
- Diagnostic and service behavior
- Safety-derived behavior
- Cybersecurity and access control
- Calibration and variant behavior
- Environmental, electrical, EMC, thermal, vibration, and durability constraints
- Manufacturing, end-of-line, service, and repair constraints
- Over-the-air update and software lifecycle behavior
- Regulatory, homologation, emissions, and market-specific constraints

## Safety and Cybersecurity Discipline

Do not infer formal classifications from general knowledge. If safety or cybersecurity is involved, ask for or preserve:

- Item definition and operational design context
- Hazard or threat source
- Safety goal, safety requirement, or security goal
- ASIL, QM, cybersecurity impact, or other classification supplied by responsible experts
- Safe state, degraded mode, driver warning, fallback, or diagnostic reaction
- Fault detection time, fault tolerant time interval, debounce, confirmation, and clearing criteria
- Trace to safety concept, cybersecurity concept, regulation, customer specification, or validation evidence

If the user asks for a safety or regulatory requirement without source material, draft a placeholder requirement and clearly mark the missing source and owner.

## Interfaces

For signal, network, API, or electrical interfaces, capture:

- Sender and receiver
- Message, signal, pin, connector, topic, or API name
- Data type, units, range, resolution, accuracy, scaling, default, invalid value, and initialization value
- Cycle time, latency, timeout, debounce, freshness, and synchronization behavior
- Behavior on missing, stale, implausible, or conflicting data
- Ownership of the interface definition and compatibility constraints

## Diagnostics

For diagnostic requirements, capture:

- Fault conditions
- Enable conditions
- Suppress conditions
- Detection threshold and debounce
- Fault reaction
- Diagnostic trouble code, status bit, event, or service record
- Driver or service notification
- Clearing and healing conditions
- Freeze-frame, snapshot, log, or service data
- Verification method and required evidence

