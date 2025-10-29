import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Get the path to the public/images directory
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [] })
    }

    // Read all files in the directory
    const files = fs.readdirSync(imagesDir)
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })
    
    // Get file info for each image
    const images = imageFiles.map((filename, index) => {
      return {
        id: index + 1,
        filename,
        path: `/images/${filename}`,
        name: path.parse(filename).name
      }
    })
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json(
      { error: 'Failed to read images' },
      { status: 500 }
    )
  }
}

