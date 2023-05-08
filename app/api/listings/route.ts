import { NextResponse } from 'next/server';

import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((item: any) => {
    if (!body[item]) {
      NextResponse.error();
    }
  });

  const listing = await prismadb.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
