import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    totalQuestions: number;
    activeQuestion: number;
    question: string;
    suggestions: string;
    subtext?: any;
}

function AssesmentLayout({ children,
    question,
    suggestions,
    subtext
}: Props) {
    return (
        <div className='innerCarouselItem w-full flex flex-col items-center justify-center mt-9'>

            {question ?
                <h5 className='font-medium text-[26px] leading-[31.2px] text-center w-full max-w-[940px] mb-9'>{question}</h5>
                : null}
            {subtext ?
                <p>{subtext}</p>
                : null}
            {children}
            {suggestions ?
                <h5 className='font-jost text-[15px] md:text-[20px]  font-normal leading-[24px] text-center text-[#ADB1BA] my-10'>{suggestions}</h5>
                : null}
        </div>
    )
}

export default AssesmentLayout