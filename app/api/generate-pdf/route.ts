import { NextRequest, NextResponse } from "next/server"

const AZURE_FUNCTION_URL = "https://nistor-pdf-generator-a7cjeue8f6cagzdw.westeurope-01.azurewebsites.net/api/dops_report?code=tX0KtsucJen1_VRX-0MSQypnqB1njvEceu7rpjuveCVHAzFubeI3-g=="

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const response = await fetch(AZURE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
