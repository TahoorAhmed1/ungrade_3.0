import { Check } from 'lucide-react'
import React from 'react'

type SelectBoxProps = {
    answer: string
}

const SelectBox = ({ answer }: SelectBoxProps) => {
    return (
        <div className='SelectBox flex bg-[#E5F5F5] rounded-radius  p-4 justify-start border-[2px] border-blueDark'>
            <div className={`checkbox w-8 h-8 rounded-[10px] bg-white flex justify-center border-[2px] border-blueDark items-center mr-4`}>
                <Check />
            </div>
            <p className='font-normal text-xl leading-[29.05px] text-left'>{answer}</p>
        </div>
    )
}

type OptionProps = {
    name: string
}

type Props = {
    answerOptions: OptionProps[];

}
function ChooseAnswer({ answerOptions }: Props) {
    return (
        <div className='selectBoxDiv h-[336px] flex flex-col flex-wrap gap-4 mt-8 mb-4'>
            {answerOptions && answerOptions?.map((a, i) => {
                return (
                    <SelectBox answer={a?.name} />
                )
            })}
        </div>
    )
}

export default ChooseAnswer