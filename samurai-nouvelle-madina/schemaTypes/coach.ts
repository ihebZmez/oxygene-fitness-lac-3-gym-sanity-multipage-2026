import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'coach',
  title: 'Coachs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'role', title: 'Rôle', type: 'string'}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'specialties',
      title: 'Spécialités',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'experience',
      title: "Années d'expérience",
      type: 'string',
    }),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 4}),
    defineField({name: 'instagram', title: 'Instagram', type: 'string'}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
    defineField({
      name: 'active',
      title: 'Actif ?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
