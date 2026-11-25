import Heading from "@/components/core/typography/Heading";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  // right: a gold line to the right of the title, below: a gold line under it
  line?: "right" | "below";
  size?: "2xl" | "3xl" | "4xl";
  className?: string;
};

// a title of a section with the gold line, as on the original template
const SectionTitle = ({ text, as = "h2", line = "right", size = "4xl", className = "" }: Props) =>
  line === "right" ? (
    <div className={`flex items-center gap-6 ${className}`}>
      <Heading as={as} size={size} text={text} />
      <span aria-hidden="true" className="hidden h-px flex-1 bg-brand sm:block" />
    </div>
  ) : (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Heading as={as} size={size} text={text} />
      <span aria-hidden="true" className="h-px w-full bg-brand" />
    </div>
  );

export default SectionTitle;
