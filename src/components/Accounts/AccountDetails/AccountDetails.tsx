interface accountDetailsProps {
  id: string;
}

const AccountDetails = ({ id }: accountDetailsProps): JSX.Element => (
  <h3>Account Name: {id}</h3>
);

export default AccountDetails;
