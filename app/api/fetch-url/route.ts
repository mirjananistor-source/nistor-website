import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ content: '', error: 'No URL provided' })
    }

    const azureUrl = process.env.AZURE_FETCH_URL_FUNCTION_URL
    if (!azureUrl) {
      return NextResponse.json({ content: '', error: 'Function not configured' })
    }

    const res = await fetch(azureUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(10000)
    })

    const data = await res.json()
    return NextResponse.json(data)

  } catch (err) {
    return NextResponse.json({ content: '', error: String(err) })
  }
}
