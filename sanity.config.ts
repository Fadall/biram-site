import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Biram Pathe Fall',

  projectId: '29axhn12',
  dataset: 'production',

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})