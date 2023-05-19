import { NextResponse } from 'next/server';

import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    NextResponse.error();
  }

  const body = await request.json();

  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
  } = body;

  if (
    !listingId ||
    !startDate ||
    !endDate ||
    !totalPrice
  ) {
    return NextResponse.error();
  }

  const listinAndReservation =
    await prismadb.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser!.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

  return NextResponse.json(listinAndReservation);
}
