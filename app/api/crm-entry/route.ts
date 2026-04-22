export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const key = process.env.AZURE_CRM_ENTRY_KEY
  console.log("CRM key exists:", !!key)

  if (!key) {
    return NextResponse.json({ error: "Missing AZURE_CRM_ENTRY_KEY" }, { status: 500 })
  }

  const AZURE_FUNCTION_URL = `https://nistor-pdf-generator-a7cjeue8f6cagzdw.westeurope-01.azurewebsites.net/api/crm_entry?code=${key}`

  const response = await fetch(AZURE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const text = await response.text()
  console.log("Azure status:", response.status)
  console.log("Azure response:", text)

  try {
    const data = JSON.parse(text)
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json({ error: "Azure error", raw: text }, { status: 500 })
  }
}
