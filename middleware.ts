import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// ! We need to specify which route we want to restrict

// const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
// const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isDefaultRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
    // Restrict admin route to users with specific role
    // if (isAdminRoute(req)) auth().protect({ role: 'org:admin' });

    // Restrict dashboard routes to signed in users
    // if (isDashboardRoute(req)) auth().protect();

    // Restrict / Route
    if (isDefaultRoute(req)) auth().protect();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};