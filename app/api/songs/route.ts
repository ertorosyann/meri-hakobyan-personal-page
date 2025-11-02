import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Get the path to the public/music directory
    const musicDir = path.join(process.cwd(), 'public', 'music')
    
    // Check if directory exists
    if (!fs.existsSync(musicDir)) {
      return NextResponse.json({ songs: [] })
    }

    // Read all files in the directory
    const files = fs.readdirSync(musicDir)
    
    // Filter only .mp3 files
    const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'))
    
    // Get file stats for each MP3
    const songs = mp3Files.map((filename, index) => {
      const filePath = path.join(musicDir, filename)
      const stats = fs.statSync(filePath)
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
      
      // Parse filename to extract song title and artists
      // Format: {timestamp}_{singer1}_{singer2}_{song-name}.mp3
      let title = ''
      let artists: string[] = []
      
      const nameWithoutExt = filename.replace('.mp3', '')
      const parts = nameWithoutExt.split('_')
      
      if (parts.length >= 2) {
        // Skip the first part (timestamp/number) if it's a number
        const startIndex = /^\d+$/.test(parts[0]) ? 1 : 0
        
        if (parts.length > startIndex + 1) {
          // All parts except the last are artists
          artists = parts.slice(startIndex, -1).map(p => p.replace(/-/g, ' '))
          // Last part is the song name
          title = parts[parts.length - 1].replace(/-/g, ' ')
        } else if (parts.length === startIndex + 1) {
          // Only one part after timestamp, it's the song name
          title = parts[startIndex].replace(/-/g, ' ')
        }
      }
      
      // Capitalize title
      title = title.charAt(0).toUpperCase() + title.slice(1)
      
      // Join artists
      const artistStr = artists.length > 0 
        ? artists.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' & ')
        : 'Merri Hakobyan'
      
      return {
        id: index + 1,
        title: title,
        artist: artistStr,
        filename: filename,
        fileSize: `${fileSizeInMB} MB`
      }
    })

    return NextResponse.json({ songs })
  } catch (error) {
    console.error('Error reading music files:', error)
    return NextResponse.json({ songs: [] }, { status: 500 })
  }
}

