import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'transformation',
  title: 'Transformations',
  type: 'document',
  fields: [
    defineField({
      name: 'memberName',
      title: 'Nom du membre',
      type: 'string',
      description: 'Prénom + initiale conseillé (ex: Mehdi B.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'memberAge',
      title: 'Âge',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      title: 'Durée du programme',
      type: 'string',
      description: 'Ex: 4 mois, 6 mois, 12 semaines',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'program',
      title: 'Programme suivi',
      type: 'string',
      description: 'Ex: Coaching personnalisé, Cross Training',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Photo AVANT',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'Photo APRÈS',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weightLoss',
      title: 'Perte de poids (kg)',
      type: 'number',
      description: 'Laisse vide si non applicable. Affiche -X KG',
    }),
    defineField({
      name: 'muscleGain',
      title: 'Prise de muscle (kg)',
      type: 'number',
      description: 'Optionnel — affiche +X KG',
    }),
    defineField({
      name: 'results',
      title: 'Résultats clés (badges)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: + Force, + Confiance, + Énergie',
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'quote',
      title: 'Citation du membre',
      type: 'text',
      rows: 3,
      description: 'Ex: "After 4 months..."',
    }),
    defineField({
      name: 'rating',
      title: 'Note (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'consent',
      title: 'Consentement du membre obtenu ?',
      type: 'boolean',
      description: "Obligatoire — ne publier qu'avec accord écrit",
      initialValue: false,
      validation: (Rule) => Rule.custom((v) => (v ? true : 'Consentement requis')),
    }),
    defineField({
      name: 'featured',
      title: 'Mise en avant ?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Actif ?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Mise en avant + Ordre',
      name: 'orderAsc',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'memberName',
      subtitle: 'duration',
      media: 'afterImage',
    },
    prepare: ({title, subtitle, media}) => ({
      title,
      subtitle: `${subtitle || ''}`,
      media,
    }),
  },
})
