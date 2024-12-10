import { FC, ReactNode } from "react";
import { css } from "styled-system/css";

type HeaderButtonProps = {
    text: string;
    icon: ReactNode;
    isActive: boolean;
    onClick: () => void;
}

export const HeaderButton: FC<HeaderButtonProps> = (
    { text, icon, isActive, onClick }
) => {
    return (
        <button
            type="button"
            className={css({
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                px: 1,
                pt: 1,
                color: isActive ? "primary" : "gray.600",
                borderBottom: isActive
                    ? "2px solid"
                    : "none",
                borderColor: isActive ? "primary" : "none",
                _hover: {
                    color: "primary",
                },
            })}
            onClick={onClick}
        >
            {icon}
            <span>{text}</span>
        </button>
    );
}