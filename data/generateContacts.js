import { normalize, digitsOnly } from '../utils/text';
import contactsData from './contact_sample_data.json';

export function makeContacts() {
  return contactsData.map(contact => ({
    ...contact,
    _search: normalize(`${contact.name} ${contact.email} ${digitsOnly(contact.phone)} ${contact.address || ''}`),
    _firstLetter: contact.name.split(' ')[contact.name.split(' ').length - 1].charAt(0).toUpperCase(),
  }));
}
