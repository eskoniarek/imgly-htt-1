import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://ubique.img.ly/frontend-tha/data.json');
  const data = await res.json();
  return NextResponse.json(data);
}