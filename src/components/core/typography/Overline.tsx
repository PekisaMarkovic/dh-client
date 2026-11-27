// a small grey label in capitals above a group (e.g. "MENI", "KONTAKT")
const Overline = ({ text, className = "" }: { text: string; className?: string }) => (
  <p className={`text-xs font-semibold uppercase tracking-widest text-stone-500 ${className}`}>{text}</p>
);

export default Overline;
