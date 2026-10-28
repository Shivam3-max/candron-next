/** RFQ & Bid Scorecard: page content. Criteria and weights match scripts/resources/build_rfq_scorecard.py. */

export const SCORECARD_XLSX = '/downloads/candron-rfq-bid-scorecard.xlsx'

export const CRITERIA = [
  { name: 'Price', weight: 35, how: 'Lowest total price scores 5; the rest score pro rata.', auto: true },
  { name: 'Lead time', weight: 25, how: 'Shortest lead time from approved drawings scores 5; the rest pro rata.', auto: true },
  { name: 'Technical compliance', weight: 15, how: 'Scored 1–5: meets the specification with no technical deviations.', auto: false },
  { name: 'Exceptions & commercial terms', weight: 10, how: 'Scored 1–5: fewer exceptions and clearer terms score higher.', auto: false },
  { name: 'Warranty & support', weight: 5, how: 'Longest warranty scores 5; the rest pro rata.', auto: true },
  { name: 'Testing & documentation', weight: 5, how: 'Scored 1–5: witnessed FAT, test reports, drawings and manuals.', auto: false },
  { name: 'Supplier track record', weight: 5, how: 'Scored 1–5: references, past performance, local service.', auto: false },
]

export const SHEETS = [
  { t: 'How to use', d: 'Six steps from sending the RFQ to reading the result.' },
  { t: 'RFQ', d: 'Project details, an equipment scope table, and the 13 things every quote must state so quotes are comparable.' },
  { t: 'Bid Comparison', d: 'Enter up to five quotes. Price, lead time and warranty score automatically; the rest take a 1–5 score. Weighted total out of 100, with rank.' },
  { t: 'Clarifications', d: 'A log of every question and the answer sent to all bidders, with any impact on price or lead time.' },
]

export const MUST_STATE = [
  'Unit and total price in CAD, taxes excluded',
  'Price validity and any metals escalation clause',
  'Lead time in weeks, counted from approved drawings',
  'Submittal drawing turnaround after the PO',
  'Tests included, and whether you can witness them',
  'Freight, delivery and offloading terms',
  'Warranty period and when it starts',
  'Certification (CSA, cUL or field evaluation)',
  'Recommended spares and their prices',
  'Start-up and commissioning support',
  'Country of manufacture',
  'Payment terms',
  'Every exception to the specification',
]
