import React from 'react'
import passwordCheckRules from "../utils/passwordCheckRules"
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";


type PasswordCheckRules = {
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  noName: boolean;
};

const PasswordCheckList: React.FC<{password : string,name : string}> = ({ password, name }) => {
  const rules:PasswordCheckRules = passwordCheckRules(password, name);
  const ruleList = [
    { label: "At least one uppercase letter", valid: rules.hasUpper },
    { label: "At least one lowercase letter", valid: rules.hasLower },
    { label: "At least one number", valid: rules.hasNumber },
    { label: "At least one special character", valid: rules.hasSymbol },
    { label: "Does not contain your name", valid: rules.noName },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: "#fce4ec", padding: "8px 12px", borderRadius: 10, fontSize: 12, boxShadow: "0 0 6px rgba(0,0,0,0.1)" }}
    >
      {ruleList.map((rule, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          {rule.valid ? (
            <CheckCircleIcon style={{ color: "#2E7D32", fontSize: 14 }} />
          ) : (
            <CancelIcon style={{ color: "#D32F2F", fontSize: 14 }} />
          )}
          <span style={{ color: rule.valid ? "#2E7D32" : "#D32F2F", fontWeight: rule.valid ? 600 : 400 }}>{rule.label}</span>
        </div>
      ))}
    </motion.div>
  );
};
export default PasswordCheckList;