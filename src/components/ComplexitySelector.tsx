import { Slider } from './Slider';
import { ComplexityIndicator } from './ComplexityIndicator';
import { getComplexityLabel } from '../utils/complexityUtils';

interface ComplexitySelectorProps {
    value: number;
    onChange: (value: number) => void;
}

export function ComplexitySelector({ value, onChange }: ComplexitySelectorProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Question Complexity
                </label>
                <ComplexityIndicator complexity={value} />
            </div>
            <Slider
                min={1}
                max={5}
                step={1}
                value={value}
                onChange={onChange}
                getLabel={getComplexityLabel}
            />
            <p className="text-sm text-gray-500 mt-2">
                {value === 1 && "Basic questions suitable for beginners"}
                {value === 2 && "Easy questions with straightforward concepts"}
                {value === 3 && "Moderate difficulty with some challenging aspects"}
                {value === 4 && "Challenging questions requiring deep understanding"}
                {value === 5 && "Advanced questions testing mastery of the subject"}
            </p>
        </div>
    );
}