// src/lib/routeMetadata.ts

type RouteMetadata = {
  title: string;
  description: string;
};

export const routeMetadata: Record<string, RouteMetadata> = {
  '/': {
    title: 'Home | WeeklyCAT',
    description: 'Welcome to the WeeklyCAT platform.',
  },
  '/about': {
    title: 'About | WeeklyCAT',
    description: 'Learn more about WeeklyCAT.',
  },
  '/dashboard': {
    title: 'Dashboard | WeeklyCAT',
    description: 'Your personalized dashboard.',
  },
  '/dashboard/[id]': {
    title: 'User Dashboard | WeeklyCAT',
    description: 'Dashboard view for specific user.',
  },
  '/blog/[slug]': {
    title: 'Blog | WeeklyCAT',
    description: 'Read the latest articles and updates.',
  },
};

export function getRouteMetadata(pathname: string): RouteMetadata {
  // Try exact match
  if (routeMetadata[pathname]) {
    return routeMetadata[pathname];
  }

  // Try matching dynamic patterns
  const dynamicMatch = Object.entries(routeMetadata).find(([route]) => {
    if (!route.includes('[')) return false;

    const pattern = new RegExp(
      '^' +
        route
          .replace(/\[(.+?)\]/g, '[^/]+') // replace [param] with wildcard
          .replace(/\//g, '\\/') +
        '$'
    );
    return pattern.test(pathname);
  });

  if (dynamicMatch) return dynamicMatch[1];

  // Fallback
  return {
    title: 'WeeklyCAT',
    description: 'Explore WeeklyCAT platform.',
  };
}
