import { useContext, useEffect } from 'react';
import clsx from 'clsx';

import { PropsOption } from '../../interfaces';
import { ContextSelect } from '../../Select';
import styles from './Option.module.scss';

function Option({ value, title }: PropsOption) {
    const stateContext = useContext<{
        onChange: (value: any) => void;
        data: any;
        defaultValue?: any;
    }>(ContextSelect);

    useEffect(() => {
        if (stateContext.defaultValue === value) {
            stateContext.onChange({ value, title });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = () => {
        stateContext.onChange({ value, title });
    };

    return (
        <div
            className={clsx(styles.container, {
                [styles.active]: stateContext?.data?.value === value,
            })}
            onClick={handleChange}
        >
            {title}
        </div>
    );
}

export default Option;
