import { requireAuth } from "~/utils/auth"

export default defineEventHandler(async (event) => {
  
    const payload = await requireAuth(event)
  
    return {
      ...payload,
    }
  })