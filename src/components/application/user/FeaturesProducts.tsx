import { Button } from '@/components/ui/button'
import ProductCard from './ProductCard'

async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/products/get-features-products`,
      {
        next: {
          revalidate: 3600, // Revalidate every hour
          tags: ['featured-products']
        }
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    return res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    return { data: { products: [] } }
  }
}

const FeaturesProducts = async () => {
  const result = await getFeaturedProducts()
  const products = result?.data?.products || []

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className='font-medium text-2xl underline'>
          Features Products
        </h2>
        <Button className='px-5 rounded-full' size={"sm"} variant={"secondary"}>
          View All
        </Button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-10'>
        {products.length > 0 ? (
          products.map((productItem: any) => (
            <ProductCard key={productItem._id} productItem={productItem} />
          ))
        ) : (
          <div className='text-red-500 text-center sm:col-span-2 md:col-span-4'>
            No Products Available
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturesProducts