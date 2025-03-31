import type { APIRoute } from "astro"
import { convertToHtml } from "@/libs/converter.ts"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const htmlString = convertToHtml(body)
  return new Response(JSON.stringify({ status: "ok", render: htmlString }))
}
