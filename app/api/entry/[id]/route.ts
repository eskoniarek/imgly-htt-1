import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const res = await fetch (`https://ubique.img.ly/frontend-tha/entries/${id}.json`);

        if ( res.ok ) {
            const data = await res.json();
            return NextResponse.json(data);
        }
        else if (res.status === 404) {
            return NextResponse.json({message: 'Unfortunately, data not found' }, { status: 404 });
        } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error(error);
          return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
      }