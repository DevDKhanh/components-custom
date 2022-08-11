export interface PropsDayItem {
    isActive?: boolean;
    isCurrent?: boolean;
    isDisabled?: boolean;
    date: number;
    time: number;
    onChoose: (time: number) => void;
}
