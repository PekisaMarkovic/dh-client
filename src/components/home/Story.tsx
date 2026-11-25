import MainLink from "@/components/core/buttons/MainLink";
import { BottleIcon } from "@/components/core/icons";
import SiteImage from "@/components/core/SiteImage";
import Paragraph from "@/components/core/typography/Paragraph";
import SectionTitle from "@/components/core/typography/SectionTitle";
import { ISite } from "@/interfaces";
import { mapsUrl, text } from "@/lib/site";

const Story = ({ site }: { site: ISite }) => {
  const { story } = site;

  return (
    <section id="directions" className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
        {text(story.title) && <SectionTitle text={text(story.title)} />}
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-amber-300 via-amber-500 to-orange-700 shadow-lg">
            {story.image ? (
              <SiteImage image={story.image} fallbackAlt={site.name} sizes="(min-width: 768px) 50vw, 100vw" />
            ) : (
              <div role="img" aria-label={site.name} className="flex h-full items-center justify-center text-brand-dark/40">
                <BottleIcon className="h-28 w-28" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            {text(story.paragraph1) && <Paragraph size="lg" color="white" text={text(story.paragraph1)} />}
            {text(story.paragraph2) && <Paragraph text={text(story.paragraph2)} />}
            {text(story.buttonText) && (
              <div>
                <MainLink href={mapsUrl(site)} isExternal text={text(story.buttonText)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
