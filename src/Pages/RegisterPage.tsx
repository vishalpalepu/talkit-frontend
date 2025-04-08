import React, { useEffect, useState } from "react";
import { TextField, Button ,IconButton,InputAdornment} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import PasswordCheckList from "../components/PasswordCheckList";
import passwordCheckRules from "../utils/passwordCheckRules";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../store/storeAppdata";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordCheckRules = {
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  noName: boolean;
};


const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Too short"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is short")
    .test("no-name", "Password should not contain the name", function (value) {
      return !value?.toLowerCase().includes(this.parent.name.toLowerCase());
    })
    .test("has-uppercase", "Must have uppercase", (val) => /[A-Z]/.test(val || ""))
    .test("has-lowercase", "Must have lowercase", (val) => /[a-z]/.test(val || ""))
    .test("has-number", "Must have number", (val) => /[0-9]/.test(val || ""))
    .test("has-symbol", "Must have symbol", (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val || "")),
});

type RegisterFormData = {
  name : string,
  email : string,
  password : string
}

const RegisterPage= () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const {signUp} =  useAuthCheck()
  const navigate = useNavigate();
  const password = watch("password");
  const name = watch("name");
  const [showChecklist, setShowChecklist] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const rules:PasswordCheckRules = passwordCheckRules(password, name);
  const allValid = Object.values(rules).every(Boolean);

  useEffect(() => {
    setShowChecklist(password !== "" && !allValid);
  }, [password, name]);

  const onSubmit = (data:RegisterFormData) => {
    signUp(data);
    console.log("a new User has registered ");
    alert("a new User has registered ");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(to bottom right, #b39ddb, #f8bbd0)" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", width: "90%", maxWidth: 1100, display: "flex", overflow: "hidden", height: "65vh" }}>
        <div style={{ background: "#6A1B9A", color: "white", padding: 24, width: "50%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div
            animate={{ y: showChecklist ? -40 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Join Our Platform</h2>
            <p style={{ fontSize: 13, marginTop: 6 }}>Create your account to explore the benefits.</p>
            <Button variant="outlined" style={{ marginTop: 14, color: 'white', borderColor: 'white' }} onClick={()=>{navigate("/login")}}>
              SIGN IN
            </Button>
          </motion.div>

          <AnimatePresence>
            {showChecklist && (
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                <PasswordCheckList password={password} name={name} />
              </div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding: 24, width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "80%", maxWidth: 340 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>Register</h2>
            <p style={{ textAlign: "center", fontSize: 13, marginBottom: 14 }}>Fill out your details below</p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <TextField
                label="Name"
                fullWidth
                size="small"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                fullWidth
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                size="small"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                    InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#AB47BC", color: "#fff", minWidth: 140 }}
                >
                  SIGN UP
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
