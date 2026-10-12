import ProductTypePage from '@/components/ProductTypePage'

export const metadata = {
  title: 'Load Banks',
  description: 'Resistive, reactive, and combined load banks for generator, UPS, battery, and commissioning tests. Portable and permanent configurations from 1 kW to 30 MW.',
}

export default function LoadBanksPage() {
  return (
    <ProductTypePage
      parentName="Products"
      parentHref="/products"
      categoryName="Critical Power Distribution"
      categoryHref="/products/power-distribution"
      typeName="Load Banks"
      eyebrow="Resistive, Reactive & Combined Load Testing"
      subtitle="Portable and permanently installed load banks for validating generators, UPS systems, batteries, turbines, and complete electrical distribution systems under controlled load."
      heroImage="/images/products/power-distribution/load-bank.webp"
      applicationImage="/images/products/power-distribution/load-bank-application.webp"
      badges={['Resistive', 'Reactive', '1 kW–30 MW', 'Portable & Permanent']}
      kpis={[
        { value: '1 kW–30 MW', label: 'Capacity Range' },
        { value: 'Up to 15 kV', label: 'System Voltage' },
        { value: '0.8–1.0 PF', label: 'Load Profiles' },
        { value: 'CSA / UL', label: 'Available' },
      ]}
      overviewTitle="Prove Performance Before It Matters"
      overviewText="A load bank applies a precise electrical load so standby power equipment can be tested at operating conditions instead of at idle. CANDRON configures resistive, reactive, and combined systems around the source rating, desired power factor, duty cycle, cooling environment, and test procedure."
      overviewPoints={[
        'Generator, UPS, battery, and turbine testing under repeatable load',
        'Portable, trailer-mounted, radiator-mounted, and permanent outdoor configurations',
        'Local controls or automated load steps with remote monitoring and data capture',
        'Custom connection panels, cam-locks, breakers, and cable management',
      ]}
      features={[
        'Heavy-duty resistor elements selected for the specified duty cycle',
        'Branch circuit contactors and overcurrent protection for staged loading',
        'High-capacity forced-air cooling with airflow and overtemperature protection',
        'Digital metering for voltage, current, frequency, power, and power factor',
        'Emergency stop, door interlocks, and loss-of-airflow shutdown',
        'Weather-resistant enclosure options for permanent outdoor service',
      ]}
      upgrades={[
        'Reactive inductive load sections for 0.8 power-factor testing',
        'PLC/HMI controls with automatic test sequences and report export',
        'Remote operation over Modbus TCP, BACnet/IP, or hardwired I/O',
        'Trailer, skid, forklift-pocket, or radiator-mounted construction',
        'Medium-voltage transformer and switchgear integration',
        'Sound attenuation and cold-weather packages',
      ]}
      specRows={[
        { label: 'Load Type', value: 'Resistive, reactive, or combined resistive/reactive' },
        { label: 'Capacity', value: '1 kW to 30 MW; larger multi-module systems available' },
        { label: 'Voltage', value: '120 V to 600 V standard; medium-voltage systems up to 15 kV' },
        { label: 'Frequency', value: '50 Hz, 60 Hz, or dual-frequency configurations' },
        { label: 'Load Steps', value: 'Application-specific increments; manual or automatic sequencing' },
        { label: 'Power Factor', value: '1.0 resistive; 0.8 typical combined; other profiles available' },
        { label: 'Duty', value: 'Intermittent, continuous, or application-specific test cycles' },
        { label: 'Cooling', value: 'Forced air with airflow proving and overtemperature protection' },
        { label: 'Enclosures', value: 'Indoor, NEMA 3R, NEMA 4, or application-specific' },
        { label: 'Controls', value: 'Local switches, touchscreen HMI, remote I/O, or communications interface' },
      ]}
      standards={[
        { name: 'UL 508A', desc: 'Industrial control panel construction and control-system integration', logo: '/images/ugSolutions.png' },
        { name: 'CSA C22.2', desc: 'Canadian electrical equipment and industrial control requirements', logo: '/images/csa.png' },
        { name: 'IEEE 446', desc: 'Recommended practice for emergency and standby power systems', logo: '/images/IEEE.png' },
        { name: 'NFPA 110', desc: 'Emergency and standby power system testing requirements', logo: null },
      ]}
      applications={[
        'Generator commissioning and periodic exercising',
        'Data centre UPS and integrated systems testing',
        'Battery discharge and capacity testing',
        'Hospitals and mission-critical facilities',
        'Rental fleets and field service organizations',
        'Marine, mining, oil and gas, and industrial plants',
      ]}
      relatedTypes={[
        { name: 'Power Distribution Units', sub: '15–500 kVA', href: '/products/power-distribution-units' },
        { name: 'Remote Power Panels', sub: 'Up to 600 V', href: '/products/remote-power-panels' },
        { name: 'Control Panels', sub: 'UL 508A', href: '/products/control-panels' },
      ]}
      faqs={[
        { q: 'What is the difference between a resistive and reactive load bank?', a: 'A resistive load bank tests real power in kW at unity power factor. A reactive load bank adds inductive kVAR so the source is tested at a lower power factor, commonly 0.8, which more closely reproduces the electrical and mechanical loading of motors, transformers, and other site loads.' },
        { q: 'Can a load bank be connected to a medium-voltage generator?', a: 'Yes. The load bank can be designed for direct medium-voltage connection or paired with a step-down transformer and appropriately rated switchgear. The correct approach depends on voltage, capacity, available fault current, portability, and the required test procedure.' },
        { q: 'Can test sequences and results be automated?', a: 'Yes. PLC/HMI control can apply programmed load steps, monitor electrical and thermal conditions, time each stage, and export test results. Remote supervisory control can also be integrated through common industrial protocols.' },
      ]}
      quoteItems={[
        'Source type, kW/kVA rating, voltage, frequency, and power factor',
        'Required load steps, test duration, and duty cycle',
        'Portable, trailer-mounted, radiator-mounted, or permanent installation',
        'Indoor/outdoor environment and site ambient conditions',
        'Preferred controls, communications, and data-reporting requirements',
      ]}
    />
  )
}
