import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    service: 'store-admin',
    timestamp: new Date().toISOString()
  })
}

