import { getComplexityColor } from '../utils/complexityUtils';

interface ComplexityIndicatorProps {
    complexity: number;
}

export function ComplexityIndicator({ complexity }: ComplexityIndicatorProps) {
    const color = getComplexityColor(complexity);

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
        >
      Level {complexity}
    </span>
    );
}