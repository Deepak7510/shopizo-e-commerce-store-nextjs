import BigPromoBanner from "@/components/application/user/BigPromoBanner";
import CoustomerReviews from "@/components/application/user/CoustomerReviews";
import FeaturesProducts from "@/components/application/user/FeaturesProducts";
import { MainSlider } from "@/components/application/user/MainSlider";
import PromoBanner from "@/components/application/user/PromoBanner";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RotateCw, Truck, Headphones, Gift } from "lucide-react";

export default async function HomePage() {
  return (
    <>
      {/* slider seaction  */}
      <MainSlider />
      {/* promotion Section  */}
      <section className="my-10 md:my-20 px-2 md:px-25">
        <PromoBanner />
      </section>

      {/* features Product Section  */}
      <section className="my-10 md:my-20 px-2 md:px-25">
        <FeaturesProducts />
      </section>

      {/* BigPromo Banner  */}
      <section className="my-10 md:my-20 px-2 md:px-25">
        <BigPromoBanner />
      </section>

      {/* CoustomerReviews  */}
      <section className="my-10 md:my-20 md:mb-10 px-2 md:px-25 ">
        <CoustomerReviews />
      </section>

      <section className="my-10 px-2 md:px-25">
        <Card className="p-2 shadow-none dark:border-slate-700 dark:bg-slate-950/20">
          <div className="grid md:grid-cols-4 gap-5 mt-3">
            <div className="flex flex-col items-center gap-0.5 text-center">
              <RotateCw className="w-7 h-7" />
              <h2 className="font-semibold text-lg">7-Days Returns</h2>
              <p className="text-muted-foreground">
                Shop with confidence — easy returns within 7 days.
              </p>
            </div>
            <Separator className="md:hidden" />
            <div className="flex flex-col items-center gap-0.5 text-center">
              <Truck className="w-7 h-7" />
              <h2 className="font-semibold text-lg">Free Shipping</h2>
              <p className="text-muted-foreground">
                Enjoy fast and free delivery on all orders.
              </p>
            </div>
            <Separator className="md:hidden" />
            <div className="flex flex-col items-center gap-0.5 text-center">
              <Headphones className="w-7 h-7" />
              <h2 className="font-semibold text-lg">24/7 Support</h2>
              <p className="text-muted-foreground">
                Our team is here anytime to help you.
              </p>
            </div>
            <Separator className="md:hidden" />
            <div className="flex flex-col items-center gap-0.5 text-center">
              <Gift className="w-7 h-7" />
              <h2 className="font-semibold text-lg">Member Discounts</h2>
              <p className="text-muted-foreground">
                Exclusive offers and rewards for members.
              </p>
            </div>
          </div>
        </Card>
      </section>


    </>
  );
}
