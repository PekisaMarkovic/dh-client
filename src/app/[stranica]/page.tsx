import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageSections from "@/components/sections/PageSections";
import { findPage, HOME_SLUG } from "@/lib/site";
import { pageMetadata, pageSeo } from "@/lib/seo";
import { getSiteOrFallback } from "@/services/site-service";

type Props = {
  params: Promise<{ stranica: string }>;
};

// /o-nama, /akcije...: a page the admin made in the dashboard. The home page is "/", the menu has its own route
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { stranica } = await params;
  const site = await getSiteOrFallback();

  if (stranica === HOME_SLUG || !findPage(site, stranica)) return {};

  return pageMetadata(site, { ...pageSeo(site, stranica), path: `/${stranica}`, slug: stranica });
};

const Page = async ({ params }: Props) => {
  const { stranica } = await params;
  const site = await getSiteOrFallback();
  const page = findPage(site, stranica);

  // a draft page is not in the list, so it is a 404 like an address that does not exist
  if (stranica === HOME_SLUG || !page) notFound();

  return <PageSections page={page} site={site} />;
};

export default Page;
