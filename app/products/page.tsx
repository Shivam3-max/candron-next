import Link from 'next/link'

export const metadata = { title: 'Products | Candron Energy Inc.' }

export default function ProductsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg" style={{background:"url('/images/Switchgear.jpg.jpeg') center/cover"}}></div>
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Products</span></div>
          <div className="label label-white">Our Product Range</div>
          <h1>Power Distribution Solutions<br/>Built For Critical Infrastructure</h1>
          <p className="lead" style={{marginTop:'1rem'}}>Every product is engineered, manufactured, assembled, and tested in-house to ensure the highest standards of quality and performance.</p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container">

          <div className="prod-nav-v2 rv">
            <a href="#switchgear" className="active">Switchgear</a>
            <a href="#switchboards">Switchboards &amp; Panelboards</a>
            <a href="#controlpanels">Control Panels</a>
          </div>

          {/* SWITCHGEAR */}
          <div id="switchgear" style={{marginBottom:'7rem'}}>
            <div className="split split-2-3" style={{gap:'5rem',alignItems:'start'}}>
              <div className="rv-l">
                <div className="prod-detail-img">
                  <img src="/images/Switchgear.jpg.jpeg" alt="Electrical Switchgear"/>
                </div>
                <div style={{marginTop:'1.5rem',padding:'1.75rem',background:'var(--off)',borderRadius:'12px'}}>
                  <div style={{fontFamily:'var(--fm)',fontSize:'.6rem',color:'var(--blue)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'.85rem'}}>Quick Specs</div>
                  <table className="specs-table">
                    <tbody>
                      <tr><td>Type</td><td>Medium Voltage &amp; Low Voltage</td></tr>
                      <tr><td>Standards</td><td>ANSI/IEEE C37, CSA</td></tr>
                      <tr><td>Options</td><td>Arc Resistant Available</td></tr>
                      <tr><td>Testing</td><td>Full FAT In-House</td></tr>
                      <tr><td>Origin</td><td>Canadian Manufactured</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rv-r">
                <div className="label">Product 01</div>
                <h2 style={{marginBottom:'.75rem'}}>Switchgear</h2>
                <p style={{fontSize:'.88rem',fontFamily:'var(--fm)',color:'var(--blue)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'1rem'}}>Medium Voltage &amp; Low Voltage</p>
                <div className="product-standard-row">
                  <span className="product-standard">ANSI/IEEE C37</span>
                  <span className="product-standard">CSA Standards</span>
                </div>
                <p className="body" style={{marginBottom:'1.25rem'}}>Engineered for safe power distribution, system protection, and operational reliability. Candron's switchgear is designed and manufactured entirely in-house, ensuring complete quality control from engineering through factory acceptance testing.</p>
                <p className="body" style={{marginBottom:'1.5rem'}}>Unlike suppliers who depend on outsourced fabrication, every Candron switchgear unit is built to your exact specification in our Canadian facility — with full in-house testing before it ships.</p>
                <ul className="feature-list">
                  <li>Custom configurations to match project specifications and utility requirements</li>
                  <li>Arc resistant options available for enhanced personnel safety</li>
                  <li>Utility compliant designs engineered for North American standards</li>
                  <li>Complete in-house factory acceptance testing prior to shipment</li>
                  <li>Detailed documentation package included with every unit</li>
                </ul>
                <h4 style={{fontFamily:'var(--ft)',fontSize:'.75rem',fontWeight:700,color:'var(--gray)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:'.85rem'}}>Applications</h4>
                <div className="industry-tags">
                  <span className="industry-tag">Utilities</span>
                  <span className="industry-tag">Industrial Facilities</span>
                  <span className="industry-tag">Data Centers</span>
                  <span className="industry-tag">Commercial Buildings</span>
                  <span className="industry-tag">Infrastructure Projects</span>
                </div>
                <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1.5rem'}}>
                  <Link href="/contact" className="btn btn-primary mag">Request a Quote</Link>
                  <Link href="/contact" className="btn btn-outline-blue mag">Talk to an Engineer</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" style={{marginBottom:'7rem'}}></div>

          {/* SWITCHBOARDS & PANELBOARDS */}
          <div id="switchboards" style={{marginBottom:'7rem'}}>
            <div className="split" style={{gap:'5rem',alignItems:'start'}}>
              <div className="rv-l">
                <div className="label">Product 02</div>
                <h2 style={{marginBottom:'.75rem'}}>Switchboards &amp; Panelboards</h2>
                <p style={{fontSize:'.88rem',fontFamily:'var(--fm)',color:'var(--blue)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'1rem'}}>Reliable Power Distribution For Every Facility</p>
                <div className="product-standard-row">
                  <span className="product-standard">UL891</span>
                  <span className="product-standard">CSA C22.2</span>
                </div>
                <p className="body" style={{marginBottom:'1.25rem'}}>Custom-engineered switchboards and panelboards designed to provide safe and efficient power distribution for commercial, industrial, and infrastructure applications. Built to your exact requirements, assembled and tested in our Canadian facility.</p>
                <p className="body" style={{marginBottom:'1.5rem'}}>With full in-house engineering and manufacturing, Candron delivers switchboards that fit your project's specific electrical requirements — not off-the-shelf compromises.</p>
                <ul className="feature-list">
                  <li>Custom layouts engineered to project specifications</li>
                  <li>Integrated metering for energy monitoring and management</li>
                  <li>Flexible configurations for distribution, feeder, and branch circuit applications</li>
                  <li>Factory tested to UL891 and CSA C22.2 requirements</li>
                  <li>Fast lead times enabled by in-house manufacturing control</li>
                </ul>
                <h4 style={{fontFamily:'var(--ft)',fontSize:'.75rem',fontWeight:700,color:'var(--gray)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:'.85rem'}}>Applications</h4>
                <div className="industry-tags">
                  <span className="industry-tag">Commercial Buildings</span>
                  <span className="industry-tag">Manufacturing Facilities</span>
                  <span className="industry-tag">Healthcare</span>
                  <span className="industry-tag">Institutional Projects</span>
                  <span className="industry-tag">Infrastructure</span>
                </div>
                <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1.5rem'}}>
                  <Link href="/contact" className="btn btn-primary mag">Request a Quote</Link>
                  <Link href="/contact" className="btn btn-outline-blue mag">Talk to an Engineer</Link>
                </div>
              </div>
              <div className="rv-r">
                <div className="prod-detail-img">
                  <img src="/images/Switchboards%20%26%20Panelboards.jpg.jpeg" alt="Switchboards and Panelboards"/>
                </div>
                <div style={{marginTop:'1.5rem',padding:'1.75rem',background:'var(--off)',borderRadius:'12px'}}>
                  <div style={{fontFamily:'var(--fm)',fontSize:'.6rem',color:'var(--blue)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'.85rem'}}>Quick Specs</div>
                  <table className="specs-table">
                    <tbody>
                      <tr><td>Type</td><td>Switchboards &amp; Panelboards</td></tr>
                      <tr><td>Standards</td><td>UL891, CSA C22.2</td></tr>
                      <tr><td>Features</td><td>Custom Layouts, Metering</td></tr>
                      <tr><td>Testing</td><td>Factory Acceptance Testing</td></tr>
                      <tr><td>Origin</td><td>Canadian Manufactured</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" style={{marginBottom:'7rem'}}></div>

          {/* CONTROL PANELS */}
          <div id="controlpanels" style={{marginBottom:'4rem'}}>
            <div className="split split-2-3" style={{gap:'5rem',alignItems:'start'}}>
              <div className="rv-l">
                <div className="prod-detail-img">
                  <img src="/images/Control%20Panels.jpg.jpeg" alt="Control Panels"/>
                </div>
                <div style={{marginTop:'1.5rem',padding:'1.75rem',background:'var(--off)',borderRadius:'12px'}}>
                  <div style={{fontFamily:'var(--fm)',fontSize:'.6rem',color:'var(--blue)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'.85rem'}}>Quick Specs</div>
                  <table className="specs-table">
                    <tbody>
                      <tr><td>Type</td><td>Industrial Control Panels</td></tr>
                      <tr><td>Standards</td><td>UL 508A</td></tr>
                      <tr><td>Integration</td><td>PLC, HMI, SCADA</td></tr>
                      <tr><td>Testing</td><td>Functional &amp; FAT</td></tr>
                      <tr><td>Origin</td><td>Canadian Manufactured</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rv-r">
                <div className="label">Product 03</div>
                <h2 style={{marginBottom:'.75rem'}}>Control Panels</h2>
                <p style={{fontSize:'.88rem',fontFamily:'var(--fm)',color:'var(--blue)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'1rem'}}>UL 508A Industrial Control Panels</p>
                <div className="product-standard-row">
                  <span className="product-standard">UL 508A</span>
                </div>
                <p className="body" style={{marginBottom:'1.25rem'}}>Custom-built control panels engineered for automation, monitoring, and process control applications. Candron designs and builds control panels entirely in-house — from engineering through wiring, testing, and documentation.</p>
                <p className="body" style={{marginBottom:'1.5rem'}}>Our experienced engineering team works with your team to develop control panel solutions that integrate seamlessly with your process systems, automation platforms, and control architecture.</p>
                <ul className="feature-list">
                  <li>PLC integration with leading platforms — Allen-Bradley, Siemens, Schneider</li>
                  <li>HMI solutions for intuitive operator interfaces and remote monitoring</li>
                  <li>Motor control circuits engineered for industrial applications</li>
                  <li>SCADA compatibility with standard communication protocols</li>
                  <li>Complete functional testing and documentation package included</li>
                </ul>
                <h4 style={{fontFamily:'var(--ft)',fontSize:'.75rem',fontWeight:700,color:'var(--gray)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:'.85rem'}}>Applications</h4>
                <div className="industry-tags">
                  <span className="industry-tag">Manufacturing</span>
                  <span className="industry-tag">Water &amp; Wastewater</span>
                  <span className="industry-tag">Process Industries</span>
                  <span className="industry-tag">Energy Systems</span>
                  <span className="industry-tag">Building Automation</span>
                </div>
                <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1.5rem'}}>
                  <Link href="/contact" className="btn btn-primary mag">Request a Quote</Link>
                  <Link href="/contact" className="btn btn-outline-blue mag">Talk to an Engineer</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="container"><div className="cta-band-inner">
          <h2 className="rv">Ready to Get Started?</h2>
          <p className="lead rv" style={{color:'rgba(255,255,255,.6)',maxWidth:'500px'}}>Work directly with our engineers to develop the right power distribution solution for your project. Factory-direct pricing, faster lead times.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}} className="rv">
            <Link href="/contact" className="btn btn-primary btn-lg mag">Request a Quote</Link>
            <a href="tel:+16476162595" className="btn btn-outline btn-lg mag">+1 (647) 616-2595</a>
          </div>
        </div></div>
      </div>
    </>
  )
}
