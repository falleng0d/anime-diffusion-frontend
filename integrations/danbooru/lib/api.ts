import { z } from "zod"

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  post_count: z.number(),
  category: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  is_deprecated: z.boolean(),
  words: z.array(z.string())
})

export type Tag = z.infer<typeof TagSchema>

const baseUrl = "https://danbooru.donmai.us/tags.json?search"

export async function fetchTags(name_matches: string, limit: number, hide_empty: boolean) {
  const resp = await fetch(
    `${baseUrl}[name_matches]=${name_matches}&limit=${limit}&hide_empty=${hide_empty}`
  )
    .then((response) => response.json())
    .then()
  return TagSchema.array().parse(resp)
}
