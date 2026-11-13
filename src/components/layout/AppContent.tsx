import React from 'react';
import { Layout } from "antd";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#072a66",
  padding: "1rem",
};

export default function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}
