/**
 * Generator Test Planner & Logbook content. A typical inspection and test programme for
 * emergency generators in buildings, aligned with CSA C282 (and CSA Z32 for health care).
 * It names the standard but does not reproduce it: users are told to confirm intervals,
 * loads and durations against the edition their authority having jurisdiction enforces.
 */

export type Interval = 'weekly' | 'monthly' | 'semiannual' | 'annual' | 'five-year'

export interface TestTask {
  id: Interval
  label: string
  who: string
  summary: string
  items: string[]
}

export const TASKS: TestTask[] = [
  {
    id: 'weekly',
    label: 'Weekly inspection',
    who: 'Owner / building operator',
    summary: 'A walk-round with the set at rest. Ten minutes, logged every week.',
    items: [
      'Fuel level in the day tank and main tank; fuel transfer pump works',
      'Engine oil and coolant levels',
      'Block heater on and engine warm to the touch',
      'Battery terminals clean and tight; charger on and charging',
      'No fuel, oil, coolant or exhaust leaks',
      'Control panel in AUTO; no alarms; lamp test passes',
      'Remote annunciator shows the same status',
      'Room clear, louvres and air paths unobstructed',
    ],
  },
  {
    id: 'monthly',
    label: 'Monthly load test',
    who: 'Owner / building operator',
    summary: 'Run the set on load and record the readings. The common benchmark is at least 30% of nameplate for 60 minutes.',
    items: [
      'All weekly checks first',
      'Start through the transfer switch, not the panel, so the full sequence is proven',
      'Run on load for at least 60 minutes at 30% of nameplate or more',
      'Record kW, voltage, frequency, oil pressure and coolant temperature',
      'Record transfer and retransfer times',
      'Drain the exhaust condensate trap',
      'Check room ventilation and other auxiliary equipment',
    ],
  },
  {
    id: 'semiannual',
    label: 'Semi-annual service',
    who: 'Qualified contractor',
    summary: 'A service visit by a qualified generator technician.',
    items: [
      'Belts, hoses and clamps',
      'Air, fuel and oil filters as required',
      'Coolant condition and freeze protection',
      'Battery load test and charger output',
      'Governor and voltage regulator response',
      'Safety shutdowns: low oil pressure, high temperature, overspeed, overcrank',
    ],
  },
  {
    id: 'annual',
    label: 'Annual service & load test',
    who: 'Qualified contractor',
    summary: 'The full annual inspection, with a load bank test if the building cannot load the set.',
    items: [
      'Everything in the semi-annual service',
      'Oil and filter change; oil and coolant samples if your programme uses them',
      'Fuel sample for water, microbial growth and sediment',
      'Load bank test at the duration set below if monthly tests ran under 30% load',
      'Transfer switch maintenance, timing and operation check',
      'Infrared scan of power connections under load',
      'Exhaust system, supports and rain cap',
    ],
  },
  {
    id: 'five-year',
    label: 'Five-year inspection',
    who: 'Qualified contractor',
    summary: 'A deeper inspection of systems that wear slowly.',
    items: [
      'Fuel tank inspection and cleaning as needed',
      'Transfer switch internal inspection of contacts and mechanism',
      'Cooling system flush and hose replacement',
      'Review of the logbook, alarms and repeat defects',
    ],
  },
]

export const OCCUPANCIES = [
  { id: 'general', label: 'General building (offices, residential, retail)', note: 'CSA C282 sets the inspection and test programme for emergency generators in buildings.' },
  { id: 'health', label: 'Health care facility', note: 'CSA Z32 applies as well as CSA C282. Follow your facility’s essential electrical system plan for test loads and records.' },
  { id: 'care', label: 'Care or detention occupancy', note: 'Fuel on site and test records are often checked more closely. Confirm the on-site fuel duration your building code requires.' },
  { id: 'industrial', label: 'Industrial or data centre', note: 'Standby sets that are not code-required emergency power may follow the owner’s programme; many owners still use CSA C282 as the benchmark.' },
] as const

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const ORDINALS = ['First', 'Second', 'Third', 'Fourth']

/** The common monthly benchmark: at least 30% of nameplate kW. */
export const MIN_LOAD_FRACTION = 0.3

export const LOGBOOK_PDF = '/downloads/candron-generator-test-logbook.pdf'
export const GEN_REFS = 'CSA C282, CSA Z32 and the National Building Code of Canada'
