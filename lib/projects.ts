// Project highlights shown on the homepage (components/ProjectHighlights).
// These case studies used to sit on individual product and service pages; they now live
// in one place so customers can browse every completed project together.

export type ProjectCategory = 'transformers' | 'switchgear' | 'field' | 'expedited'

export interface ProjectStat { value: string; label: string }
export interface ProjectImage { src: string; alt: string }

export interface Project {
  id: string
  categories: ProjectCategory[]
  eyebrow: string
  title: string
  summary: string
  body: string[]
  stats: ProjectStat[]
  highlights: string[]
  images: ProjectImage[]
  cta: { label: string; href: string }
  product?: { label: string; href: string }
}

export const PROJECT_FILTERS: { key: 'all' | ProjectCategory; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'transformers', label: 'Transformers' },
  { key: 'switchgear', label: 'Switchgear & Switchboards' },
  { key: 'expedited', label: 'Expedited Delivery' },
  { key: 'field', label: 'Field Service & Emergency' },
]

export const PROJECTS: Project[] = [
  {
    id: 'seven-custom-power-transformers',
    categories: ['transformers'],
    eyebrow: 'Custom Engineered · Delivered at Scale',
    title: 'Seven Identical Custom Power Transformers',
    summary: 'Seven identical power transformers engineered around the customer’s existing specifications and integration requirements.',
    body: [
      'When replacement equipment needs to match existing infrastructure, precision matters. CANDRON delivered seven identical custom-built power transformers engineered around the customer’s existing specifications and integration requirements.',
      'Application-specific engineering and a trusted manufacturing partner deliver consistent, space-efficient power solutions for demanding replacement and expansion projects.',
    ],
    stats: [
      { value: '7', label: 'Identical Units' },
      { value: '28 Weeks', label: 'Order Release to Shipment' },
      { value: '55/65°C', label: 'Temperature Rise Design' },
    ],
    highlights: [
      'Custom engineered to match the existing transformer specifications',
      'Seven identical units made and shipped within 28 weeks of order release',
      'High-grade magnetic core engineered to optimize the overall transformer footprint',
      '55/65°C temperature-rise design',
    ],
    images: [
      { src: '/images/projects/custom-power-transformers/transformer-ready-to-ship.jpg', alt: 'Custom CANDRON power transformer prepared for shipment' },
      { src: '/images/projects/custom-power-transformers/transformer-radiator-bank.jpg', alt: 'Radiator bank and cooling assembly on a custom power transformer' },
      { src: '/images/projects/custom-power-transformers/transformer-front-view.jpg', alt: 'Front view of a custom-built power transformer at the factory' },
      { src: '/images/projects/custom-power-transformers/transformer-side-view.jpg', alt: 'Side view of a completed custom power transformer before shipment' },
      { src: '/images/projects/custom-power-transformers/transformer-final-inspection.jpg', alt: 'Custom power transformer undergoing final inspection before delivery' },
    ],
    cta: { label: 'Discuss a Custom Transformer', href: '/contact?product=custom-power-transformer' },
    product: { label: 'Power Transformers', href: '/products/transformers/substation/power' },
  },
  {
    id: 'arctic-mining-power-transformer',
    categories: ['transformers'],
    eyebrow: 'Arctic Mining',
    title: '15/20 MVA Power Transformer Built for the Arctic',
    summary: 'A 15/20 MVA unit stepping 69 kV down to 13.8 kV for critical infrastructure at a remote Arctic mine.',
    body: [
      'This 15/20 MVA power transformer steps 69 kV down to 13.8 kV for critical infrastructure in a demanding Arctic mining environment, where dependable operation and environmental performance are essential.',
    ],
    stats: [
      { value: '15/20 MVA', label: 'Rated Capacity' },
      { value: '69 / 13.8 kV', label: 'Voltage Transformation' },
      { value: 'CTs Included', label: 'Protection & Metering' },
      { value: 'Fully Instrumented', label: 'Gauges & Accessories' },
    ],
    highlights: [
      'Engineered specifically for remote Arctic mining applications',
      'Current transformers integrated for protection and metering',
      'Complete instrumentation package with monitoring gauges and accessories',
      'Application-specific configuration for demanding industrial service',
    ],
    images: [
      { src: '/images/projects/arctic-mining-transformer/arctic-mining-power-transformer.jpg', alt: '15/20 MVA 69 kV to 13.8 kV power transformer engineered for an Arctic mining project' },
    ],
    cta: { label: 'Discuss Your Application', href: '/contact?product=arctic-power-transformer' },
    product: { label: 'Power Transformers', href: '/products/transformers/substation/power' },
  },
  {
    id: '15kv-arctic-load-interrupter',
    categories: ['switchgear'],
    eyebrow: 'Arctic Service · Switchgear',
    title: '15 kV Fusible Load Interrupter for Arctic Weather',
    summary: 'A fully equipped three-bay, 600 A lineup with an outdoor Type 3R enclosure and front and rear access.',
    body: [
      'A fully equipped three-bay, 600 A lineup engineered for reliable medium-voltage switching and protection in demanding Arctic conditions, with an outdoor Type 3R enclosure and access from both the front and rear.',
    ],
    stats: [
      { value: '15 kV', label: 'Voltage Class' },
      { value: '600 A', label: 'Current Rating' },
      { value: '3 Bays', label: 'Lineup' },
      { value: 'Type 3R', label: 'Enclosure' },
    ],
    highlights: [
      'Fusible load-interrupter switching configuration',
      'Current transformers and potential transformers',
      'SEL protection relays',
      'Equipment viewing windows',
      'Arc-resistant construction',
      'Front and rear equipment access',
      'Outdoor enclosure configured for demanding Arctic weather',
    ],
    images: [
      { src: '/images/projects/15kv-arctic-load-interrupter/15kv-arctic-load-interrupter-lineup.png', alt: 'Three-bay 15 kV 600 A fusible load-interrupter switchgear lineup with viewing windows and outdoor Type 3R enclosures' },
      { src: '/images/projects/15kv-arctic-load-interrupter/15kv-type-3r-enclosure-interior.jpg', alt: 'Open 15 kV 600 A fusible load-interrupter switchgear compartment inside a Type 3R outdoor-rated enclosure' },
    ],
    cta: { label: 'Discuss an Arctic Switchgear Project', href: '/contact?product=15kv-arctic-load-interrupter' },
    product: { label: 'Load-Interrupter Switchgear', href: '/products/switchgear/load-interrupter' },
  },
  {
    id: 'mine-site-field-testing',
    categories: ['field'],
    eyebrow: 'Field Service · Mine Site',
    title: 'Mine-Site Transformer Testing, Mobilized Within 24 Hours',
    summary: 'A CANDRON field crew reached the mine within 24 hours of order confirmation and completed a full transformer test program.',
    body: [
      'A CANDRON field crew arrived at the mine within 24 hours of order confirmation, equipped to complete a comprehensive condition assessment of the transformer.',
      'The team combined visual inspection, fluid diagnostics, and electrical measurements to provide the client with clear test records and actionable information about transformer condition.',
    ],
    stats: [
      { value: '24 Hours', label: 'Order to On Site' },
      { value: '7 Tests', label: 'Diagnostic Program' },
      { value: 'Full Records', label: 'Documented Results' },
    ],
    highlights: [
      'Oil sampling and dissolved gas analysis (DGA)',
      'Sweep frequency response analysis (SFRA)',
      'Tan delta / power-factor testing',
      'Winding resistance (WR) and insulation resistance (IR)',
      'Transformer turns-ratio testing (TTR)',
    ],
    images: [
      { src: '/images/field-services/client-work/transformer-cable-termination.webp', alt: 'Field technician testing transformer cable terminations during commissioning' },
      { src: '/images/field-services/client-work/breaker-compartment-service.webp', alt: 'Field technician inspecting and servicing an open electrical breaker compartment' },
      { src: '/images/field-services/client-work/transformer-delivery-unloading.webp', alt: 'Field crew safely unloading a power transformer at the project site' },
      { src: '/images/field-services/client-work/transformer-terminal-compartment.webp', alt: 'Technician completing work in an open transformer terminal compartment' },
    ],
    cta: { label: 'Request Field Testing', href: '/contact?service=field-testing' },
    product: { label: 'Field Service & Commissioning', href: '/commissioning' },
  },
  {
    id: 'emergency-loop-transformer-response',
    categories: ['field', 'expedited'],
    eyebrow: '24/7 Emergency Response',
    title: 'Four Units Down. Our Team Kept Moving.',
    summary: 'Four failed loop transformers caused a critical outage. Our team staged, loaded and dispatched replacements overnight.',
    body: [
      'A string of four transformers in an existing loop experienced a design-related failure, creating a critical outage and operational downtime. CANDRON’s warehouse and logistics team worked through the night to stage, load, and dispatch replacement equipment.',
    ],
    stats: [
      { value: '24/7', label: 'Response Capability' },
      { value: '4 Units', label: 'Affected Loop' },
      { value: 'Overnight', label: 'Staging & Dispatch' },
    ],
    highlights: [
      'Emergency inventory and equipment coordination',
      'Night-shift staging and forklift loading',
      'Multi-unit transportation planning and dispatch',
      'One accountable response team focused on reducing downtime',
    ],
    images: [
      { src: '/images/projects/emergency-loop-transformer-response/four-transformers-dispatch.jpg', alt: 'Four replacement transformers staged on trailers for overnight emergency dispatch' },
      { src: '/images/projects/emergency-loop-transformer-response/night-loading-transformers.jpg', alt: 'Warehouse team loading replacement transformers onto a flatbed trailer at night' },
      { src: '/images/projects/emergency-loop-transformer-response/overnight-logistics-team.jpg', alt: 'Forklift and logistics crew coordinating an overnight transformer shipment' },
      { src: '/images/projects/emergency-loop-transformer-response/emergency-equipment-staging.jpg', alt: 'Emergency transformer and support equipment staged for nighttime transportation' },
    ],
    cta: { label: 'Request Emergency Support', href: '/contact?service=emergency-transformer-response' },
  },
  {
    id: 'one-day-dry-type-transformer',
    categories: ['transformers', 'expedited'],
    eyebrow: 'Expedited Supply · Canadian-Made',
    title: 'Transformer Supplied in 24 Hours and Personally Delivered',
    summary: 'An urgent order supplied within 24 hours of confirmation and delivered by our team to prevent system disruption.',
    body: [
      'When a customer needed a transformer urgently, our team had the Canadian-made unit ready within 24 hours of order confirmation and personally delivered it to help prevent system disruption.',
      'We go beyond standard production schedules to help keep critical projects moving and customer systems running. Need it fast? We make it happen.',
      'Expedited scheduling is subject to transformer configuration, engineering review, component availability, and production capacity at the time of order.',
    ],
    stats: [
      { value: '24 Hours', label: 'Case-Study Turnaround' },
      { value: 'Up to 300 kVA', label: 'Eligible Capacity' },
      { value: 'Up to 600 V', label: 'Eligible Voltage' },
    ],
    highlights: [
      'One-day expedited turnaround available',
      'Supplied in 24 hours',
      'Personally delivered',
      'Canadian-made',
    ],
    images: [
      { src: '/images/projects/one-day-dry-type-transformer/one-day-transformer-delivery.jpg', alt: 'Canadian-made dry-type transformer delivered within 24 hours for an urgent customer requirement' },
    ],
    cta: { label: 'Request Expedited Service', href: '/contact?product=one-day-dry-type-transformer' },
    product: { label: 'Standard LV Transformers', href: '/products/transformers/dry-type-lv/standard' },
  },
  {
    id: '500kva-expedited-distribution',
    categories: ['transformers', 'expedited'],
    eyebrow: 'Complete Distribution Package',
    title: '500 kVA Transformer Delivered in Two Days',
    summary: 'A 500 kVA transformer plus an in-stock 1200 A Eaton switchboard, delivered together from one supplier.',
    body: [
      'A 500 kVA transformer configured for 600 V Delta primary and 480/277 V Wye secondary was produced and delivered within two days of release. A 1200 A Eaton in-stock switchboard completed the distribution package, giving the customer a single expedited source for both pieces of equipment.',
      'The customer received a complete, expedited solution from one supplier and was extremely satisfied with the speed of supply and delivery service. The equipment CANDRON provides is CSA, cULus, and UL certified as applicable.',
    ],
    stats: [
      { value: '500 kVA', label: 'Rated Capacity' },
      { value: '600 V Δ', label: 'Primary' },
      { value: '480/277 V Y', label: 'Secondary' },
      { value: '2 Days', label: 'Release to Delivery' },
    ],
    highlights: [
      'One-stop distribution package',
      '1200 A Eaton switchboard from stock',
      'Expedited site arrival and unloading',
    ],
    images: [
      { src: '/images/projects/500kva-expedited-distribution/transformer-switchboard-delivery.jpg', alt: '500 kVA transformer and 1200 amp Eaton switchboard delivered together at the customer site' },
      { src: '/images/projects/500kva-expedited-distribution/eaton-switchboard-delivered.jpg', alt: '1200 amp Eaton switchboard delivered alongside EV charging equipment' },
      { src: '/images/projects/500kva-expedited-distribution/equipment-site-arrival.jpg', alt: 'Expedited transformer and switchboard package arriving at the installation site' },
      { src: '/images/projects/500kva-expedited-distribution/transformer-unloading.jpg', alt: 'Technician unloading the wrapped 500 kVA transformer at the customer site' },
      { src: '/images/projects/500kva-expedited-distribution/transformer-delivered.jpg', alt: 'Wrapped 500 kVA transformer positioned at the project site after delivery' },
    ],
    cta: { label: 'Request Expedited Distribution Equipment', href: '/contact?product=expedited-distribution-package' },
    product: { label: 'LV Dry-Type Transformers', href: '/products/transformers/dry-type-lv' },
  },
  {
    id: '2500kva-autotransformer',
    categories: ['transformers', 'expedited'],
    eyebrow: 'Expedited Supply · Final Winding Stage',
    title: '2500 kVA Copper-Wound Autotransformer in Under a Week',
    summary: 'A 2500 kVA, 600 V to 480 V autotransformer committed on a two-week lead time and delivered within one week.',
    body: [
      'Final winding and lead preparation for a 2500 kVA, 600 V to 480 V autotransformer — shown immediately before the dip-and-bake insulation stage.',
      'The project was committed on a two-week lead time and completed and delivered within one week.',
    ],
    stats: [
      { value: '2500 kVA', label: 'Rated Capacity' },
      { value: '600 → 480 V', label: 'Voltage' },
      { value: 'Copper', label: 'Windings' },
      { value: '< 1 Week', label: 'Delivered' },
    ],
    highlights: [
      'Copper-wound phase coils',
      'Final pre-process inspection before dip and bake',
      'Delivered in under one week against a two-week commitment',
    ],
    images: [
      { src: '/images/projects/2500kva-autotransformer/2500kva-coil-side.jpg', alt: 'Side view of a 2500 kVA copper-wound autotransformer before dip-and-bake processing' },
      { src: '/images/projects/2500kva-autotransformer/2500kva-three-phase-coils.jpg', alt: 'Three copper-wound coils for a 2500 kVA 600 V to 480 V autotransformer' },
      { src: '/images/projects/2500kva-autotransformer/2500kva-coils-close.jpg', alt: 'Close view of the autotransformer windings and copper leads before impregnation' },
    ],
    cta: { label: 'Discuss an Expedited Transformer', href: '/contact?product=2500kva-autotransformer' },
  },
  {
    id: '2500a-switchboard-two-weeks',
    categories: ['switchgear', 'expedited'],
    eyebrow: 'Canadian-Made · Switchboards',
    title: '2,500 A, 65 kA Switchboard Supplied in Two Weeks',
    summary: 'A custom three-cell, 600 V Canadian-made switchboard supplied in two weeks for a demanding power-distribution application.',
    body: [
      'This custom 2,500 A, 600 V, 65 kA switchboard was made in Canada and supplied by CANDRON in two weeks for a demanding power-distribution application, combining practical engineering, close production follow-up and lean scheduling.',
      'Expedited lead times of 2–3 weeks are available for switchboards up to 3,200 A, 600 V, 65 kA. Schedule is subject to approved drawings, component availability, and final project requirements.',
    ],
    stats: [
      { value: '2,500 A', label: 'Current Rating' },
      { value: '600 V', label: 'System Voltage' },
      { value: '65 kA', label: 'Fault Rating' },
      { value: '2 Weeks', label: 'Supply Time' },
    ],
    highlights: [
      'Three-cell switchboard configuration',
      'Right-entry wireway into the main breaker section',
      'Dedicated PUC metering compartment',
      'Final section configured for four 1,600 A breakers',
    ],
    images: [
      { src: '/images/projects/2500a-switchboard-production/2500a-switchboard-production.jpg', alt: 'Three-cell 2500 A switchboard in production in Canada for CANDRON' },
    ],
    cta: { label: 'Request an Expedited Quote', href: '/contact?product=expedited-switchboard' },
    product: { label: 'Main Breaker Switchboards', href: '/products/switchboards/main-breaker' },
  },
  {
    id: 'custom-replacement-transformer',
    categories: ['transformers'],
    eyebrow: 'Replacement Engineering',
    title: 'Identical Fit. Better Performance.',
    summary: 'A replacement transformer matched to an existing unit’s footprint and connections — quieter, with lower losses.',
    body: [
      'This custom replacement transformer was engineered to match the existing unit’s dimensions and electrical specifications while improving sound performance, efficiency, and overall footprint. A higher-grade Italian core was selected to minimize sound level and losses without compromising the required fit.',
      'Qualitrol gauges and an Eaton tap changer completed the engineered accessory package, with the design developed around the customer’s existing site interfaces.',
    ],
    stats: [
      { value: 'Italian', label: 'High-Grade Core' },
      { value: 'Weidmann', label: 'Insulation Material' },
      { value: '55 / 65°C', label: 'Split Temperature Rise' },
      { value: '26 Weeks', label: 'Design to Delivery' },
    ],
    highlights: [
      'Matched existing transformer dimensions and electrical specifications',
      'Higher-grade core selected for lower sound level and reduced losses',
      'Weidmann insulation materials',
      'Qualitrol gauges and monitoring instruments',
      'Eaton tap changer',
    ],
    images: [
      { src: '/images/projects/custom-replacement-transformer/custom-transformer-side-view.jpg', alt: 'Custom replacement transformer with forced-air cooling and compact radiator arrangement' },
      { src: '/images/projects/custom-replacement-transformer/custom-transformer-front-view.jpg', alt: 'Front view of the custom transformer cooling banks and accessories' },
      { src: '/images/projects/custom-replacement-transformer/custom-transformer-rear-view.jpg', alt: 'Rear view of the custom replacement transformer during factory handling' },
      { src: '/images/projects/custom-replacement-transformer/custom-transformer-radiator-view.jpg', alt: 'Radiator bank and tank assembly on the custom transformer' },
      { src: '/images/projects/custom-replacement-transformer/custom-transformer-three-quarter-view.jpg', alt: 'Three-quarter view of the completed custom replacement transformer' },
    ],
    cta: { label: 'Discuss a Custom Replacement', href: '/contact?product=custom-replacement-transformer' },
    product: { label: 'Substation Transformers', href: '/products/transformers/substation' },
  },
  {
    id: '6mva-fr3-transformer',
    categories: ['transformers'],
    eyebrow: 'Medium Voltage · Power Transformer',
    title: 'A 6 MVA Beast Built for Serious Power',
    summary: 'A 6 MVA, 44 kV to 15 kV transformer with copper windings, FR3 natural ester fluid and fan-assisted cooling.',
    body: [
      'A 6 MVA power transformer engineered for demanding medium-voltage applications, stepping 44 kV down to 15 kV with copper windings, FR3 natural ester insulating fluid, and fan-assisted cooling.',
    ],
    stats: [
      { value: '6 MVA', label: 'Rated Capacity' },
      { value: '44 → 15 kV', label: 'Voltage Transformation' },
      { value: '36 Months', label: 'Warranty' },
    ],
    highlights: [
      'Copper-wound construction',
      'FR3 natural ester insulating fluid',
      'Fan-assisted cooling',
      'Monitoring gauges and complete instrumentation',
      'cULus Listed',
    ],
    images: [
      { src: '/images/projects/6mva-fr3-transformer/6mva-transformer-front.jpg', alt: 'Front view of a 6 MVA 44 kV to 15 kV CANDRON power transformer prepared for transport' },
      { src: '/images/projects/6mva-fr3-transformer/6mva-transformer-side.jpg', alt: 'Side view of a copper-wound 6 MVA transformer with FR3 fluid and fan-assisted cooling' },
    ],
    cta: { label: 'Discuss Your Application', href: '/contact?product=6mva-fr3-transformer' },
    product: { label: 'Power Transformers', href: '/products/transformers/substation/power' },
  },
  {
    id: '3mva-inverter-duty-padmount',
    categories: ['transformers'],
    eyebrow: 'Inverter Duty · Loop Feed',
    title: '3 MVA Inverter-Duty Padmount Transformer',
    summary: 'A 27.6 kV loop-feed padmount stepping down to 600Y/347 V for inverter-duty service.',
    body: [
      'This 3 MVA, 27.6 kV loop-feed pad-mounted transformer steps 27.6 kV Delta down to 600Y/347 V for inverter-duty service. Made by a manufacturing partner in Texas, USA, it combines precision engineering with robust, efficiency-focused construction.',
    ],
    stats: [
      { value: '3 MVA', label: 'Rated Capacity' },
      { value: '27.6 kV Δ', label: 'Primary Voltage' },
      { value: '600Y/347 V', label: 'Secondary Voltage' },
      { value: 'Loop Feed', label: 'HV Configuration' },
    ],
    highlights: [
      'Precision-engineered for inverter-duty applications',
      'Loop-feed high-voltage configuration for distribution continuity',
      'High-grade magnetic core for lower sound levels and improved efficiency',
      'Heavy-duty active parts and internal assembly components',
      'Generously sized tank interior for convenient field maintenance',
      'Corrosion-resistant base construction',
      'Three-year warranty',
    ],
    images: [
      { src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-front.jpg', alt: 'Front view of a wrapped 3 MVA inverter-duty pad-mounted transformer prepared for delivery' },
      { src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-three-quarter.jpg', alt: 'Three-quarter view of a 27.6 kV Delta to 600Y/347 V pad-mounted transformer' },
      { src: '/images/projects/3mva-inverter-duty-padmount/3mva-padmount-side.jpg', alt: 'Side view of the corrosion-resistant enclosure on a 3 MVA inverter-duty pad-mounted transformer' },
    ],
    cta: { label: 'Discuss Your Application', href: '/contact?product=3mva-inverter-duty-padmount' },
    product: { label: 'Three-Phase Padmounts', href: '/products/transformers/padmount/three-phase' },
  },
  {
    id: 'mv-vpi-outdoor-transformer',
    categories: ['transformers'],
    eyebrow: 'Canadian-Made · MV Dry-Type',
    title: 'Outdoor-Rated MV Dry-Type Transformer, VPI Insulated',
    summary: 'A medium-voltage VPI dry-type transformer made in Canada and supplied within 16 weeks of drawing approval.',
    body: [
      'This medium-voltage dry-type transformer was made in Canada for CANDRON with VPI insulation technology and an outdoor-rated enclosure, combining robust construction with application-specific engineering.',
    ],
    stats: [
      { value: 'Made in Canada', label: 'Canadian-Made' },
      { value: 'Medium Voltage', label: 'Dry-Type Transformer' },
      { value: 'VPI', label: 'Insulation Technology' },
      { value: '16 Weeks', label: 'From Drawing Approval' },
    ],
    highlights: [
      'Made in Canada, provided by CANDRON',
      'Vacuum Pressure Impregnated insulation system',
      'Outdoor-rated enclosure for demanding installations',
      'Application-specific electrical and mechanical engineering',
      'Supplied within 16 weeks of drawing approval',
    ],
    images: [
      { src: '/images/projects/mv-vpi-outdoor-transformer/mv-vpi-outdoor-enclosure.jpg', alt: 'Medium-voltage VPI dry-type transformer installed inside its outdoor-rated enclosure' },
      { src: '/images/projects/mv-vpi-outdoor-transformer/mv-vpi-three-phase-coil-assembly.jpg', alt: 'Three-phase medium-voltage VPI dry-type transformer coil assembly in production' },
      { src: '/images/projects/mv-vpi-outdoor-transformer/mv-vpi-enclosure-assembly.jpg', alt: 'Medium-voltage VPI dry-type transformer being fitted inside its ventilated enclosure' },
      { src: '/images/projects/mv-vpi-outdoor-transformer/mv-vpi-windings-close.jpg', alt: 'Close view of VPI medium-voltage dry-type transformer windings and bus connections' },
    ],
    cta: { label: 'Discuss Your Application', href: '/contact?product=mv-vpi-outdoor-transformer' },
    product: { label: 'MV Dry-Type Transformers', href: '/products/transformers/dry-type-mv/standard' },
  },
  {
    id: 'custom-panelboard',
    categories: ['switchgear'],
    eyebrow: 'Completed Equipment · Panelboard',
    title: 'Custom Panelboard Engineered Around the Application',
    summary: 'A compact, floor-standing panelboard with front-access branch breakers in a serviceable footprint.',
    body: [
      'A completed CANDRON panelboard with a compact, floor-standing enclosure and front-access breaker arrangement. The assembly is engineered to organize branch distribution in a serviceable footprint while providing a clean, durable finished installation.',
    ],
    stats: [
      { value: 'Custom', label: 'Configuration' },
      { value: 'Front', label: 'Access' },
      { value: 'Multi', label: 'Breaker Layout' },
      { value: 'Canada', label: 'Made in' },
    ],
    highlights: [
      'Compact floor-standing enclosure designed for organized power distribution',
      'Front-access branch breakers support clear operation and servicing',
      'Ventilated metal enclosure with integrated equipment identification',
      'Breaker arrangement and internal construction engineered to project requirements',
    ],
    images: [
      { src: '/images/projects/custom-panelboard/custom-panelboard.png', alt: 'Completed CANDRON custom panelboard in a grey floor-standing enclosure with multiple front-access circuit breakers' },
    ],
    cta: { label: 'Discuss a Panelboard Project', href: '/contact?product=custom-panelboard' },
    product: { label: 'Remote Power Panels', href: '/products/remote-power-panels' },
  },
]
