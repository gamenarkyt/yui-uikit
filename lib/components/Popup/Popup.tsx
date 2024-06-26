import React, { FC, useState } from "react";
import styles from "./Popup.module.css";
import clsx from "clsx";
import { BaseComponent } from "lib/types/types";
import { Button } from "../Button/Button";

interface PopupListItem {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

interface PopupProps extends BaseComponent {
  listItems?: PopupListItem[];
  position?: "left" | "right";
  width?: string;
  height?: string;
}

export const Popup: FC<PopupProps> = ({
  listItems = [],
  position = "right",
  className,
  width = "max-content",
  height = "max-content",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const _class = clsx(styles.defaultPopupElements, className, {
    [styles.positionLeft]: position === "left",
    [styles.positionRight]: position === "right",
  });

  const _togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const _onPopupElementClick = (item: PopupListItem) => {
    if (item.onClick) {
      item.onClick();
      _togglePopup();
    }
  };

  return (
    <div className={styles.popupContainer}>
      <Button
        onClick={_togglePopup}
        variant="transparent"
        className={styles.popupButton}
      >
        {children}
      </Button>
      {isOpen && (
        <div
          className={_class}
          style={
            position == "left"
              ? {
                  width: width,
                  height: height,
                  // right: 0,
                }
              : { width: width, height: height }
          }
        >
          {listItems.map((ell) => {
            return (
              <Button
                className={styles.popupElement}
                variant="transparent"
                key={ell.id}
                onClick={() => _onPopupElementClick(ell)}
              >
                {ell.icon} {ell.title}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
