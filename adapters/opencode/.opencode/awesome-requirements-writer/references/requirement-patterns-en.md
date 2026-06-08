# Requirement Patterns

Use these patterns to convert engineering notes into precise automotive requirements.

Write requirements in this form:

- "When `<trigger/condition>`, the `<system/item>` shall `<observable response>` within `<measurable limit>` under `<operating conditions>`."
- "While `<state>`, the `<system/item>` shall `<maintain/limit/prohibit behavior>`."
- "If `<fault or invalid input>` is detected, the `<system/item>` shall `<safe/diagnostic/degraded response>`."
- "Where `<variant/configuration>` is equipped, the `<system/item>` shall `<behavior>`."

## Core Patterns

Functional:

`When <trigger>, the <system> shall <response>.`

Performance:

`When <condition>, the <system> shall <response> within <limit> under <operating range>.`

State behavior:

`While <state>, the <system> shall <maintain/prohibit behavior>.`

Fault behavior:

`If <fault/invalid input/loss of communication> is present, the <system> shall <safe state/degraded mode/diagnostic response>.`

Interface:

`The <sender> shall transmit <signal/message> to <receiver> with <content, range, resolution, timing, timeout, and validity rules>.`

Diagnostic:

`If <fault condition> persists for <debounce criteria>, the <system> shall set <fault status> and <fault mitigation response>`


## ID Pattern

Use stable, readable IDs:

- `SYS-001` for system functional behavior
- `SWE-001` for software behavior
- `HW-001` for hardware and mechanical requirements

information do not have IDs.


Do not renumber existing IDs unless the user asks. New requirements should append to the current sequence.

## Variable and Keywords Pattern

In all information and requirements, 
- to express local variables/ process variables, use all lower case and italic letters, for example: "*lateral speed*".
- to express gobal variables/ calibrateable variables, use all uppercase letters and Bold, for example: "**TIMEOUT THRESHOLD**"
- The logic expressons "and, or, not, xor" shall be marked as "**AND**", "**OR**", "**NOT**", and "**XOR**", respectively.
- The keywords expresson "true, false,active, inactive, activated, deactivated, suppressed, enabled, disabled, valid, invalid" shall be marked all upper letters as "TRUE", "FALSE", "ACTIVE", "INACTIVE", "ACTIVATED", "DEACTIVATED", "SUPPRESSED", "ENABLED", "DISABLED", "VALID" and "INVALID" respectively.
- The signal name shall use italic with each first letter in a word in uppercase (unless the word is an acronym), for example: "*ACC Active State*" ,"*Steering Angle*"

## Rewrite Examples

### Example 1 (Clear and direct) 
Weak:

"The signal *ACC Active State* shall always be set to DEACTIVATED if each of the following conditions are fulfilled:

- Camera Status is invalid， OR
- Radar Status is invalid. "

Better:

"The signal *ACC Active State* shall be set to DEACTIVATED if the following conditions are fulfilled:

- [Req-SWE-001]*Camera Status* is invalid， **OR**
- [Req-SWE-002]*Radar Status* is invalid. "


### Example 2 （Unambiguous）

Weak:

"The controller shall quickly detect low voltage."

Better:

"[Req-SWE-003]When the supply voltage is below THRESHOLD for DEBUNCE TIME, the controller shall detect an undervoltage condition and report the corresponding diagnostic status."

### Example 3 (Atomic) 

Weak:

"[Req-SWE-004]The current steering torque shall be set to zero if steering torque sensor losts connection or estimated rackposition is invalid."

Better:

"The *current steering torque* shall be set to zero if the following conditions are fulfilled:
- [Req-SWE-004]Steering torque sensor lost communication fault occurred, **OR**
- [Req-SWE-005]*estimated rackposition* is INVALID."


### Example 4 (Positively defined)

Weak:

"The signal ACC Active State shall not be set to DEACTIVATED if the following conditions are fulfilled:

Camera Status is valid，OR
Radar Status is valid .

Better:

"The signal *ACC Active State* shall be set to DEACTIVATED if the following conditions are fulfilled:

- [Req-SWE-001]*Camera Status* is invalid， **OR**
- [Req-SWE-002]*Radar Status* is invalid. "


## Handling Missing Data

Use "TBD" as a placeholder in variable table when a required engineering value is missing. Keep placeholders visible in the requirement and repeat them in open questions.
