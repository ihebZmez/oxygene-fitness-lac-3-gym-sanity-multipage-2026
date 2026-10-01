import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partnerProduct',
  title: 'Shop & Partenaires',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'string',
      description: 'Ex: MyProtein, Optimum Nutrition, Nike',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Protéines', value: 'protein'},
          {title: 'Compléments', value: 'supplements'},
          {title: 'Vêtements', value: 'clothing'},
          {title: 'Gants & Accessoires', value: 'gloves'},
          {title: 'Chaussures', value: 'shoes'},
          {title: 'Équipement', value: 'equipment'},
          {title: 'Nutrition', value: 'nutrition'},
          {title: 'Autre', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image du produit',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Prix (texte libre)',
      type: 'string',
      description: 'Ex: 89 DT, À partir de 120 DT, Prix partenaire',
    }),
    defineField({
      name: 'discountLabel',
      title: 'Badge promo (optionnel)',
      type: 'string',
      description: 'Ex: -15% membres, Recommandé',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Commander',
    }),
    defineField({
      name: 'ctaType',
      title: 'Type de lien',
      type: 'string',
      options: {
        list: [
          {title: 'WhatsApp (message pré-rempli)', value: 'whatsapp'},
          {title: 'Site partenaire', value: 'external'},
          {title: 'Page interne', value: 'internal'},
        ],
      },
      initialValue: 'whatsapp',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien / URL',
      type: 'string',
      description:
        "Si WhatsApp : laisse vide (utilise le numéro du site). Sinon, mets l'URL complète.",
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Message WhatsApp pré-rempli',
      type: 'string',
      description: 'Ex: Bonjour, je souhaite commander la protéine Whey Isolate.',
    }),
    defineField({
      name: 'partnerLogo',
      title: 'Logo du partenaire',
      type: 'image',
      options: {hotspot: true},
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
      title: 'name',
      subtitle: 'brand',
      media: 'image',
    },
  },
})
