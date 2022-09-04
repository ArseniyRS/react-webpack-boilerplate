import path from "path";
import { Configuration as WebpackConfiguration, DefinePlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import dotenv, { DotenvConfigOutput } from "dotenv";
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const getHashFilename = (ext: "js" | "css") => `[name].[hash].${ext}`;

function getConfig(mode: "production" | "development" | ""): DotenvConfigOutput {
  let config: DotenvConfigOutput = dotenv.config({ path: `./.env${mode ? `.${mode}` : ""}` });
  if (!mode && config.error) {
    return { parsed: {} };
  }
  if (config.error) {
    return getConfig("");
  }
  return config;
}
function getPlugins(mode: "production" | "development") {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        memoryLimit: 4096,
      },
    }),
    new StylelintPlugin(),
    new MiniCssExtractPlugin({ filename: getHashFilename("css") }),
    new DefinePlugin({
      "process.env": JSON.stringify(getConfig(mode).parsed),
    }),
  ];
  if (mode === "production") {
    return [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/shared"),
            to: path.resolve(__dirname, "build/shared"),
          },
        ],
      }),
      ...plugins,
    ];
  }
  return plugins;
}
const webpackConfig = (env: any, argv: any): Configuration => ({
  entry: "./src/index.tsx",
  ...(argv.mode === "production" ? {} : { devtool: "eval-source-map" }),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: getHashFilename("js"),
    chunkFilename: getHashFilename("js"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|jpg|jpeg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  plugins: getPlugins(argv.mode),
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          collapseWhitespace: true,
        },
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
});

export default webpackConfig;
