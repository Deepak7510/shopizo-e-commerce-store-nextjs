import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { XIcon } from 'lucide-react';
import React, { SetStateAction } from 'react';

type Props = {
    openSearch: boolean;
    setOpenSearch: React.Dispatch<SetStateAction<boolean>>
}

const SearchHandler: React.FC<Props> = ({ setOpenSearch }) => {
    return (
        <div className='flex gap-3 px-2 md:px-50'>
            <Input placeholder='Search' className='rounded-full md:min-w-[300px] shadow-none' type="search" />
            <Button onClick={() => setOpenSearch(false)} variant={"ghost"} size={"icon"}><XIcon /></Button>
        </div>
    )
}

export default SearchHandler
