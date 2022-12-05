import { fetchTags } from "../lib/api"

const getTags = async (name_matches, limit) => {
  return await fetchTags(name_matches, limit, true)
}

export default getTags
