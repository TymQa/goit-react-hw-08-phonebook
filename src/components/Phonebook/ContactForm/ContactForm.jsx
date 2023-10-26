import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { getContacts } from 'redux/contacts/contactsSlice';
import { addContact } from '../../../redux/contacts/contactsOperations';
import { useSelector, useDispatch } from 'react-redux';
import css from '../ContactForm/ContactForm.module.css'
import { Loader } from '../Loader/Loader';

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'contactName':
                setName(value)
                break;
            case 'contactNumber':
                setNumber(value)
                break;
            default:
                setName('')
                setNumber('')
        }
    }

    const dispatch = useDispatch();
    const {items, addingLoader} = useSelector(getContacts);

    const contactAlreadyExists = (name, number) => {
        return items.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (contactAlreadyExists(name, number)) {
            return toast.error(`${name} is already in Phonebook`)
        }

        dispatch(addContact({name, number}));

        setName('')
        setNumber('')
    }

    const nameId = nanoid();
    const numberId = nanoid();
    
    return (
        <form onSubmit={handleSubmit} className={css.formWrapper}>
        <label className={css.label} htmlFor={nameId}>Name</label>
        <input
            id={nameId}
            type="text"
            name="contactName"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zAZа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Name'
            className={css.input} />
        <label className={css.label} htmlFor={numberId}>Number</label>
        <input
            id={numberId}
            type="tel"
            name="contactNumber"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
                placeholder='Number'
            className={css.input} />
        {addingLoader ?
            <Loader/> :
            <button type='submit' className={css.button}>Add contact</button>
        }
    </form>)
}