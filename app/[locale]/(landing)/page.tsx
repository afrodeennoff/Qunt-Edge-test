
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from "@/locales/server";
import LandingClient from "./landing-client";

export function generateStaticParams() {
  return getStaticParams();
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return <LandingClient />;
}
