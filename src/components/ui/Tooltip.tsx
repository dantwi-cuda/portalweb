import React, { ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/perspective-extreme.css";
import "tippy.js/animations/perspective-subtle.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away-extreme.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward-extreme.css";
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-toward.css";

interface TooltipProps {
  children?: ReactNode;
  content?: ReactNode | string;
  title?: string;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  theme?: string;
  animation?: string;
  trigger?: string;
  interactive?: boolean;
  allowHTML?: boolean;
  maxWidth?: number | string;
  duration?: number | [number, number];
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content = "content",
  title,
  className = "btn btn-dark",
  placement = "top",
  arrow = true,
  theme = "dark",
  animation = "shift-away",
  trigger = "mouseenter focus",
  interactive = false,
  allowHTML = false,
  maxWidth = 300,
  duration = 200,
}) => {
  return (
    <div className="custom-tippy">
      <Tippy
        content={content}
        placement={placement}
        arrow={arrow}
        theme={theme}
        animation={animation}
        trigger={trigger}
        interactive={interactive}
        allowHTML={allowHTML}
        maxWidth={maxWidth}
        duration={duration}
      >
        {children ? <React.Fragment>{children}</React.Fragment> : <React.Fragment><button className={className}>{title}</button></React.Fragment>}
      </Tippy>
    </div>
  );
};

export default Tooltip;
