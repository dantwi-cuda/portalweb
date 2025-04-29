import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "./ui/Textinput";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import useDarkMode from "../hooks/useDarkMode";

// image imports
import LogoWhite from "../assets/images/icon/ck-white.svg";
import Logo from "../assets/images/icon/ck-white.svg";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isDark] = useDarkMode();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
      toast.success("Login Successful");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="left-column relative z-[1]">
          <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
            <Link to="/">
              <img src={isDark ? LogoWhite : Logo} alt="" className="mb-10" />
            </Link>
            <h4 className="text-[40px] leading-[48px] text-slate-600 dark:text-slate-400 mb-6">
              Unlock your Project
              <span className="text-slate-800 dark:text-slate-400 font-bold">
                performance
              </span>
            </h4>
          </div>
        </div>
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link to="/">
                  <img
                    src={isDark ? LogoWhite : Logo}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-medium">Sign in</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Sign in to your account to start using Portal
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textinput
                  name="email"
                  label="Email"
                  type="email"
                  register={register}
                  error={errors.email}
                  className="h-[48px]"
                />
                <Textinput
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  error={errors.password}
                  className="h-[48px]"
                />
                <div className="flex justify-between">
                  <Checkbox
                    value={checked}
                    onChange={() => setChecked(!checked)}
                    label="Keep me signed in"
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  text="Sign in"
                  className="btn btn-dark block w-full text-center"
                  isLoading={isLoading}
                />
              </form>

              <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                  Or continue with
                </div>
              </div>

              <div className="max-w-[242px] mx-auto mt-8 w-full">
                <Link
                  to="/register"
                  className="btn btn-white dark:bg-slate-700 dark:text-slate-300 block text-center w-full"
                >
                  Create an account
                </Link>
              </div>
            </div>
            <div className="auth-footer text-center">
              Copyright 2025, All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
