import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activités',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (identifiant)',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'icon', title: 'Icône (emoji)', type: 'string'}),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: ['Force', 'Cardio', 'Fonctionnel', 'Dance & Fitness', 'Bien-être', 'Combat', 'Autre'],
      },
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      initialValue: 'Tous niveaux',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      initialValue: '45 min',
    }),
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
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
