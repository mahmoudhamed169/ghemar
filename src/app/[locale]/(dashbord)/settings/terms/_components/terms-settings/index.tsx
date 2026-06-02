import { getTermsSettings } from "@/shared/lib/services/settings/get-terms-settings";
import TermsClient from "./terms-client";

export default async function TermsSettings() {
  const { data } = await getTermsSettings();
  return <TermsClient initialData={data} />;
}
