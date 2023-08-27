import React from 'react';

interface StringCellProps {
  data: string;
}

export const StringCell: React.FC<StringCellProps> = ({ data }) => {
  // Custom rendering logic for string data
  return <div>{data}</div>;
};

interface NumberCellProps {
  data: number;
}

export const NumberCell: React.FC<NumberCellProps> = ({ data }) => {
  // Custom rendering logic for number data
  return <div>{data}</div>;
};

