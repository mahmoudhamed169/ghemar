import { getBanners } from "@/shared/lib/services/settings/get-banners";
import BannersClient from "./banners-client";

export default async function SpecialOffersBanners() {
  const { data: banners } = await getBanners();
  return <BannersClient initialBanners={banners} />;
}
