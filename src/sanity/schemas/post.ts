import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Publication',
  type: 'document',

  // ============================
  // GROUPES (sections pliables)
  // ============================
  fieldsets: [
    {
      name: 'french',
      title: '🇫🇷 Version française',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'english',
      title: '🇬🇧 Version anglaise (optionnelle)',
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ============================
    // GÉNÉRAL (hors fieldset)
    // ============================
    defineField({
      name: 'type',
      title: 'Type de publication',
      type: 'string',
      options: {
        list: [
          { title: 'Billet', value: 'billet' },
          { title: 'Aguiche', value: 'avant_propos' },
          { title: 'Pensée du samedi', value: 'pensee' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishDate',
      title: 'Date de publication',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (Rule) => Rule.required(),
    }),

    // ============================
    // VERSION FRANÇAISE
    // ============================

    defineField({
      name: 'title',
      title: 'Titre du billet',
      type: 'string',
      fieldset: 'french',
      hidden: ({ parent }) => parent?.type !== 'billet',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'billet' && !value) {
            return 'Le titre est obligatoire pour un billet'
          }
          return true
        }),
    }),

    defineField({
      name: 'subtitle',
      title: 'Titre de la pensée',
      type: 'string',
      fieldset: 'french',
      hidden: ({ parent }) => parent?.type !== 'pensee',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'pensee' && !value) {
            return 'Le titre est obligatoire pour une pensée du samedi'
          }
          return true
        }),
    }),

    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      fieldset: 'french',
      options: { hotspot: true },
    }),

    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      fieldset: 'french',
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

    defineField({
      name: 'closingLine',
      title: 'Phrase de clôture',
      type: 'string',
      fieldset: 'french',
      hidden: ({ parent }) => parent?.type !== 'billet',
    }),

    defineField({
      name: 'customClosing',
      title: 'Phrase de fin',
      type: 'string',
      fieldset: 'french',
      description:
        'Par défaut : "À demain in sha\'a Allah". Vous pouvez le remplacer si vous voulez',
      hidden: ({ parent }) => parent?.type !== 'avant_propos',
    }),

    // ============================
    // VERSION ANGLAISE
    // ============================

    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      fieldset: 'english',
      hidden: ({ parent }) => parent?.type !== 'billet',
    }),

    defineField({
      name: 'subtitleEn',
      title: 'Thought title (English)',
      type: 'string',
      fieldset: 'english',
      hidden: ({ parent }) => parent?.type !== 'pensee',
    }),

    defineField({
      name: 'coverImageEn',
      title: 'Cover image (English)',
      type: 'image',
      fieldset: 'english',
      options: { hotspot: true },
    }),

    defineField({
      name: 'bodyEn',
      title: 'Content (English)',
      type: 'array',
      fieldset: 'english',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'closingLineEn',
      title: 'Closing line (English)',
      type: 'string',
      fieldset: 'english',
      hidden: ({ parent }) => parent?.type !== 'billet',
    }),

    defineField({
      name: 'customClosingEn',
      title: 'Closing phrase (English)',
      type: 'string',
      fieldset: 'english',
      hidden: ({ parent }) => parent?.type !== 'avant_propos',
    }),
  ],

  // ============================
  // APERÇU
  // ============================
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
        type === 'billet' ? 'Billet'
        : type === 'avant_propos' ? 'Aguiche'
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