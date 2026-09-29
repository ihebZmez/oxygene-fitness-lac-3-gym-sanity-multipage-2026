import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: 'Tarifs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du plan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'price', title: 'Prix', type: 'number'}),
    defineField({
      name: 'currency',
      title: 'Devise',
      type: 'string',
      initialValue: 'DT',
    }),
    defineField({
      name: 'period',
      title: 'Période',
      type: 'string',
      initialValue: 'mois',
    }),
    defineField({
      name: 'features',
      title: 'Inclus dans ce plan',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'popular',
      title: 'Plan mis en avant ?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte bouton',
      type: 'string',
      initialValue: 'Réserver',
    }),
    defineField({name: 'order', title: "Ordre d'affichage", type: 'number'}),
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
    select: {title: 'name', subtitle: 'price'},
    prepare: ({title, subtitle}) => ({title, subtitle: `${subtitle} DT`}),
  },
})
