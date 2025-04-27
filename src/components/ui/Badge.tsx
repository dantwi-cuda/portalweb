import React, { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

interface BadgeProps {
  className?: string;
  label?: string;
  icon?: string;
  children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  className = "bg-danger-500 text-white",
  label,
  icon,
  children,
}) => {
  return (
    <span className={`badge ${className}`}>
      {!children && (
        <span className="inline-flex items-center">
          {icon && (
            <span className="inline-block ltr:mr-1 rtl:ml-1">
              <Icon icon={icon} />
            </span>
          )}
          {label}
        </span>
      )}
      {children && <span className="inline-flex items-center">{children}</span>}
    </span>
  );
};

export default Badge;
