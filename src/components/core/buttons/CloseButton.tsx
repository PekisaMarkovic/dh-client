type Props = {
  // for screen readers, e.g. "Zatvori"
  label: string;
  onClick: () => void;
};

// the × in the corner of a panel or a modal
const CloseButton = ({ label, onClick }: Props) => (
  <button type="button" onClick={onClick} aria-label={label} title={label} className="text-2xl leading-none text-stone-400 transition hover:text-brand">
    ✕
  </button>
);

export default CloseButton;
