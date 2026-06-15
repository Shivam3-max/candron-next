import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industry',
  title: 'Industries',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Industry Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
