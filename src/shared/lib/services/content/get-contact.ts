export interface ContactInfo {
  appName: string;
  appLogo: string;
  supportEmail: string;
  supportPhone: string;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/content/contact`,
      { next: { revalidate: 3600, tags: ["contact-info"] } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}
