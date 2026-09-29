import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'promotion',
  title: 'Promotions & Offres',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Titre de l'offre",
      type: 'string',
      description: 'Ex: NEW MEMBER OFFER, SUMMER CHALLENGE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre / Accroche',
      type: 'string',
      description: 'Ex: 1 mois + 1 semaine GRATUITE',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'badgeText',
      title: 'Texte du badge',
      type: 'string',
      description: 'Petit badge en haut. Ex: NOUVEAU, -20%, ÉTUDIANT',
      initialValue: 'OFFRE',
    }),
    defineField({
      name: 'discountText',
      title: 'Accroche discount (gros)',
      type: 'string',
      description: 'Ex: -20%, 1+1 GRATUIT, 2 MOIS OFFERTS',
    }),
    defineField({
      name: 'image',
      title: 'Image / Visuel',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: "J'en profite",
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton',
      type: 'string',
      description: '/contact, /tarifs, ou wa.me/…',
      initialValue: '/contact',
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'date',
      description: 'Laisse vide pour une offre permanente',
    }),
    defineField({
      name: 'highlight',
      title: 'Mise en avant ? (grand format)',
      type: 'boolean',
      initialValue: false,
      description: 'ON = carte large en vedette en haut de la section',
    }),
    defineField({
      name: 'accent',
      title: "Couleur d'accent",
      type: 'string',
      options: {
        list: [
          {title: 'Orange (défaut)', value: 'orange'},
          {title: 'Rouge (urgent)', value: 'red'},
          {title: 'Vert (bonne affaire)', value: 'green'},
          {title: 'Violet', value: 'purple'},
        ],
      },
      initialValue: 'orange',
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
      title: 'Ordre + Mise en avant',
      name: 'orderAsc',
      by: [
        {field: 'highlight', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'discountText',
      media: 'image',
    },
  },
})
