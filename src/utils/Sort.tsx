import ITransaction from '../models/ITransaction';

/// the string format is safe enough to be sorted w/o converting to Date type
export const sortByCreatedAt = (trxList: ITransaction[], isAscending: boolean) => {
  const list = [...trxList];
  return list.sort((a, b) => {
    let res = 0;
    if (a.created_at < b.created_at) res = -1;
    else if (a.created_at > b.created_at) res = 1;

    return res * (!isAscending ? -1 : 1);
  });
}

export const sortByBeneficiaryName = (trxList: ITransaction[],
  isAscending: boolean) => {
  const list = [...trxList];
  return list.sort((a, b) => {
    let res = 0;
    if (a.beneficiary_name < b.beneficiary_name) res = -1;
    else if (a.beneficiary_name > b.beneficiary_name) res = 1;

    return res * (!isAscending ? -1 : 1);
  });
}