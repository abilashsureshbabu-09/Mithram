export const project = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Ongoing', value: 'ongoing' },
                    { title: 'Completed', value: 'completed' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        },
        {
            name: 'client',
            title: 'Client Details',
            type: 'object',
            fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'industry', title: 'Industry', type: 'string' },
                { name: 'location', title: 'Location', type: 'string' },
            ],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'roadmap',
            title: 'Roadmap',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Phase Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                        { name: 'date', title: 'Target Date', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
    ],
}
