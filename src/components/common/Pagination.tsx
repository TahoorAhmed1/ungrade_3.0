import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
type Props = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function Pagination({totalPages,
    currentPage,
    setCurrentPage}: Props) {
    return (
        <div className='flex items-center justify-end mt-9'>
            <div className='pagination flex max-w-[400px] w-full items-center justify-between'>
                <div
                    className='text-black font-jost mr-6 text-lg cursor-pointer hover:font-bold leading-6 text-left flex items-center justify-center'
                    onClick={() => {
                        // Ensure that setCurrentPage can handle a function
                        setCurrentPage(Math.max(currentPage - 2, 1));
                    }}
                >
                    <ChevronLeft />
                </div>
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    let showPage = false;

                    // Logic for showing pages based on current page
                    if (currentPage === 1) {
                        showPage = page <= currentPage + 4; // Show next 4 pages
                    } else if (currentPage === 2) {
                        showPage = page >= currentPage - 1 && page <= currentPage + 3; // Show 1 previous and 3 next pages
                    } else if (currentPage === totalPages) {
                        showPage = page >= currentPage - 4; // Show previous 4 pages for last page
                    } else if (currentPage === totalPages - 1) {
                        showPage = page >= currentPage - 3 && page <= currentPage + 1; // Show 3 previous and 1 next page
                    } else {
                        showPage = page >= currentPage - 2 && page <= currentPage + 2; // General case: Show 2 previous and 2 next pages
                    }

                    if (showPage) {
                        return (
                            <div
                                key={i}
                                className={`text-black font-jost mr-6 text-lg cursor-pointer ${currentPage === page ? 'font-bold' : 'font-normal'
                                    } hover:font-bold leading-6 text-left flex items-center justify-center`}
                                onClick={() => {
                                    setCurrentPage(page);
                                }}
                            >
                                {page}
                            </div>
                        );
                    } else {
                        return null; // Don't render pages outside the desired range
                    }
                })}
                {/* <div
                    key={totalPages}
                    className='text-black font-jost mr-6 text-lg cursor-pointer font-normal hover:font-bold leading-6 text-left flex items-center justify-center'
                >
                    ...
                </div> */}
                <div
                    className='text-black font-jost mr-6 text-lg cursor-pointer hover:font-bold leading-6 text-left flex items-center justify-center'
                    onClick={() => {
                        // Move to next 2 pages, or set to totalPages if it goes above totalPages
                        setCurrentPage(Math.min(currentPage + 2, totalPages));
                    }}
                >
                    <ChevronRight />
                </div>
            </div>
        </div>
    )
}

export default Pagination