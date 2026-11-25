import MainLink from "@/components/core/buttons/MainLink";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import { t } from "@/translations/translate";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <Heading as="h1" size="4xl" align="center" text={t("g:notFound.title")} />
      <Paragraph align="center" text={t("g:notFound.text")} />
      <MainLink href="/" text={t("g:notFound.back")} />
    </div>
  );
}
