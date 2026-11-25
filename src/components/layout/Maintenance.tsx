import Heading from "@/components/core/typography/Heading";
import { t } from "@/translations/translate";

// shown instead of the whole site while it is a draft (the admin has not published it yet): only "Sajt je u izradi", the same for every site
const Maintenance = () => (
  <main className="flex min-h-screen items-center justify-center bg-brand-dark px-4 text-center">
    <Heading as="h1" size="5xl" color="brand" align="center" text={t("g:maintenance.title")} />
  </main>
);

export default Maintenance;
