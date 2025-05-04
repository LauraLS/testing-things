import type { APIRoute } from "astro"
import { convertToHtml, convertToStructure } from "@/libs/converter.ts"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { sections, documentStyle } = body
  const structure = convertToStructure(sections, documentStyle)
  const htmlString = convertToHtml(structure)
  return new Response(JSON.stringify({ status: "ok", render: htmlString }))
}
