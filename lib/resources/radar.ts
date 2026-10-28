/**
 * Canada Power Projects Radar: a monthly digest of announced Canadian projects with major
 * electrical scope. Every item is taken from a public announcement and links to its source;
 * nothing here comes from CANDRON's own customer work. Add a new issue at the top of ISSUES.
 */

export interface RadarItem {
  title: string
  where: string
  sector: string
  owner: string
  size: string
  stage: string
  timing: string
  summary: string
  scope: string
  isNew?: boolean
  source: { label: string; url: string }
}
export interface RadarSection { title: string; intro: string; items: RadarItem[] }
export interface RadarIssue { slug: string; number: number; month: string; compiled: string; editorial: string; sections: RadarSection[] }

export const ISSUES: RadarIssue[] = [
  {
    slug: '2026-11',
    number: 1,
    month: 'November 2026',
    compiled: 'October 28, 2026',
    editorial: 'Our first issue. Each month we gather newly announced Canadian projects with serious electrical scope (data centres, storage, renewables, transmission, mining and transit) so electrical contractors, EPCs and buyers can see what is coming before it reaches the tender boards. Every item links to its public source; check the latest status before you plan around it.',
    sections: [
      {
        title: 'New this month',
        intro: 'Announced or advanced in October 2026.',
        items: [
          {
            title: 'Federal 60 MW data centre, National Capital Region',
            where: 'Ottawa area (ON)',
            sector: 'Data centre',
            owner: 'Government of Canada (Communications Security Establishment); procurement by Defence Construction Canada',
            size: '60 MW · estimated $1.5–1.8 billion',
            stage: 'Advance procurement notice to design-builders; not yet approved to proceed',
            timing: 'Tender expected in 2027',
            summary: 'Defence Construction Canada has signalled a design-build procurement for a secure 60 MW data centre in the Ottawa area. The government notes the project is not yet approved.',
            scope: 'MV switchgear, unit substations, UPS and PDUs, standby generation, load banks for commissioning',
            isNew: true,
            source: { label: 'BNN Bloomberg, Oct. 15, 2026', url: 'https://www.bnnbloomberg.ca/business/technology/2026/10/15/data-centre-for-canadas-cyber-spy-agency-to-be-built-in-ottawa-area/' },
          },
          {
            title: 'St. Marys Cement behind-the-meter battery',
            where: 'Bowmanville (ON)',
            sector: 'Battery storage',
            owner: 'Rodan Energy Solutions (develops, owns and operates); St. Marys Cement as host',
            size: '50 MWh',
            stage: 'Agreement announced',
            timing: 'Schedule not disclosed',
            summary: 'Rodan Energy will build what the companies call Canada’s largest behind-the-meter battery at the Bowmanville cement plant, cutting grid demand at peak times.',
            scope: 'MV interconnection switchgear, step-up transformers, protection and metering',
            isNew: true,
            source: { label: 'Rodan Energy news release, Oct. 27, 2026', url: 'https://www.newswire.ca/news-releases/rodan-energy-to-build-canada-s-largest-behind-the-meter-battery-storage-system-at-st-marys-cement-806042034.html' },
          },
          {
            title: 'Two new downtown Vancouver substations',
            where: 'Vancouver (BC)',
            sector: 'Utility substation',
            owner: 'BC Hydro',
            size: 'West End (underground) and East Vancouver substations',
            stage: 'Advancing; replaces the ageing Dal Grauer and Murrin substations',
            timing: 'Construction from late 2026 subject to approvals; in service as early as 2032',
            summary: 'BC Hydro is moving ahead with two substations to replace end-of-life stations serving downtown Vancouver. Both existing stations stay in service during construction.',
            scope: 'GIS and MV switchgear, power transformers, protection and control, cable work',
            isNew: true,
            source: { label: 'B.C. government news release, 2026', url: 'https://news.gov.bc.ca/releases/2026ECS0052-001048' },
          },
          {
            title: 'Waterloo Wellington Power Line',
            where: 'Puslinch to Cambridge (ON)',
            sector: 'Transmission',
            owner: 'Hydro One',
            size: 'New 500/230 kV Wellington TS and about 25 km of double-circuit 230 kV line to Preston TS',
            stage: 'Class environmental assessment; four route options under study',
            timing: 'Construction not before 2029; in service 2031–2032',
            summary: 'Recommended by the IESO to meet load growth in Kitchener-Waterloo-Cambridge-Guelph. Open houses were held in September 2026.',
            scope: 'Station transformers, HV and MV switchgear, station service, protection',
            isNew: true,
            source: { label: 'Hydro One project page', url: 'https://www.hydroone.com/about/corporate-information/major-projects/waterloo-wellington-power-line' },
          },
        ],
      },
      {
        title: 'Data centres & large loads',
        intro: 'Where the grid capacity for new data centres is actually going.',
        items: [
          {
            title: 'Alberta’s first 1,200 MW of data centre load is allocated',
            where: 'Alberta',
            sector: 'Data centre',
            owner: 'AESO allocation: Meta / GLDC (Sturgeon County) and TransAlta (Keephills)',
            size: '970 MW and 230 MW; about 19.6 GW more requested',
            stage: 'Meta campus under construction; Phase II will require bring-your-own generation',
            timing: 'Phase II connection process being designed',
            summary: 'Alberta’s interim 1,200 MW limit for large data centres is fully taken by two projects. New entrants will need to bring their own generation under the province’s 2026 data centre regulation.',
            scope: 'Utility-scale substations, MV distribution, on-site generation tie-ins, commissioning load banks',
            source: { label: 'Government of Alberta: data centres by the numbers', url: 'https://www.alberta.ca/datacentres/numbers' },
          },
        ],
      },
      {
        title: 'Storage & renewables',
        intro: 'Contracted projects moving toward construction.',
        items: [
          {
            title: 'IESO LT2 Window 1: 14 solar and wind projects',
            where: 'Ontario',
            sector: 'Solar and wind',
            owner: 'Various developers, all with Indigenous equity partners',
            size: '12 solar projects (915 MW) and 2 wind (400 MW)',
            stage: '20-year contracts offered April 2026',
            timing: 'Commercial operation by 2030',
            summary: 'The first window of Ontario’s second long-term procurement added more than 1.3 GW of new wind and solar. EPC and electrical packages for these projects will be placed over the next two years.',
            scope: 'Collector switchgear, padmount step-up transformers, substation transformers',
            source: { label: 'IESO news, Apr. 9, 2026', url: 'https://www.ieso.ca/en/Sector-Participants/IESO-News/2026/04/April-9-IESO-Selects-14-Projects-Through-the-Long-Term-2-Request-for-Proposal-Energy-Stream' },
          },
          {
            title: 'Neoen Dryden battery',
            where: 'Dryden (ON)',
            sector: 'Battery storage',
            owner: 'Neoen, co-owned with Eagle Lake First Nation',
            size: '200 MW / 1,600 MWh',
            stage: '20-year IESO contract',
            timing: 'Construction from 2028; operation in 2030',
            summary: 'One of the largest battery projects contracted in Ontario, west of Dryden in the northwest.',
            scope: 'MV collector switchgear, inverter step-up transformers, substation',
            source: { label: 'Energy Storage News, June 2026', url: 'https://www.ess-news.com/2026/06/26/neoen-secures-20-year-contract-for-200-mw-1600-mwh-battery-project-in-canada/' },
          },
          {
            title: 'Vancouver Island battery storage',
            where: 'Near Duncan (BC)',
            sector: 'Battery storage',
            owner: 'BC Hydro (procurement)',
            size: 'At least 100 MW',
            stage: 'Procurement launched',
            timing: 'In service targeted for 2030',
            summary: 'BC Hydro’s first major battery storage procurement, to strengthen supply on Vancouver Island.',
            scope: 'MV switchgear, step-up transformers, interconnection substation',
            source: { label: 'B.C. government news release, 2026', url: 'https://news.gov.bc.ca/releases/2026ECS0039-000848' },
          },
          {
            title: 'Hydro-Québec 2026 wind call for tenders',
            where: 'Québec',
            sector: 'Wind',
            owner: 'Hydro-Québec (A/O 2026-01)',
            size: '5 to 10 TWh of wind energy',
            stage: 'Call for tenders open',
            timing: 'Commissioning between 2031 and 2038',
            summary: 'A long pipeline of Québec wind farms, each needing collector systems and grid connections.',
            scope: 'Collector switchgear, padmount and substation transformers',
            source: { label: 'Gowling WLG summary, 2026', url: 'https://gowlingwlg.com/en/insights-resources/articles/2026/hydro-quebec-appel-offres-eolien' },
          },
        ],
      },
      {
        title: 'Transmission & mining',
        intro: 'Grid build-outs that open up new mines and industrial loads.',
        items: [
          {
            title: 'North Coast Transmission Line, Phase 1',
            where: 'Prince George to Fraser Lake (BC)',
            sector: 'Transmission',
            owner: 'BC Hydro, with First Nations co-ownership of up to 50%',
            size: 'About 170 km of 500 kV line, Williston to Glenannan substations',
            stage: 'Under construction since summer 2026',
            timing: 'Phase 1 complete fall 2030; Phase 2 mid-2032',
            summary: 'The backbone for new industrial and mining load in northern BC.',
            scope: 'Substation expansions, transformers and switchgear at connecting stations',
            source: { label: 'Switchgear Magazine', url: 'https://switchgear-magazine.com/news/business/bc-hydro-to-begin-north-coast-transmission-line-project/' },
          },
          {
            title: 'Red Chris mine power line expansion',
            where: 'Northwest BC',
            sector: 'Mining',
            owner: 'Newmont (70%) and Imperial Metals',
            size: 'Up to 145 MW for an expanded mine; $500 million federal contribution to the line',
            stage: 'Expansion feasibility under study',
            timing: 'Funding announced July 2026',
            summary: 'Federal funding to expand the line serving the Red Chris copper-gold mine as its owners study a larger operation.',
            scope: 'Mine substations, MV distribution, portable power and mine-duty transformers',
            source: { label: 'Juneau Independent', url: 'https://www.juneauindependent.com/post/canada-will-help-pay-for-power-line-to-expand-mine-in-stikine-watershed' },
          },
          {
            title: 'Northern Ontario 500 kV lines and the Red Lake line',
            where: 'Northern and northwestern Ontario',
            sector: 'Transmission',
            owner: 'Hydro One (directed by the province and OEB)',
            size: 'Two 500 kV Essa–Hanmer lines; Dryden–Ear Falls–Red Lake lines',
            stage: 'Development and approvals',
            timing: 'First Essa–Hanmer line targeted for 2032',
            summary: 'Priority lines to carry new supply north and serve mining growth around Red Lake.',
            scope: 'Station transformers, HV switchgear and station upgrades',
            source: { label: 'Ontario Energy Board: priority transmission projects', url: 'https://www.oeb.ca/consultations-and-projects/priority-transmission-projects' },
          },
          {
            title: 'Labrador West transmission expansion study',
            where: 'Western Labrador (NL)',
            sector: 'Mining and transmission',
            owner: 'Government of Canada and Newfoundland and Labrador',
            size: 'Grid connections for critical-minerals mines, including Kami iron and Lac Knife graphite',
            stage: 'Assessment funded',
            timing: 'Announced Aug. 17, 2026',
            summary: 'Part of the federal clean-energy package that also secured Labrador power supply for Québec.',
            scope: 'Mine and transmission substations, MV distribution',
            source: { label: 'Prime Minister’s Office, Aug. 17, 2026', url: 'https://www.pm.gc.ca/en/news/news-releases/2026/08/17/prime-minister-carney-announces-largest-clean-energy-investment-north' },
          },
        ],
      },
      {
        title: 'Transit & EV charging',
        intro: 'Fleet electrification moving into design and construction.',
        items: [
          {
            title: 'TransLink battery-electric bus charging',
            where: 'Metro Vancouver (BC)',
            sector: 'Transit electrification',
            owner: 'TransLink',
            size: '57 battery-electric buses for Port Coquitlam; depot and on-route charging',
            stage: 'On-route charging under construction; depot charging design tendered (Sept. 2026)',
            timing: 'Buses delivered 2027–2029',
            summary: 'Depot charging design is out to tender while on-route charging construction runs to fall 2027.',
            scope: 'Depot switchgear and switchboards, padmount transformers, charger distribution',
            source: { label: 'TransLink bus projects', url: 'https://www.translink.ca/plans-and-projects/projects/maintenance-and-upgrade-program/bus-projects' },
          },
        ],
      },
    ],
  },
]

export const latestIssue = () => ISSUES[0]
export const itemCount = (i: RadarIssue) => i.sections.reduce((n, s) => n + s.items.length, 0)
