// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   publicRoutes,
//   authRoutes,
// } from "./routes";
// import {NextAuthOptions} from "next-auth";
// import authConfig from "./auth.config";
// import Providers from "next-auth/providers";

// const authConfig: NextAuthOptions = {
//   providers:[
//     Providers.Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         // your custom authentication logic here
//         // return an object with the user's information if the authentication is successful
//         // return null if the authentication fails
//         if (credentials?.username === "admin" && credentials?.password === "password") {
//           return { id: 1, name: "Admin User", email: "admin@example.com" };
//         }
//         return null;
//       },
//     }),

//   ],
//   secret: "kfchrfbchbknojdnkj"
// }

// /**
//  * Middleware function for authentication.
//  * @param req - The request object.
//  * @returns If the route is an API authentication route, it returns nothing.
//  *          If the route is an authentication route and the user is logged in, it redirects to the default login redirect URL.
//  *          If the user is not logged in and the route is not a public route, it redirects to the login page with the callback URL.
//  */
// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return;
//   }
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);
//     return Response.redirect(
//       new URL(`auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   return;
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "./routes";
import NextAuthOptions  from "next-auth";
import authConfig from "./auth.config";
import Providers from "next-auth/providers";

const { auth } = NextAuthOptions(authConfig);

/**
 * Middleware function for authentication.
 * @param req - The request object.
 * @returns If the route is an API authentication route, it returns nothing.
 *          If the route is an authentication route and the user is logged in, it redirects to the default login redirect URL.
 *          If the user is not logged in and the route is not a public route, it redirects to the login page with the callback URL.
 */
export default auth((req: { auth?: any; nextUrl?: any; }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};