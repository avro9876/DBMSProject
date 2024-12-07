import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment.css';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [formData, setFormData] = useState({ student_id: '', amount: '', date: '', payment_id: null });

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        const response = await axios.get('http://localhost/your-path/payment.php');
        setPayments(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.payment_id) {
            await axios.put('http://localhost/your-path/payment.php', formData);
        } else {
            await axios.post('http://localhost/your-path/payment.php', formData);
        }
        setFormData({ student_id: '', amount: '', date: '', payment_id: null });
        fetchPayments();
    };

    const handleEdit = (payment) => {
        setFormData(payment);
    };

    const handleDelete = async (payment_id) => {
        await axios.delete('http://localhost/your-path/payment.php', { data: { payment_id } });
        fetchPayments();
    };

    return (
        <div className="body-container">
            <h1 className="title">Payments</h1>
            <form className="payment-form" onSubmit={handleSubmit}>
                <input type="hidden" name="payment_id" value={formData.payment_id || ''} />
                <label className="label">Student ID:</label>
                <input type="number" name="student_id" className="input-field" value={formData.student_id} onChange={handleChange} required />
                <label className="label">Amount:</label>
                <input type="number" name="amount" className="input-field" value={formData.amount} step="0.01" onChange={handleChange} required />
                <label className="label">Date:</label>
                <input type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} required />
                <button type="submit" className="submit-button">{formData.payment_id ? 'Update' : 'Add'} Payment</button>
            </form>
            
            <table className="payment-table">
                <thead>
                    <tr>
                        <th className="table-header">Payment ID</th>
                        <th className="table-header">Student ID</th>
                        <th className="table-header">Amount</th>
                        <th className="table-header">Date</th>
                        <th className="table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.payment_id}>
                            <td className="table-cell">{payment.payment_id}</td>
                            <td className="table-cell">{payment.student_id}</td>
                            <td className="table-cell">{payment.amount}</td>
                            <td className="table-cell">{payment.date}</td>
                            <td className="table-cell">
                                <button onClick={() => handleEdit(payment)} className="action-button edit-button">Edit</button>
                                <button onClick={() => handleDelete(payment.payment_id)} className="action-button delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Payments;
