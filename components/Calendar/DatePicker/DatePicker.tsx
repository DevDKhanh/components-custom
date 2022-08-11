import { useEffect, useState } from 'react';
import DayItem from '../DayItem';
import { listDay, listMonth } from '../mock';
import styles from './DatePicker.module.scss';

function DatePicker() {
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [numberDay, setNumberDay] = useState<any>(0);
    const [listDate, setListDate] = useState<any>([]);

    const [timeSelect, setTimeSelect] = useState<any>(null);

    /********** Chuyển tháng **********/
    const handlePrevMonth = () => {
        setMonth(month - 1);
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        }
    };

    const handleNextMonth = () => {
        setMonth(month + 1);
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        }
    };
    /********************/

    /********** Chuyển năm **********/
    const handlePrevYear = () => {
        setYear(year - 1);
    };

    const handleNextYear = () => {
        setYear(year + 1);
    };
    /********************/

    /********** Chuyển về ngày hôm nay **********/
    const handleBackToday = () => {
        const dateCurrent = new Date();
        const date = new Date(
            `${dateCurrent.getFullYear()}/${
                dateCurrent.getMonth() + 1
            }/${dateCurrent.getDate()}`
        );

        setYear(() => date.getFullYear());
        setMonth(() => date.getMonth() + 1);
        setTimeSelect(() => date.getTime());
    };
    /********************/

    /********** Lấy số ngày trong tháng **********/
    useEffect(() => {
        if (listMonth.includes(month)) {
            setNumberDay(31);
        } else if (month === 2) {
            if (
                (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
                (year % 100 === 0 && year % 400 === 0)
            ) {
                setNumberDay(29);
            } else {
                setNumberDay(28);
            }
        } else {
            setNumberDay(30);
        }
    }, [month, year]);
    /********************/

    /********** Hiển thị các ngày ra màn hình **********/
    useEffect(() => {
        const dateCurrent: string = new Date().toDateString();
        for (let i = 1; i <= numberDay; i++) {
            //=====< Các ngày trong tháng >=====
            /*---------- dạng: yyyy-mm-dd ----------*/
            const date = new Date(`${year}/${month}/${i}`);

            const item = {
                time: Number(date),
                date: i,
                day: date.getDay(),
                status:
                    date.toDateString() === dateCurrent ? 'current' : 'empty',
            };

            //=====< Thêm các ngày trống trước ngày 1  >=====
            if (i === 1) {
                for (let j = 1; j <= date.getDay(); j++) {
                    const timer = Number(date) - 86400000 * j;
                    const dateFirst = new Date(timer);
                    const itemFisrt = {
                        time: Number(dateFirst),
                        date: dateFirst.getDate(),
                        day: dateFirst.getDay(),
                        status: 'outDate',
                    };
                    setListDate((prev: any) => [itemFisrt, ...prev]);
                }
            }

            /*---------- Danh sách các ngày trong tháng ----------*/
            setListDate((prev: any) => [...prev, item]);
        }

        //=====< Thêm các ngày trống sau ngày cuối tháng  >=====
        setListDate((prev: any) => {
            const lastDay = prev[prev.length - 1];
            if (lastDay) {
                for (let j = 1; j + lastDay.day <= 6; j++) {
                    const timer = Number(lastDay.time) + 86400000 * j;
                    const dateFirst = new Date(timer);
                    const itemFisrt = {
                        time: Number(dateFirst),
                        date: dateFirst.getDate(),
                        day: dateFirst.getDay(),
                        status: 'outDate',
                    };
                    setListDate((prev: any) => [...prev, itemFisrt]);
                }
            }
            return prev;
        });

        return () => setListDate([]);
    }, [numberDay, month, year]);
    /********************/

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <div
                        className={styles.arrowLeftDou}
                        onClick={handlePrevYear}
                    ></div>
                    <div
                        className={styles.arrowLeft}
                        onClick={handlePrevMonth}
                    ></div>
                </div>
                <div>
                    Tháng {month < 10 ? `0${month}` : month}-{year}
                </div>
                <div>
                    <div
                        className={styles.arrowRight}
                        onClick={handleNextMonth}
                    ></div>
                    <div
                        className={styles.arrowRightDou}
                        onClick={handleNextYear}
                    ></div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.days}>
                    {listDay.map((text) => (
                        <div key={text} className={styles.itemDay}>
                            {text}
                        </div>
                    ))}
                </div>
                <div className={styles.dates}>
                    {listDate.map((item: any) => (
                        <DayItem
                            key={item.time}
                            date={item.date}
                            time={item.time}
                            isActive={timeSelect === item.time}
                            isCurrent={item.status === 'current'}
                            isDisabled={item.status === 'outDate'}
                            onChoose={setTimeSelect}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.today} onClick={handleBackToday}>
                Hôm nay
            </div>
        </div>
    );
}

export default DatePicker;
