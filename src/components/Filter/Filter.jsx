import { useDispatch } from 'react-redux';
import { FilterTitle, StyleInput } from './Filter.styled';
import { findContact } from 'redux/Contacts/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>Contacts</h2>
      <label>
        <FilterTitle>Find contacts by name</FilterTitle>
        <StyleInput
          type="text"
          name="filter"
          placeholder="Search"
          onChange={evt => dispatch(findContact(evt.target.value))}
        />
      </label>
    </>
  );
};
