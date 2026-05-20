import { notes } from '@/data/content'

export const toAdminNoteSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const getAdminNoteItems = () =>
  notes.map((note) => ({
    ...note,
    slug: toAdminNoteSlug(note.title),
  }))
