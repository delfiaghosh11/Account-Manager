interface accountDetailsProps {
  id: string;
}

const AccountDetails = ({ id }: accountDetailsProps) => (
  <h3>Account Name: {id}</h3>
);

export default AccountDetails;
