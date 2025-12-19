import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { author } from './author'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, author, project],
}
