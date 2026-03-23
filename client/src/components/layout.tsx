import { ThemedLayout, ThemedSider, ThemedTitle } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Button, Divider, Menu } from "antd";
import React from "react";
import Logo from "../icon.svg?react";
import { getBasePath } from "../utils/url";
import { Header } from "./header";
import { Version } from "./version";

const SiderFooter = ({ collapsed }: { collapsed: boolean }) => {
  const t = useTranslate();

  if (collapsed) {
    return (
      <div style={{ textAlign: "center", padding: "8px 0 12px" }}>
        <Button
          icon={<img src={getBasePath() + "/kofi_s_logo_nolabel.png"} style={{ height: "1.4em" }} />}
          type="text"
          size="small"
          href="https://ko-fi.com/donkie"
          target="_blank"
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "4px 24px 16px" }}>
      <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 4 }}>
        {t("version")} <Version />
      </div>
      <Button
        icon={<img src={getBasePath() + "/kofi_s_logo_nolabel.png"} style={{ height: "1.4em" }} />}
        type="text"
        size="small"
        href="https://ko-fi.com/donkie"
        target="_blank"
        style={{ fontSize: 11, opacity: 0.5, padding: "0 4px" }}
      >
        {t("kofi")}
      </Button>
    </div>
  );
};

// Make the sider menu a flex column so the spacer li can push items down
const siderMenuStyle = `
  .ant-layout-sider .ant-menu {
    display: flex !important;
    flex-direction: column !important;
  }
`;

export const SpoolmanLayout = ({ children }: { children: React.ReactNode }) => (
  <>
  <style>{siderMenuStyle}</style>
  <ThemedLayout
    Header={() => <Header sticky />}
    Sider={() => (
      <ThemedSider
        fixed
        Title={({ collapsed }) => <ThemedTitle collapsed={collapsed} text="Spoolman" icon={<Logo />} />}
        render={({ items, logout, collapsed }) => {
          const bottomKeys = ["/settings", "/help"];
          const mainItems: React.ReactNode[] = [];
          const bottomItems: React.ReactNode[] = [];

          React.Children.forEach(items as React.ReactNode, (child) => {
            if (!React.isValidElement(child)) return;
            const key = String(child.key ?? "");
            if (bottomKeys.some((k) => key.includes(k))) {
              bottomItems.push(child);
            } else {
              mainItems.push(child);
            }
          });

          return (
            <>
              {mainItems}
              <li style={{ flex: 1 }} />
              <Menu.Divider style={{ margin: "0 16px 4px" }} />
              {bottomItems}
              {logout}
              <SiderFooter collapsed={collapsed} />
            </>
          );
        }}
      />
    )}
  >
    {children}
  </ThemedLayout>
  </>
);
