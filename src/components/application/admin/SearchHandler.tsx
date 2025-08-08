"use client"
import { Input } from '@/components/ui/input'
import React, { ChangeEventHandler, useEffect, useState } from 'react'

const SearchHandler = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchList, setSearchList] = useState<string[]>([]);

    const handleSeachChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.target.value);
    }


    useEffect(() => {

        if (searchValue?.length > 0) {

        }

    }, [searchValue]);

    return (
        <div>
            <Input placeholder='Search page' onChange={handleSeachChange} className='rounded-full' type="search" />

        </div>
    )
}

export default SearchHandler
