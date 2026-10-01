import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'Actualités',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coachName',
      title: 'Nom du coach',
      type: 'string',
      description: 'Ex: Olfa, Ahmed, Sarah',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image / Affiche',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'icons',
      title: 'Icônes (emojis)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: 💃 🔥 💪 — un emoji par entrée',
    }),
    defineField({
      name: 'day',
      title: 'Jour',
      type: 'string',
      options: {
        list: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Autre'],
      },
    }),
    defineField({
      name: 'time',
      title: 'Heure',
      type: 'string',
      description: 'Ex: 17:45',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Réservez votre place',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone à appeler',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'active',
      title: 'Afficher sur le site ?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Plus récentes',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'coachName', media: 'image'},
  },
})
