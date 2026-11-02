import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LOGIN_URL = "/ar/login";
// the middleware clears the session cookie on this url, then shows the login page
const SESSION_EXPIRED_URL = "/ar/login?expired=1";

async function clearSessionCookies() {
  const store = await cookies();
  store
    .getAll()
    .filter(({ name }) => name.includes("next-auth.session-token"))
    .forEach(({ name }) =>
      // browsers ignore a __Secure- cookie that isn't set with the secure flag
      store.set(name, "", {
        maxAge: 0,
        path: "/",
        secure: name.startsWith("__Secure-"),
      }),
    );
}

// a 401 from the backend means the session token is no longer valid.
// redirect() works by throwing, so a catch around this call must start with
// unstable_rethrow(error) or the redirect is swallowed
export async function apiFetch(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);
  if (res.status !== 401) return res;

  // server actions and route handlers clear the cookie here: an action's redirect
  // is fetched on the server, so the middleware's Set-Cookie never reaches the
  // browser. a page render isn't allowed to change cookies, so it throws and
  // leaves the job to the middleware
  try {
    await clearSessionCookies();
  } catch {
    redirect(SESSION_EXPIRED_URL);
  }
  redirect(LOGIN_URL);
}
