import type { NextPage } from 'next';
import { useState } from 'react';
import { DatePicker, DatePickerRanger } from '../components/Calendar';
import Select, { Option } from '../components/Select';

const Home: NextPage = () => {
    const [form, setForm] = useState<any>({
        select: null,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ padding: 50, background: '#fff', minHeight: '100vh' }}>
            <DatePicker />
        </div>
    );
};

export default Home;
