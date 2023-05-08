import prismadb from '@/app/libs/prismadb';

export default async function getListings() {
  try {
    const listings =
      await prismadb.listing.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    return listings;
  } catch (error) {
    throw new Error('Error fetched listings');
  }
}
