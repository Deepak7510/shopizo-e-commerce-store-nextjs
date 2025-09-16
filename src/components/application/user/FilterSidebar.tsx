"use client";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { userRoutes } from "@/lib/client/routes";

const sizeData = [
  {
    label: "S",
    _id: "S",
  },
  {
    label: "M",
    _id: "M",
  },
  {
    label: "L",
    _id: "L",
  },
  {
    label: "XL",
    _id: "XL",
  },
  {
    label: "XXL",
    _id: "XXL",
  },
];

const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [brands, setbrands] = useState<string[]>([]);

  const { data: categoriesData, loading: categoryLoading } = useFetch(
    "/api/user/categories/get-all"
  );
  const { data: subcategoriesData, loading: subcategoryLoading } = useFetch(
    "/api/user/subcategories/get-all"
  );
  const { data: brandsData, loading: brandLoading } = useFetch(
    "/api/user/brands/get-all"
  );
  //   const { data: colors } = useFetch("/api/user/colors/get-all");

  useEffect(() => {
    const categories = searchParams.get("categories");
    setCategories(categories ? categories.split(",") : []);
    const subcategories = searchParams.get("subcategories");
    setSubcategories(subcategories ? subcategories.split(",") : []);
  }, [searchParams]);

  function handleCatgeory(slug: string) {
    let cpyCategory = [...categories];
    if (cpyCategory?.includes(slug)) {
      cpyCategory = cpyCategory.filter((item: any) => item !== slug);
    } else {
      cpyCategory.push(slug);
    }
    setCategories(cpyCategory);

    if (cpyCategory.length > 0) {
      urlSearchParams.set("categories", cpyCategory.join(","));
    } else {
      urlSearchParams.delete("categories");
    }
    router.push(userRoutes.products + "?" + urlSearchParams);
  }

  function handleSubcategory(slug: string) {
    let cloneSubCategories = [...subcategories];
    if (subcategories.includes(slug)) {
      cloneSubCategories = cloneSubCategories.filter((item) => item !== slug);
    } else {
      cloneSubCategories.push(slug);
    }

    setSubcategories(cloneSubCategories);

    if (cloneSubCategories.at.length > 0) {
      urlSearchParams.set("subcategories", cloneSubCategories.join(","));
    } else {
      urlSearchParams.delete("subcategories");
    }

    router.push(userRoutes.products + "?" + urlSearchParams);
  }

  function handleBrands(slug: string) {
    let cloneBrands = [...brands];
    if (brands.includes(slug)) {
      cloneBrands = brands.filter((item) => item !== slug);
    } else {
      cloneBrands.push(slug);
    }
    setbrands(cloneBrands);

    if (cloneBrands.length > 0) {
      urlSearchParams.set("brands", cloneBrands.join(","));
    } else {
      urlSearchParams.delete("brands");
    }
    router.push(userRoutes.products + "?" + urlSearchParams);
  }

  return (
    <aside className="border-r h-fit w-[250px] sticky top-10 left-0 p-2 bg-muted">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["item-1", "item-2", "item-3", "item-4"]}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase font-semibold">
            Category
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="max-h-40 w-full overflow-y-auto space-y-2">
              {categoryLoading ? (
                <Skeleton className="w-full h-5" />
              ) : categoriesData?.data?.categories.length > 0 ? (
                categoriesData?.data?.categories.map((categoryItem: any) => {
                  return (
                    <div
                      key={categoryItem._id}
                      className="flex gap-2 items-center"
                    >
                      <Checkbox
                        id={categoryItem._id}
                        defaultChecked={categories.includes(categoryItem?.slug)}
                        onCheckedChange={() =>
                          handleCatgeory(categoryItem.slug)
                        }
                      />
                      <Label htmlFor={categoryItem._id}>
                        {categoryItem?.name}
                      </Label>
                    </div>
                  );
                })
              ) : (
                <div>No Category</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="uppercase font-semibold">
            Subcategory
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="max-h-40 w-full overflow-y-auto space-y-2">
              {subcategoryLoading ? (
                <Skeleton className="w-full h-5" />
              ) : subcategoriesData?.data?.subcategories?.length > 0 ? (
                subcategoriesData?.data?.subcategories.map(
                  (subcategoryItem: any) => {
                    return (
                      <div
                        key={subcategoryItem._id}
                        className="flex gap-2 items-center"
                      >
                        <Checkbox
                          id={subcategoryItem._id}
                          defaultChecked={subcategories.includes(
                            subcategoryItem?.slug
                          )}
                          onCheckedChange={() =>
                            handleSubcategory(subcategoryItem.slug)
                          }
                        />
                        <Label htmlFor={subcategoryItem._id}>
                          {subcategoryItem?.name}
                        </Label>
                      </div>
                    );
                  }
                )
              ) : (
                <div>No Subcategory</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="uppercase font-semibold">
            Brand
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="max-h-40 w-full overflow-y-auto space-y-2">
              {brandLoading ? (
                <Skeleton className="w-full h-5" />
              ) : brandsData?.data?.brands?.length > 0 ? (
                brandsData?.data?.brands.map((brandItem: any) => {
                  return (
                    <div
                      key={brandItem._id}
                      className="flex gap-2 items-center"
                    >
                      <Checkbox
                        id={brandItem.slug}
                        defaultChecked={brands.includes(brandItem.slug)}
                        onCheckedChange={() => handleBrands(brandItem.slug)}
                      />
                      <Label htmlFor={brandItem._id}>{brandItem?.name}</Label>
                    </div>
                  );
                })
              ) : (
                <div>No Brands</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="uppercase font-semibold">
            Size
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="max-h-40 w-full overflow-y-auto space-y-2">
              {sizeData?.map((brandItem: any) => {
                return (
                  <div key={brandItem._id} className="flex gap-2 items-center">
                    <Checkbox value={brandItem.slug} />
                    <Label htmlFor={brandItem._id}>{brandItem?.label}</Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="uppercase font-semibold">
            Color
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="max-h-40 w-full overflow-y-auto space-y-2">
              {sizeData?.map((brandItem: any) => {
                return (
                  <div key={brandItem._id} className="flex gap-2 items-center">
                    <Checkbox id={brandItem._id} />
                    <Label htmlFor={brandItem._id}>{brandItem?.label}</Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;
