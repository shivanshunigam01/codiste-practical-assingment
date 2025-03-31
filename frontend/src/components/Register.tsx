import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import "./Register.css"; 
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


 const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
    
      const response = await registerUser(data.name, data.email, data.password);
      alert(response.message || "Registration successful!");
      navigate("/login"); 
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" {...register("name")} placeholder="Enter your name" disabled={isLoading} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" {...register("email")} placeholder="Enter your email" disabled={isLoading} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Create a password" disabled={isLoading} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="icon-button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? (
              <>
                <Loader2 className="loader" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="footer-text">
          By creating an account, you agree to our
          <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
        <p className="footer-text">
          Already have an account? 
          <Link to="/login">
          Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;