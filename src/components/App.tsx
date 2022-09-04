import React from "react";
import "styles/global.scss";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1>
        🚀
        <br />
        Webpack
      </h1>
      <ul>
        <li>⚛️ React</li>
        <li>📖 Typescript</li>
        <li>🔨 Eslint</li>
        <li>💅 Prettier</li>
        <li>🔨 Stylelint</li>
        <li>🔥 Dockerize</li>
        <li>🚀 Component and slice script generation</li>
      </ul>
      <p>Don&apos;t forget to install eslint extentions to your IDE</p>
      <a
        href="https://github.com/ArseniyRs/react-webpack-boilerplate"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </div>
  );
};
export default App;
