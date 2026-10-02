import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'corporateOffer',
  title: 'Offres Entreprises',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'FOR COMPANIES',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: Améliorez la santé et la productivité de votre équipe',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefits',
      title: 'Bénéfices (avec ✓)',
      type: 'array',
      of: [{type: 'string'}],
      description: "Ex: Santé, Énergie, Productivité, Cohésion d'équipe",
      initialValue: ['Santé', 'Énergie', 'Productivité'],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'services',
      title: 'Services proposés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Nom du service', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
            {
              name: 'icon',
              title: 'Icône (emoji)',
              type: 'string',
              description: 'Ex: 🏋️ 👥 🎯',
            },
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
      description: 'Ex: Abonnements corporate, Team training, Challenges',
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'logoStrip',
      title: 'Logos partenaires (optionnel)',
      type: 'array',
      of: [{type: 'image'}],
      description: "Logos d'entreprises clientes",
    }),
    defineField({
      name: 'startingPrice',
      title: 'Prix de départ',
      type: 'string',
      description: 'Ex: À partir de 250 DT/employé/mois',
    }),
    defineField({
      name: 'minimumEmployees',
      title: "Nombre minimum d'employés",
      type: 'number',
      description: 'Ex: 5',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Nous contacter',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton',
      type: 'string',
      initialValue: '/contact?type=corporate',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email dédié entreprises',
      type: 'string',
      description: 'Ex: corporate@oxygene-fitness-lac3.tn',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Téléphone dédié entreprises',
      type: 'string',
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
    prepare: () => ({title: 'Offre Entreprises'}),
  },
})
