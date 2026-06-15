export const productsQuery = `*[_type == "product"] | order(order asc) {
  _id, name, slug, tagline, description,
  "image": image.asset->url,
  specs
}`

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id, name, description,
  "image": image.asset->url
}`

export const industriesQuery = `*[_type == "industry"] | order(order asc) {
  _id, name, description,
  "image": image.asset->url
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  heroHeading, heroSubheading, phone, email, address,
  "heroImage": heroImage.asset->url,
  stats
}`
