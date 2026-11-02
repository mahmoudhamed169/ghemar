// the /api routes answer an expired session with a redirect to the login page
// (see api-fetch.ts), and fetch follows it silently — so leave the page ourselves
export async function clientFetch(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);
  if (res.redirected && new URL(res.url).pathname.endsWith("/login")) {
    window.location.href = res.url;
  }
  return res;
}
