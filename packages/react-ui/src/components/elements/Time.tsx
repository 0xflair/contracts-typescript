type Props = {
  value?: number | string;
};

export const Time = ({ value }: Props) => {
  return <>{value ? new Date(value).toLocaleString() : null}</>;
};
