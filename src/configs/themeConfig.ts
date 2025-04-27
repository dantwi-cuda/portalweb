import { v4 as uuidv4 } from "uuid";

type SkinType = "default" | "bordered";
type ContentWidthType = "full" | "boxed";
type NavBarType = "static" | "sticky" | "hidden";
type FooterType = "static" | "sticky" | "hidden";
type LayoutType = "vertical" | "horizontal";

interface MenuConfig {
  isCollapsed: boolean;
  isHidden: boolean;
}

interface LayoutConfig {
  isRTL: boolean;
  darkMode: boolean;
  semiDarkMode: boolean;
  skin: SkinType;
  contentWidth: ContentWidthType;
  type: LayoutType;
  navBarType: NavBarType;
  footerType: FooterType;
  isMonochrome: boolean;
  menu: MenuConfig;
  mobileMenu: boolean;
  customizer: boolean;
}

interface ThemeConfig {
  app: {
    name: string;
  };
  layout: LayoutConfig;
}

const themeConfig: ThemeConfig = {
  app: {
    name: "Dashcode React",
  },
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    skin: "default",
    contentWidth: "full",
    type: "vertical",
    navBarType: "sticky",
    footerType: "static",
    isMonochrome: false,
    menu: {
      isCollapsed: false,
      isHidden: false,
    },
    mobileMenu: false,
    customizer: false,
  },
};

export default themeConfig;
