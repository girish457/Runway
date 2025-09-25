import { useSelector } from "react-redux";
import UserOrders from "@/components/shopping-view/orders";

function AccountPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <section className="bg-white rounded border p-4">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-medium">{user?.userName || "-"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{user?.email || "-"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Role</div>
            <div className="font-medium">{user?.role || "user"}</div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded border p-4">
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <UserOrders />
      </section>
    </div>
  );
}

export default AccountPage;











