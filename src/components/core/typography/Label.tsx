type Props = {
  htmlFor?: string;
  label: string;
  isRequired?: boolean;
};

const Label = ({ htmlFor, label, isRequired }: Props) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-stone-200">
    {label}
    {isRequired && <span className="text-red-400"> *</span>}
  </label>
);

export default Label;
