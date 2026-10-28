/**
 * Long-Lead Equipment Planner data. Lead times are indicative manufacturing ranges in weeks,
 * counted from approved drawings, for the Canadian market. Every value is editable in the tool;
 * users are told to replace them with their own quotes.
 */

export interface EquipmentType {
  id: string
  name: string
  group: 'Transformers' | 'Switchgear & distribution' | 'Critical & standby power'
  low: number
  high: number
  note: string
}

export const EQUIPMENT: EquipmentType[] = [
  { id: 'lv-dry', name: 'LV dry-type transformer (≤ 600 V)', group: 'Transformers', low: 10, high: 26, note: 'Stock ratings can ship in days; special voltages or enclosures sit at the top of the range.' },
  { id: 'mv-dry', name: 'MV dry-type transformer (VPI / cast coil)', group: 'Transformers', low: 26, high: 52, note: 'Cast coil and high BIL ratings run longer.' },
  { id: 'pm3', name: 'Three-phase padmount transformer', group: 'Transformers', low: 30, high: 70, note: 'Utility-spec units and FR3 fluid can add time.' },
  { id: 'pm1', name: 'Single-phase padmount or polemount', group: 'Transformers', low: 20, high: 52, note: 'Common utility ratings move fastest.' },
  { id: 'unit-sub', name: 'Unit substation transformer (≤ 5 MVA)', group: 'Transformers', low: 45, high: 80, note: 'Throat and flange coordination with the switchgear is often the critical path.' },
  { id: 'power', name: 'Power transformer (> 10 MVA)', group: 'Transformers', low: 90, high: 156, note: 'Design review and factory test slots set the date; book early.' },
  { id: 'swbd', name: 'LV switchboard (≤ 4,000 A)', group: 'Switchgear & distribution', low: 14, high: 30, note: 'Breaker availability drives the range.' },
  { id: 'lv-sg', name: 'LV draw-out switchgear', group: 'Switchgear & distribution', low: 24, high: 45, note: 'Power circuit breakers and relays are the long items.' },
  { id: 'mv-mc', name: 'MV metal-clad switchgear', group: 'Switchgear & distribution', low: 36, high: 70, note: 'Vacuum breakers, relays and arc-resistant options extend it.' },
  { id: 'mv-me', name: 'MV metal-enclosed or pad-mounted switchgear', group: 'Switchgear & distribution', low: 26, high: 52, note: 'Fuse and switch ratings set by the utility can add time.' },
  { id: 'mcc', name: 'Motor control centre', group: 'Switchgear & distribution', low: 16, high: 36, note: 'Drives and soft starters are usually the long items.' },
  { id: 'ats', name: 'Automatic transfer switch', group: 'Critical & standby power', low: 14, high: 30, note: 'Bypass-isolation and closed-transition units take longer.' },
  { id: 'pdu', name: 'PDU or remote power panel', group: 'Critical & standby power', low: 12, high: 26, note: 'Branch monitoring options can extend it.' },
  { id: 'ehouse', name: 'E-house or power skid', group: 'Critical & standby power', low: 40, high: 78, note: 'Follows the longest piece of equipment inside it.' },
  { id: 'gen', name: 'Standby generator set', group: 'Critical & standby power', low: 30, high: 70, note: 'Larger sets and Tier 4 emissions packages run longer.' },
]

/** Project phases between placing the order and energization, in weeks, in order. */
export interface Phase { id: string; label: string; weeks: number; tip: string }

export const PHASES: Phase[] = [
  { id: 'submittal', label: 'Submittal drawings', weeks: 3, tip: 'Supplier prepares drawings after the PO.' },
  { id: 'approval', label: 'Review & approval', weeks: 3, tip: 'Engineer and owner review, plus one resubmission.' },
  { id: 'build', label: 'Manufacturing', weeks: 0, tip: 'The equipment lead time (set per item).' },
  { id: 'delivery', label: 'Delivery', weeks: 2, tip: 'Add time for remote or northern sites.' },
  { id: 'install', label: 'Install & terminate', weeks: 4, tip: 'Set, anchor, cable and terminate.' },
  { id: 'inspect', label: 'Inspection & utility', weeks: 3, tip: 'ESA or provincial inspection and utility connection.' },
  { id: 'commission', label: 'Test & commission', weeks: 2, tip: 'Pre-energization testing and commissioning.' },
]

export const DEFAULT_ROWS = ['mv-mc', 'pm3', 'swbd', 'lv-dry', 'ats']
