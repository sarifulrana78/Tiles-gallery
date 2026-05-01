import { NextResponse } from 'next/server';
import tilesData from '@/data/tiles.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const tile = tilesData.find((t) => t.id === resolvedParams.id);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!tile) {
    return NextResponse.json({ error: 'Tile not found' }, { status: 404 });
  }

  return NextResponse.json(tile);
}
