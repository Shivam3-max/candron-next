// Ship-to regions offered at checkout. Codes are ISO 3166-2 subdivision suffixes.

export const COUNTRIES = [
  { code: 'CA', name: 'Canada', regionLabel: 'Province / territory', postalLabel: 'Postal code' },
  { code: 'US', name: 'United States', regionLabel: 'State', postalLabel: 'ZIP code' },
] as const

export type CountryCode = (typeof COUNTRIES)[number]['code']

export const REGIONS: Record<CountryCode, { code: string; name: string }[]> = {
  CA: [
    { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' }, { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' }, { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' }, { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' }, { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' },
  ],
  US: [
    'AL Alabama', 'AK Alaska', 'AZ Arizona', 'AR Arkansas', 'CA California', 'CO Colorado', 'CT Connecticut', 'DE Delaware',
    'DC District of Columbia', 'FL Florida', 'GA Georgia', 'HI Hawaii', 'ID Idaho', 'IL Illinois', 'IN Indiana', 'IA Iowa',
    'KS Kansas', 'KY Kentucky', 'LA Louisiana', 'ME Maine', 'MD Maryland', 'MA Massachusetts', 'MI Michigan', 'MN Minnesota',
    'MS Mississippi', 'MO Missouri', 'MT Montana', 'NE Nebraska', 'NV Nevada', 'NH New Hampshire', 'NJ New Jersey',
    'NM New Mexico', 'NY New York', 'NC North Carolina', 'ND North Dakota', 'OH Ohio', 'OK Oklahoma', 'OR Oregon',
    'PA Pennsylvania', 'RI Rhode Island', 'SC South Carolina', 'SD South Dakota', 'TN Tennessee', 'TX Texas', 'UT Utah',
    'VT Vermont', 'VA Virginia', 'WA Washington', 'WV West Virginia', 'WI Wisconsin', 'WY Wyoming',
  ].map(s => ({ code: s.slice(0, 2), name: s.slice(3) })),
}

export const isCountry = (v: string): v is CountryCode => COUNTRIES.some(c => c.code === v)
export const isRegion = (country: CountryCode, region: string) => REGIONS[country].some(r => r.code === region)
export const regionName = (country: string, region: string) =>
  (isCountry(country) && REGIONS[country].find(r => r.code === region)?.name) || region

const POSTAL: Record<CountryCode, RegExp> = {
  CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  US: /^\d{5}(-\d{4})?$/,
}
export const isPostalCode = (country: CountryCode, postal: string) => POSTAL[country].test(postal.trim())
export const formatPostal = (country: CountryCode, postal: string) => {
  const p = postal.trim().toUpperCase().replace(/\s+/g, '')
  return country === 'CA' && p.length === 6 ? `${p.slice(0, 3)} ${p.slice(3)}` : p
}
