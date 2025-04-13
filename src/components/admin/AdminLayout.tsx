
import { Outlet, Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, SidebarContent, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-purple text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold">
            Sister Stories Admin
          </Link>
          <Link to="/" className="text-sm hover:underline">
            Back to Site
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <SidebarProvider>
          <div className="flex gap-6">
            <Sidebar>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === "admin" || currentPath === ""}>
                      <Link to="/admin">Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === "podcasts"}>
                      <Link to="/admin/podcasts">Podcasts</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === "documentaries"}>
                      <Link to="/admin/documentaries">Documentaries</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === "blog"}>
                      <Link to="/admin/blog">Blog Posts</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>

            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default AdminLayout;
