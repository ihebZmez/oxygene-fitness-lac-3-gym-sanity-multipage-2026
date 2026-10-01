import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'role', title: 'Rôle / Titre', type: 'string'}),
    defineField({name: 'content', title: 'Témoignage', type: 'text', rows: 4}),
    defineField({
      name: 'rating',
      title: 'Note (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'location', title: 'Ville', type: 'string'}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
    defineField({
      name: 'active',
      title: 'Actif ?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
