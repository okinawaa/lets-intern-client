import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const TableHeadBox = ({ children, className }: Props) => {
  return (
    <div className={clsx('flex w-full rounded-md bg-neutral-200', className)}>
      {children}
    </div>
  );
};

export default TableHeadBox;