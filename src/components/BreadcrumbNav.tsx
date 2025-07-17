import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { sidebarNavData, SidebarNavItem } from "@/data/sidebarNavData";
import { Home } from "lucide-react";

// Helper function to find a nav item by path
const findNavItemByPath = (
  path: string,
  items: SidebarNavItem[],
): SidebarNavItem | undefined => {
  for (const item of items) {
    if (item.path === path) {
      return item;
    }
    if (item.children) {
      const found = findNavItemByPath(path, item.children);
      if (found) return found;
    }
  }
  return undefined;
};

// Helper function to build breadcrumbs
const buildBreadcrumbs = (
  pathname: string,
  hash: string,
  navData: SidebarNavItem[],
): { title: string; path?: string; isCurrent: boolean }[] => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { title: string; path?: string; isCurrent: boolean }[] = [];

  // Add Home breadcrumb
  breadcrumbs.push({ title: "Головна", path: "/", isCurrent: pathname === "/" && !hash });

  let currentPath = "";
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;
    const isLastSegment = i === pathSegments.length - 1;

    let item: SidebarNavItem | undefined;
    if (isLastSegment && hash) {
      // Try to find item by path and sectionId
      item = navData.find(
        (navItem) => navItem.path === currentPath && navItem.sectionId === hash.substring(1),
      );
      if (!item) {
        // If not found by sectionId, try by path only
        item = findNavItemByPath(currentPath, navData);
      }
    } else {
      item = findNavItemByPath(currentPath, navData);
    }

    if (item) {
      breadcrumbs.push({
        title: item.title,
        path: isLastSegment && !hash ? undefined : `${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`,
        isCurrent: isLastSegment && !hash,
      });
    } else {
      // Fallback for dynamic segments or unlisted pages
      breadcrumbs.push({
        title: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path: isLastSegment && !hash ? undefined : currentPath,
        isCurrent: isLastSegment && !hash,
      });
    }
  }

  // Handle hash as a separate breadcrumb if it represents a section
  if (hash && pathname !== "/") {
    const sectionId = hash.substring(1);
    const currentItem = findNavItemByPath(pathname, navData);
    if (currentItem && currentItem.sectionId === sectionId) {
      // If the hash is the primary sectionId for the page, it's already handled
    } else {
      // Try to find a specific section within the current page's nav data
      let sectionTitle = sectionId.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const foundSectionInNav = navData.find(
        (navItem) => navItem.path === pathname && navItem.sectionId === sectionId,
      );
      if (foundSectionInNav) {
        sectionTitle = foundSectionInNav.title;
      }

      breadcrumbs.push({
        title: sectionTitle,
        path: undefined, // Current page, no further link
        isCurrent: true,
      });
    }
  }

  return breadcrumbs;
};

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = buildBreadcrumbs(location.pathname, location.hash, sidebarNavData);

  // Don't render if only "Home" or if on the root path without a hash
  if (breadcrumbs.length <= 1 && location.pathname === "/" && !location.hash) {
    return null;
  }

  return (
    <Breadcrumb className="mb-6 text-sm text-muted-foreground no-print">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {crumb.isCurrent ? (
                <BreadcrumbPage className="text-foreground font-semibold">
                  {crumb.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path || "#"} className="hover:text-foreground">
                    {index === 0 && <Home className="h-4 w-4 mr-1 inline-block" />}
                    {crumb.title}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;