declare module "*.scss";
declare module "*.svg" {
  import React from "react";
  const url: string;
  const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;
  export default url;
  export { ReactComponent };
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
