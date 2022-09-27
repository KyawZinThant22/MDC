interface buttonProps {
  type: "button" | "submit" | "reset" | undefined;
  arialLabel: string;
  variant?: string;
  label: string;
  action?: () => void;
  disable: boolean;
  isLoading?: boolean;
}

const Button: React.FC<buttonProps> = ({
  type,
  arialLabel,
  variant,
  label,
  action,
  disable,
  isLoading,
}) => {
  return (
    <button
      aria-label={arialLabel}
      type={type}
      disabled={disable}
      className={`w-full text-md h-10 px-3 hover:delay-75 font-semibold rounded-md  ${
        variant === "primary" && "bg-primary text-white hover:bg-blue-800"
      }
      ${variant === "secondary" && "bg-secondary text-gray-900"}`}
      onClick={action}
    >
      {isLoading ? "Creating" : label}
    </button>
  );
};

export default Button;
