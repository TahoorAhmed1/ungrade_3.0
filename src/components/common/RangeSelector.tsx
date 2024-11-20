import React, { useState } from "react";
import "./rangeSelector.css";
type Props = {
  setanswer: (val: number) => void;
};

function RangeSelector({ setanswer }: Props) {
  const [value, setValue] = useState(0);
  const [progress, setprogress] = useState(0);
  const onchange = (ev: any) => {
    setValue(Number(ev.target.value));
    setanswer(Number(ev.target.value) + 1);
    const progressval = ((Number(ev.target.value) * 25) / 100) * 100;
    setprogress(progressval);
  };
  return (
    <div id="rangeSelector" className="relative w-full max-w-lg mx-auto rangeSelectorDiv h-20">
      {/* <div className="rangePickerDiv">
        <input
          type="range"
          onChange={(ev)=>setanswer(Number(ev.target.value))}
          value={2}
          min="0"
          max="4"
          className="w-full h-1 bg-cyan-400 appearance-none focus:outline-none"
          id="rangePicker"
        />
      </div>
      <div className="absolute top-0 flex justify-between items-center w-full">
        <div className="partition">
          <div className="part"></div>
          <p>1</p>
        </div>
        <div className="partition">
          <div className="part"></div>
          <p>2</p>
        </div>
        <div className="partition">
          <div className="part"></div>
          <p>3</p>
        </div>
        <div className="partition">
          <div className="part"></div>
          <p>4</p>
        </div>
        <div className="partition">
          <div className="part"></div>
          <p>5</p>
        </div>
      </div> */}
      <div className="range-slider">
        <input
          type="range"
          min="0"
          max="4"
          value={value}
          onChange={onchange}
          id="range"
          step="1"
          style={{
            background: `linear-gradient(to right, #07525C ${progress}%, #ccc ${progress}%)`,
          }}
        />
        <div className="absolute top-0 flex justify-between items-center w-full">
          <div className="partition">
            <div className="part"></div>
            <p>1</p>
          </div>
          <div className="partition">
            <div className="part"></div>
            <p>2</p>
          </div>
          <div className="partition">
            <div className="part"></div>
            <p>3</p>
          </div>
          <div className="partition">
            <div className="part"></div>
            <p>4</p>
          </div>
          <div className="partition">
            <div className="part"></div>
            <p>5</p>
          </div>
        </div>
      </div>
      {/* <input
        type="range"
        min="0"
        max="4"
        value="3"
        className="w-full h-1 bg-cyan-400 appearance-none focus:outline-none"
        id="rangePicker"
    />
    <div className={`absolute top-[13px] left-0  h-1 bg-cyan-900`} style={{width:`${(100 / 5) * 4}%`}}></div>
    <div
        className="absolute h-4 w-4 rounded-full bg-cyan-900"
        
    ></div>

    <div className="flex justify-between mt-4 text-cyan-400 absolute w-full top-0">
        <div className={`w-[${100/4}%] flex justify-center items-end flex-col`}>
            <div className='w-1 h-5 bg-cyan-400'></div>
        <span className={`text-right`}>1</span>
        </div>
        <div className={`w-[${100/4}%] flex justify-center items-end flex-col`}>
            <div className='w-1 h-5 bg-cyan-400'></div>
        <span className={`text-right`}>2</span>
        </div>
        <div className={`w-[${100/4}%] flex justify-center items-end flex-col`}>
            <div className='w-1 h-5 bg-cyan-400'></div>
        <span className={`text-right`}>3</span>
        </div>
        <div className={`w-[${100/4}%] flex justify-center items-end flex-col`}>
            <div className='w-1 h-5 bg-cyan-400'></div>
        <span className={`text-right`}>4</span>
        </div>
        <div className={`w-[${100/4}%] flex justify-center items-end flex-col`}>
            <div className='w-1 h-5 bg-cyan-400'></div>
        <span className={`text-right`}>5</span>
        </div>
    </div> */}
    </div>
  );
}

export default RangeSelector;
