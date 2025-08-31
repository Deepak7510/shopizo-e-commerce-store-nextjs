import BigPromoBanner from "@/components/application/user/BigPromoBanner";
import FeaturesProducts from "@/components/application/user/FeaturesProducts";
import { MainSlider } from "@/components/application/user/MainSlider";
import PromoBanner from "@/components/application/user/PromoBanner";

export default async function HomePage() {
  return (
    <>
      {/* slider seaction  */}
      <MainSlider />
      <div className="px-20">

        {/* promotion Section  */}
        <section className="my-15">
          <PromoBanner />
        </section>

        {/* Normal Banner  */}
        <section className="my-15">
          <BigPromoBanner />
        </section>


        {/* features Product Section  */}
        <section className="my-15">
          <FeaturesProducts />
        </section>



      </div>


    </>
  );
}
