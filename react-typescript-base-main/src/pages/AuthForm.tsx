import { useForm } from "react-hook-form";
import { Users } from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../ultis/validation";
import instace from "../service/instace";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: Users) => {
    try {
      if (isLogin) {
        const res = await instace.post(`/login`, data);
        localStorage.setItem(`user`, JSON.stringify(res.data.user));
        localStorage.setItem(`accessToken`, res.data.accessToken);
        nav(`/admin`);
      } else {
        await instace.post(`/users`, {
          email: data.email,
          password: data.password,
        });
        nav(`/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{isLogin ? "Login Form" : "Register Form"}</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="form-control"
            />
            {errors.email && (
              <div className="text-danger">{errors.email?.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              className="form-control"
            />
            {errors.password && (
              <div className="text-danger">{errors.password?.message}</div>
            )}
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPass", {
                  required: true,
                })}
                className="form-control"
              />
              {errors.confirmPass && (
                <div className="text-danger">{errors.confirmPass?.message}</div>
              )}
            </div>
          )}
          <button className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
