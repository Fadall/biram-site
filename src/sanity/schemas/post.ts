import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Publication',
  type: 'document',
  fields: [
    // TYPE
    defineField({
      name: 'type',
      title: 'Type de publication',
      type: 'string',
      options: {
        list: [
          { title: 'Billet', value: 'billet' },
          { title: 'Avant-propos', value: 'avant_propos' },
          { title: 'Pensée du samedi', value: 'pensee' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // DATE
    defineField({
      name: 'publishDate',
      title: 'Date de publication',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (Rule) => Rule.required(),
    }),

    // TITRE (billet)
    defineField({
      name: 'title',
      title: 'Titre du billet',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'billet',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'billet' && !value) {
            return 'Le titre est obligatoire pour un billet'
          }
          return true
        }),
    }),

    // SOUS-TITRE (pensée)
    defineField({
      name: 'subtitle',
      title: 'Titre de la pensée',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'pensee',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'pensee' && !value) {
            return 'Le titre est obligatoire pour une pensée du samedi'
          }
          return true
        }),
    }),

    // IMAGE FRANÇAISE
    defineField({
      name: 'coverImage',
      title: 'Image de couverture (français)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'avant_propos',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (
            (context.parent?.type === 'billet' || context.parent?.type === 'pensee') &&
            !value
          ) {
            return "L'image est obligatoire"
          }
          return true
        }),
    }),

    // IMAGE ANGLAISE (optionnelle)
    defineField({
      name: 'coverImageEn',
      title: 'Image de couverture (anglais) — optionnelle',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'avant_propos',
      description:
        "Optionnel — image avec texte en anglais. Si vide, l'image française sera utilisée.",
    }),

    // CONTENU
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // PHRASE DE CLÔTURE (billet)
    defineField({
      name: 'closingLine',
      title: 'Phrase de clôture en italique',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'billet',
    }),

    // PHRASE PERSONNALISÉE (avant-propos)
    defineField({
      name: 'customClosing',
      title: 'Phrase de fin (optionnelle)',
      type: 'string',
      description:
        'Par défaut : "À demain in sha\'a Allah". Vous pouvez le remplacer si vous voulez',
      hidden: ({ parent }) => parent?.type !== 'avant_propos',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      type: 'type',
      date: 'publishDate',
      media: 'coverImage',
    },
    prepare({ title, subtitle, type, date, media }: any) {
      const typeLabel =
        type === 'billet'
          ? 'Billet'
          : type === 'avant_propos'
          ? 'Avant-propos'
          : 'Pensée du samedi'

      const dateFormatted = date
        ? new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'sans date'

      return {
        title: title || subtitle || `${typeLabel} du ${dateFormatted}`,
        subtitle: `${typeLabel} · ${dateFormatted}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Date (plus récent en premier)',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
})