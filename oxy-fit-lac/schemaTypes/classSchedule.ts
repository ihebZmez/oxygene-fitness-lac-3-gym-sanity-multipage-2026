import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'classSchedule',
  title: 'Planning',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Jour',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      },
    }),
    defineField({
      name: 'time',
      title: 'Heure',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'activity',
      title: 'Activité',
      type: 'reference',
      to: [{type: 'activity'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: [{type: 'coach'}],
    }),
    defineField({name: 'room', title: 'Salle / Studio', type: 'string'}),
    defineField({name: 'level', title: 'Niveau', type: 'string'}),
    defineField({
      name: 'active',
      title: 'Actif ?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      day: 'day',
      time: 'time',
      activity: 'activity.title',
      coach: 'coach.name',
    },
    prepare: ({day, time, activity, coach}) => ({
      title: `${day} · ${time}`,
      subtitle: `${activity || ''} ${coach ? '· ' + coach : ''}`,
    }),
  },
})
