import PropTypes from 'prop-types';

export const userPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  general: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    street: PropTypes.string,
    zipCode: PropTypes.string,
  }),
  contact: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  job: PropTypes.shape({
    company: PropTypes.string,
    title: PropTypes.string,
  }),
});
