import { cronstrueToString } from '@/helpers/cronstrueVI';
const getCronExpressionReadable = (cronExp:string) => {
    return cronstrueToString(cronExp, { locale: "vi", verbose: true, use24HourTimeFormat: true, });
};

export { getCronExpressionReadable };