import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import isEmail from '~/common/func/isEmail';
import { FormContext } from '../../contexts';
import styles from './Input.module.scss';
import { ContextData, PropsInput } from './interfaces';

function Input({
    label,
    note,
    type = 'text',
    placeholder = '',
    name,
    ...props
}: PropsInput) {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const data = useContext<ContextData>(FormContext);

    const isPassword = type === 'password';

    /********** Xử lí khi submit, kiểm tra validate input **********/
    useEffect(() => {
        if (data.countValidate > 0) {
            handleSetMessage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.countValidate]);

    /********** Xử lí khi value input thay đổi, kiểm tra validate input **********/
    useEffect(() => {
        data.setValidate((prev: any) => ({
            ...prev,
            [name]: handleValidate(),
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.form]);

    const handleClickbtn = () => {
        if (props.isActiveButton && props.onClick) {
            props.onClick();
        }
    };

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handlerFocused = () => {
        setIsFocus(true);
        data.setErrorText((prev: any) => ({
            ...prev,
            [name]: null,
        }));
    };

    const handleChange = (e: any) => {
        const { value, name } = e.target;

        data.setForm((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlerBlur = () => {
        setIsFocus(false);

        handleSetMessage();
        /********** return validate passed **********/
        return data.setValidate((prev: any) => ({
            ...prev,
            [name]: handleValidate(),
        }));
    };

    /********** Hiển thị message thông báo validate **********/
    const handleSetMessage = () => {
        data.setErrorText((prev: any) => ({
            ...prev,
            [name]: null,
        }));

        if (props.isRequired && `${data.form[name]}`.trim() === '') {
            return data.setErrorText((prev: any) => ({
                ...prev,
                [name]: props.textRequired || 'Vui lòng nhập trường này',
            }));
        }

        if (props.isNumber) {
            for (let i of data.form[name]) {
                if (isNaN(Number(i))) {
                    return data.setErrorText((prev: any) => ({
                        ...prev,
                        [name]: 'Vui lòng chỉ nhập số',
                    }));
                }
            }
        }

        if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
            return data.setErrorText((prev: any) => ({
                ...prev,
                [name]: props.textConfirm || 'Mật khẩu không trùng khớp',
            }));
        }

        if (props.isEmail && !isEmail(data.form[name])) {
            return data.setErrorText((prev: any) => ({
                ...prev,
                [name]: 'Định dạng email không chính xác',
            }));
        }

        if (props.max && `${data.form[name]}`.trim().length > props.max) {
            return data.setErrorText((prev: any) => ({
                ...prev,
                [name]: `Nhập tối đa ${props.max} kí tự`,
            }));
        }

        if (props.min && `${data.form[name]}`.trim().length < props.min) {
            return data.setErrorText((prev: any) => ({
                ...prev,
                [name]: `Nhập tối thiểu ${props.min} kí tự`,
            }));
        }
    };

    /********** Check validate **********/
    const handleValidate = () => {
        if (props.isRequired && `${data.form[name]}`.trim() === '') {
            return false;
        }

        if (props.isNumber) {
            for (let i of data.form[name]) {
                if (isNaN(Number(i))) {
                    return false;
                }
            }
        }

        if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
            return false;
        }

        if (props.isEmail && !isEmail(data.form[name])) {
            return false;
        }

        if (props.max && `${data.form[name]}`.trim().length > props.max) {
            return false;
        }

        if (props.min && `${data.form[name]}`.trim().length < props.min) {
            return false;
        }

        return true;
    };

    return (
        <div
            className={clsx(styles.container, {
                [styles.error]: data?.errorText[name] !== null,
                [styles.focus]: isFocus,
            })}
        >
            <label className={styles.label}>{label}</label>
            <div className={clsx({ [styles.group]: props.txtBtn })}>
                <div className={styles.inputGroup}>
                    <input
                        onFocus={handlerFocused}
                        onChange={handleChange}
                        onBlur={handlerBlur}
                        className={styles.inputElement}
                        type={showPass ? 'text' : type}
                        name={name}
                        value={data.form[name]}
                        placeholder={placeholder}
                    />
                    {isPassword && (
                        <span
                            className={styles.toggleType}
                            onClick={handleToggleShowPass}
                        >
                            {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
                        </span>
                    )}
                </div>
                {props.txtBtn && (
                    <div
                        className={clsx(styles.btn, {
                            [styles.active]: props.isActiveButton,
                        })}
                        onClick={handleClickbtn}
                    >
                        {props.txtBtn}
                    </div>
                )}
            </div>
            <p className={styles.errorText}>{data?.errorText[name]}</p>
            {note && <small className={styles.note}>{note}</small>}
        </div>
    );
}

export default Input;
