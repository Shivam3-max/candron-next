import type { Standard } from '@/components/ProductTypePage'

// Wording and standards shared by several dry-type product records.
export const EFFICIENCY = 'Meets DOE 2016 (10 CFR Part 431) in the U.S. and the NRCan 2019 Energy Efficiency Regulations in Canada'
export const TAPS = 'Typically 2 × 2.5% above and 2 × 2.5% below nominal'
export const FINISH = 'ANSI 61 light grey, powder coat'
export const RISE_220 = '220 °C insulation system, 150 °C rise (115 °C or 80 °C rise optional)'

const std = (name: string, desc: string): Standard => ({ name, desc, logo: null })

export const STD = {
  csa47: std('CSA C22.2 No. 47', 'Air-cooled (dry-type) transformers — Canadian safety requirements'),
  csaC9: std('CSA C9', 'Dry-type transformers — Canadian performance standard'),
  csa66: std('CSA C22.2 No. 66', 'Specialty and control transformers'),
  ul1561: std('UL 1561', 'Dry-type general-purpose and power transformers'),
  ul5085: std('UL 5085', 'Low-voltage control and class 2 transformers'),
  nemaSt20: std('NEMA ST 20', 'Dry-type transformers for general applications — sound, temperature and construction'),
  ieee0112: std('IEEE C57.12.01', 'General requirements for dry-type distribution and power transformers'),
  ieee1291: std('IEEE C57.12.91', 'Test code for dry-type transformers — how every routine test is run'),
  ieee110: std('IEEE C57.110', 'Rating transformers that supply non-sinusoidal (harmonic) load current'),
  ieee16: std('IEEE C57.16', 'Dry-type air-core series-connected reactors'),
  ieee32: std('IEEE C57.32', 'Neutral grounding devices'),
  doe: std('DOE 10 CFR Part 431', 'U.S. minimum efficiency for low-voltage dry-type transformers (2016 levels)'),
  nrcan: std('NRCan Energy Efficiency Regulations', 'Canadian minimum efficiency for dry-type transformers (2019 levels)'),
  csa802: std('CSA C802.2', 'Minimum efficiency values for dry-type transformers'),
  hazloc: std('CSA C22.2 No. 213 / UL 121201', 'Equipment for Class I, Division 2 hazardous locations'),
  csa14: std('CSA C22.2 No. 14 / UL 508', 'Industrial control equipment — reactors and filters'),
  mg1: std('NEMA MG 1 (Parts 30 & 31)', 'Motor insulation limits when fed from drives — the target for dV/dt filters'),
  csaZ32: std('CSA Z32', 'Electrical safety in health-care facilities (isolated power systems)'),
}
