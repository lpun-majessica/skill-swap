import checkSession from "./utils/check-session";

export async function middleware(request) {
  const MONITORING_METHODS = ["POST", "PUT", "DELETE"];
  const isMonitored = MONITORING_METHODS.includes(request.method);

  if (isMonitored) {
    return await checkSession();
  }
}

export const config = {
  matcher: "/api/((?!auth).*)",
};
