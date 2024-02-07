import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
  to?: string;
  active?: boolean;
  disableHover?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  to,
  active,
  disableHover,
  onClick,
}: Props) => {
  const buttonStyle = clsx(
    'rounded border border-zinc-600 px-4 py-[2px] text-xs',
    className,
    {
      'bg-neutral-700 text-white': active,
      'bg-white': !active,
      'hover:bg-neutral-700 hover:text-white': !active && !disableHover,
    },
  );

  if (to) {
    return (
      <Link to={to} className={clsx(buttonStyle, 'block')} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
