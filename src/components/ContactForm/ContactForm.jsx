import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  FormWraper,
  Label,
  InputTitle,
  FieldWraper,
  StyleField,
  StyleErrorMessage,
} from './ContactForm.styled';
import { Button } from '../ContactItem/ContactItem.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/Contacts/operations';
import { selectContacts } from 'redux/Contacts/selectors';

const schema = yup.object().shape({
  name: yup.string().min(2).required('Enter a name'),
  number: yup
    .string()
    .matches(/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g, 'Enter a phone number with at least 9 digits')
    .required('Enter a phone number'),
});

export const ContactForm = () => {
  const contactList = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (newContact, { resetForm }) => {
    const checkContact = contactList.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <>
    <h1>Phonebook</h1>
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormWraper>
          <Label>
            <InputTitle>Name</InputTitle>
            <FieldWraper>
              <StyleField type="text" name="name" placeholder="Enter a name" />
              <StyleErrorMessage name="name" component="div" />
            </FieldWraper>
          </Label>
          <Label>
            <InputTitle>Number</InputTitle>
            <FieldWraper>
              <StyleField
                type="tel"
                name="number"
                placeholder="Enter a phone number"
              />
              <StyleErrorMessage name="number" component="div" />
            </FieldWraper>
          </Label>
          <Button type="submit">Add contact</Button>
        </FormWraper>
      </Form>
      </Formik>
      </>
  );
};
