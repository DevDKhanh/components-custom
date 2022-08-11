import clsx from 'clsx';
import { PropsDayItem } from '../interfaces';
import styles from './DayItem.module.scss';

function DayItem({
    isActive,
    isDisabled,
    isCurrent,
    date,
    time,
    onChoose,
}: PropsDayItem) {
    const handleClick = () => {
        !isDisabled && onChoose(time);
    };
    return (
        <div
            className={clsx(styles.container, {
                [styles.active]: isActive,
                [styles.disabled]: isDisabled,
                [styles.current]: isCurrent,
            })}
            onClick={handleClick}
        >
            {date}
        </div>
    );
}

export default DayItem;
