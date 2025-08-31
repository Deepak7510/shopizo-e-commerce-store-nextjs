import { Button } from '@/components/ui/button'
import axios from 'axios'

import ProductCard from './ProductCard'


const fetchProduct = async function () {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/products/get-features-products`)
    return response.data
  } catch (error: any) {
    console.error(error)
    return error.response.data
  }
}

const FeaturesProducts = async () => {
  const result = await fetchProduct();
  console.log(result)

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className='mb-5 font-medium text-2xl underline'>
          Features Products
        </h2>
        <Button className='px-5 rounded-full' size={"sm"} variant={"outline"}>
          View All
        </Button>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-10'>
        {
          result && result?.data?.products && result?.data?.products.length > 0 ?
            result.data.products.map((productItem: any) => {
              return <ProductCard key={productItem._id} productItem={productItem} />
            })
            :
            <div className='text-red-500 text-center sm:col-span-2 md:col-span-4'>No Product</div>
        }
      </div>
    </div >
  )
}

export default FeaturesProducts
