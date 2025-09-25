import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser, setAuthState } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    
    console.log("Login form submitted with data:", formData);

    // Use regular login for all users including admin
    console.log("Attempting user login...");
    dispatch(loginUser(formData)).then((data) => {
      console.log("Login response:", data);
      if (data?.payload?.success) {
        console.log("Login successful");
        // Manually set the auth state
        dispatch(setAuthState({
          isAuthenticated: true,
          user: data.payload.user
        }));
        
        toast({
          title: data?.payload?.message,
        });
        const role = data?.payload?.user?.role;
        console.log("User role:", role);
        if (role === "admin") {
          console.log("Navigating to admin dashboard");
          // Add a small delay to ensure state is updated
          setTimeout(() => {
            navigate("/admin/dashboard", { replace: true });
          }, 100);
        } else {
          console.log("Navigating to account page");
          setTimeout(() => {
            navigate("/account", { replace: true });
          }, 100);
        }
      } else {
        console.log("Login failed:", data?.payload?.message);
        toast({
          title: data?.payload?.message || "Login failed",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      console.error("Login error:", error);
      toast({
        title: "An error occurred during login",
        variant: "destructive",
      });
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don&apos;t have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/signup"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;