import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'record.json')

// GET profile data
export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({ error: 'Unable to read profile data' }, { status: 500 })
  }
}

// POST (update) profile data
export async function POST(req: Request) {
  try {
    const newData = await req.json()
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8')
    return NextResponse.json({ message: 'Profile updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to update profile data' }, { status: 500 })
  }
}
