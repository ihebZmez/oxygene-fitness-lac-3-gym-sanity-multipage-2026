import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'gymName',
      title: 'Nom du club',
      type: 'string',
      initialValue: 'Samurai Nouvelle Madina',
    }),
    defineField({name: 'tagline', title: 'Slogan', type: 'string'}),
    defineField({name: 'phone', title: 'Téléphone', type: 'string'}),
    defineField({name: 'whatsapp', title: 'Numéro WhatsApp', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Adresse', type: 'string'}),
    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'youtube', type: 'url', title: 'YouTube'},
        {name: 'tiktok', type: 'url', title: 'TikTok'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Horaires',
      type: 'object',
      fields: [
        {name: 'weekday', title: 'Lun–Ven', type: 'string'},
        {name: 'saturday', title: 'Samedi', type: 'string'},
        {name: 'sunday', title: 'Dimanche', type: 'string'},
      ],
    }),
    defineField({
      name: 'heroPoster',
      title: 'Image Hero (fallback)',
      type: 'image',
    }),
  ],
  preview: {prepare: () => ({title: 'Paramètres du site'})},
})
