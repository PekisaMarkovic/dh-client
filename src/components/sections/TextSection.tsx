import { ITextSection } from "@/interfaces";
import { text } from "@/lib/site";

// free text from the dashboard (headings, bold, lists, links). The api sanitizes the HTML before it saves it, so it is shown as it is
const TextSection = ({ section }: { section: ITextSection }) => {
  const html = text(section.html);

  if (!html) return null;

  return (
    <section className="bg-background">
      <div className="rich-text mx-auto max-w-3xl px-4 py-16" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
};

export default TextSection;
