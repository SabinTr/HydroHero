import React from "react";

export default function Avatar({ progress }) {
  // pick image based on progress
  let img = "/avatar-dry.png"; // put images in public/
  if (progress >= 0.8) img = "/avatar-happy.png";
  else if (progress >= 0.4) img = "/avatar-normal.png";

  // small visual indicator with CSS filter that changes slightly with progress
  const style = {
    filter: `brightness(${0.8 + progress * 0.4}) saturate(${0.7 + progress * 0.6})`,
    transition: "filter 500ms ease",
  };

  return (
    <div className="avatar">
      <img src={img} alt="avatar" style={style} width="220" />
    </div>
  );
}
