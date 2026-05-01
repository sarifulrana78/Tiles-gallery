import { NextResponse } from 'next/server';
import tilesData from '@/data/tiles.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  let filteredTiles = tilesData;

  if (search) {
    const lowercaseSearch = search.toLowerCase();
    filteredTiles = tilesData.filter(tile => 
      tile.title.toLowerCase().includes(lowercaseSearch) ||
      tile.category.toLowerCase().includes(lowercaseSearch) ||
      tile.tags.some(tag => tag.toLowerCase().includes(lowercaseSearch))
    );
  }

  // Simulate network delay to show loader as per requirement
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json(filteredTiles);
}
