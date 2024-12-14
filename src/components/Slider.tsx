interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    getLabel: (value: number) => string;
}

export function Slider({
   min,
   max,
   step,
   value,
   onChange,
   getLabel,
}: SliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="relative pt-1">
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
                    }}
                />
                <div className="flex justify-between text-xs text-gray-600 px-1 mt-2">
                    {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
                        <span
                            key={num}
                            className={`${
                                num === value ? 'font-bold text-blue-600' : ''
                            }`}
                        >
              {getLabel(num)}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
}