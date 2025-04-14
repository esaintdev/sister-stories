import { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, SidebarContent, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const currentPath = location.pathname.split('/').pop() || "";

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-purple text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold">
            Sister Stories Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:block">
              Logged in as {user?.email}
            </span>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20" 
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
            <Link to="/" className="text-sm hover:underline">
              Back to Site
            </Link>
          </div>
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
                    <SidebarMenuButton asChild isActive={currentPath === "homepage"}>
                      <Link to="/admin/homepage">Homepage</Link>
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
