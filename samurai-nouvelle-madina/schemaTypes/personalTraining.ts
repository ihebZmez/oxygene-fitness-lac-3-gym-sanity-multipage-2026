import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'personalTraining',
  title: 'Coaching Personnel',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Sur-titre (badge)',
      type: 'string',
      description: 'Petit texte au-dessus du titre',
      initialValue: 'Coaching Personnel',
    }),
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'PERSONAL TRAINING',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: Un programme 100% sur mesure avec un coach dédié',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pillars',
      title: 'Les 4 piliers (avec icônes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Titre', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
            {
              name: 'icon',
              title: 'Icône (emoji)',
              type: 'string',
              description: 'Ex: 🎯 📋 🥗 📈',
            },
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
      description: 'Ex: 1-on-1 coaching, Customized program, Nutrition guidance, Progress tracking',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'image',
      title: 'Photo principale (coach + membre)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'packages',
      title: 'Formules / Packs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Nom du pack', type: 'string'},
            {name: 'sessions', title: 'Nombre de séances', type: 'string'},
            {name: 'price', title: 'Prix', type: 'string'},
            {name: 'perSession', title: 'Prix par séance', type: 'string'},
            {
              name: 'features',
              title: 'Inclus',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'popular',
              title: 'Pack mis en avant ?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'ctaLabel',
              title: 'Texte du bouton',
              type: 'string',
              initialValue: 'Réserver',
            },
          ],
          preview: {
            select: {title: 'name', subtitle: 'price'},
          },
        },
      ],
    }),
    defineField({
      name: 'startingPrice',
      title: 'Prix de départ (texte libre)',
      type: 'string',
      description: 'Ex: À partir de 60 DT / séance',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton principal',
      type: 'string',
      initialValue: 'Réserver une séance',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton principal',
      type: 'string',
      initialValue: '/contact?type=personal-training',
    }),
    defineField({
      name: 'note',
      title: 'Note bas de section',
      type: 'string',
      description: "Ex: Première séance d'évaluation offerte · Sans engagement",
    }),
    defineField({
      name: 'active',
      title: 'Actif ?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    prepare: () => ({title: 'Coaching Personnel'}),
  },
})
