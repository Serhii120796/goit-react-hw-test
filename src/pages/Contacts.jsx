import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { fetchContacts } from '../redux/Contacts/operations';
import { selectIsLoading, selectError } from 'redux/Contacts/selectors';
import { selectVisibleContacts } from 'redux/Contacts/selectors';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';

export default function Contacts() {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Your contacts</title>
        </Helmet>
      </HelmetProvider>
      <ContactForm />
      <div>{isLoading && 'Request in progress...'}</div>
      <Filter />
      {contacts.length > 0 && <ContactsList />}
      {isLoading && <Loader />}
      {error && <Error message={error} />}
    </>
  );
}
