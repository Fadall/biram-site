import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Obligatoire pour Billet et Pensée. Optionnel pour Avant-propos.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Utile surtout pour les pensées du samedi.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Date de publication',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'closingLine',
      title: 'Phrase de clôture',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type === 'avant_propos',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if ((context.parent.type === 'billet' || context.parent.type === 'pensee') && !value) {
            return 'L\'image de couverture est obligatoire pour ce type de publication';
          }
          return true;
        }),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Texte alternatif image',
      type: 'string',
      hidden: ({ parent }) => parent?.type === 'avant_propos',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Brouillon', value: 'draft' },
          { title: 'Publié', value: 'published' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedPost',
      title: 'Billet lié',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Pour les avant-propos : permet de lier le billet de demain.',
    }),
    defineField({
      name: 'authorSignature',
      title: 'Signature de l\'auteur',
      type: 'string',
      initialValue: 'BPF',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      date: 'publishDate',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, type, date, media } = selection;
      return {
        title: title || type.toUpperCase(),
        subtitle: `${type} - ${date}`,
        media,
      };
    },
  },
});
