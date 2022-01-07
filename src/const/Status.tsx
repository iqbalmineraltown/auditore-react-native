export type StatusProps = {
  key: TransactionStatus;
  value: string;
  label: string;
}

export enum TransactionStatus {
  Success,
  Pending,
};

export const transactionStatusDisplay: StatusProps[] = [
  { key: TransactionStatus.Success, value: "SUCCESS", label: "Berhasil" },
  { key: TransactionStatus.Pending, value: "PENDING", label: "Pengecekan" },
];

