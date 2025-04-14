
import { Card } from "@/components/ui/card";
import HeroEditor from "@/components/admin/homepage/HeroEditor";

const AdminHomepage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Homepage Content</h1>
      <div className="grid gap-6">
        <HeroEditor />
        {/* Additional section editors will be added here */}
      </div>
    </div>
  );
};

export default AdminHomepage;
