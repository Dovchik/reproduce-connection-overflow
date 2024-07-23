import type { CollectionConfig } from 'payload'

export const Page: CollectionConfig = {
    slug: 'pages',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
        },
    ]
}
