export interface bankProps {
  bankId: string;
  bankName: string;
  displayName: string;
  description: string;
  logo: string;
  accounts: accountProps[];
  totalBalance?: number;
}

export interface accountProps {
  accId: string;
  accHolderName: string;
  accBalance: number;
  displayAccBalance: string;
}
