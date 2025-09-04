"use client"
import useFetch from '@/hooks/useFetch'
import React from 'react'

const FilterSidebar = () => {

    const { data: categories } = useFetch('/api/user/categories/get-all');
    const { data: subcategories } = useFetch('/api/user/subcategories/get-all');
    const { data: brands } = useFetch('/api/user/brands/get-all');
    const { data: colors } = useFetch('/api/user/colors/get-all');

    console.log("catgeories", categories)
    console.log("subcategories", subcategories)
    console.log("brands", brands);
    console.log("colors", colors);


    return (
        <aside className='border-r h-fit min-w-[250px] sticky top-10 left-0'>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
            <h1>Deepak</h1>
        </aside>
    )
}


export default FilterSidebar
