import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import React from 'react';
import styles from './ContactForm.module.css';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeInput = ({ target }) => {
    const {name, value} = target;

    if (name === 'number' && !/^[0-9]*$/.test(value)) {
        // Перевірка, чи введене значення містить лише цифри
        return;
      }

    this.setState({ [name]: value });
    
  };
  
  handleOnClick = () => {
    const {name, number} = this.state
    if (name.trim() === '' || number.trim() === '') {
        return
      }

      const isNameExists = this.props.contacts.some(
        (contact) => contact.name === name
      );
  
      if (isNameExists) {
        alert(`Контакт з іменем "${name}" вже існує в книзі.`);
        return;
      }    

    this.props.onAddNewUser({id: crypto.randomUUID(), name, number})
    this.setState({ name: '', number: '' });
  }

  render() {
    const {name, number} = this.state
    return (
      
      <div className={styles.inputСontainer}>
        <h2>Name</h2>
        <input
        //   type="text"
        onChange={this.handleChangeInput}
          name="name"
          value={name}
          required
        />
        <h2>Number</h2>
        <input 
        className={styles.inputForm}
        // type="tel" 
        name="number" 
        onChange={this.handleChangeInput}
        value={number} 
        pattern="[0-9]*"
        required />
        
        <hr></hr>
        <button onClick={this.handleOnClick} className={styles.addButton}>Add contact</button>
        </div>
    );
  }

}

ContactForm.propTypes = {
  onAddNewUser: PropTypes.func.isRequired,
  
};