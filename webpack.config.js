/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isAnalyze = Boolean(env?.analyze)
  /** @type {import('webpack').Configuration} **/
  const config = {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        // Cấu hình alias cho webpack
        // để khi import cho ngắn gọn
        // Ví dụ: import Login from 'pages/app'
        // Thay vì: import Login from '../pages/app' chẳng hạn
        'model': path.resolve(__dirname, './src/model/index.ts'),
        'utils': path.resolve(__dirname, './src/utils/index.ts'),
        'redux': path.resolve(__dirname, './src/redux/index.ts'),
      }
    },
    // File đầu vào cho webpack, file này thường là file import mọi file khác
    entry: ['./src/index.tsx'],
    // Khai báo các module dùng trong webpack
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(s[ac]ss|css)$/, // duyệt các file sass || scss || css
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // dùng import 'filename.css' trong file tsx, ts
              options: { sourceMap: !isProduction } // Hiển thị sourcemap ở môi trường dev cho dễ debug
            },
            {
              loader: 'sass-loader', // biên dịch sass sang css
              options: { sourceMap: !isProduction }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/, // Dùng để import file ảnh, nếu có video/ảnh định dạng khác thì thêm vào đây
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/, // Dùng để import font
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]'
              }
            }
          ]
        }
      ]
    },

    output: {
      filename: 'static/js/main.[contenthash:6].js', // Thêm mã hash tên file dựa vào content để tránh bị cache bởi CDN hay browser.
      path: path.resolve(__dirname, 'dist'), // Build ra thư mục dist
      publicPath: '/'
    },
    devServer: {
      hot: true, // enable Hot Module Replacement, kiểu như reload nhanh
      port: 3000, // Chạy port 3000 khi dev
      historyApiFallback: true,
      // Cấu hình phục vụ file html trong public
      static: {
        directory: path.resolve(__dirname, 'src', 'index.html'),
        serveIndex: true,
        watch: true
      }
    },
    devtool: isProduction ? false : 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
      }),
      // Dùng biến môi trường env trong dự án
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src',
            to: '.',
            filter: (name) => {
              return !name.endsWith('index.html')
            }
          }
        ]
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html'
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js', '.jsx']
      })
    ]
  }

  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: 'brotliCompress'
      }),
      new CleanWebpackPlugin()
    ]
    if (isAnalyze) {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]
    }
    config.optimization = {
      minimizer: [
        `...`,
        new CssMinimizerPlugin()
      ]
    }
  }
  return config
}
