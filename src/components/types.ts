export interface bankProps {
  bankId: string;
  bankName: string;
  displayName: string;
  description: string;
  logo: string;
  accounts: accountProps[];
}

export interface accountProps {
  accId: string;
  accHolderName: string;
  accBalance: string;
}
