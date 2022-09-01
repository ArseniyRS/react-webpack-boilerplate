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

const webpackConfig = (env: any, argv: any): Configuration => ({
  entry: "./src/index.tsx",
  ...(argv.mode === "production" ? {} : { devtool: "eval-source-map" }),

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: getHashFilename("js"),
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
  plugins: [
    new CleanWebpackPlugin(),
    // argv.mode == "production" &&
    //   new CopyWebpackPlugin({
    //     patterns: [
    //       {
    //         from: path.resolve(__dirname, "public/shared"),
    //         to: path.resolve(__dirname, "build/shared"),
    //       },
    //     ],
    //   }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new StylelintPlugin(),
    new MiniCssExtractPlugin({ filename: getHashFilename("css") }),
    new DefinePlugin({
      "process.env": JSON.stringify(getConfig(argv.mode).parsed),
    }),
  ],
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
