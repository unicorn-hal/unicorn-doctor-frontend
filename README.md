# Unicorn Doctor Frontend

Unicorn Doctor Frontendは、医師向けのウェブアプリケーションのフロントエンド部分を実装したプロジェクトです。

## 目次

- [Unicorn Doctor Frontend](#unicorn-doctor-frontend)
  - [目次](#目次)
  - [使用技術](#使用技術)
  - [始め方](#始め方)
    - [前提条件](#前提条件)
    - [インストール](#インストール)
  - [スクリプト](#スクリプト)
  - [ライブラリ一覧](#ライブラリ一覧)
    - [依存関係](#依存関係)
    - [開発用依存関係](#開発用依存関係)
  - [プロジェクト構造](#プロジェクト構造)
  - [使用方法](#使用方法)
    - [開発サーバーの起動](#開発サーバーの起動)
    - [ビルド](#ビルド)
    - [プレビュー](#プレビュー)
    - [コードのリントとフォーマット](#コードのリントとフォーマット)

## 使用技術

- **フレームワーク**: [React](https://reactjs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **状態管理とフォーム**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **ルーティング**: [@tanstack/react-router](https://tanstack.com/router)
- **スタイリング**: [Panda CSS](https://panda-css.com/)
- **リアルタイム通信**: [SockJS](https://github.com/sockjs/sockjs-client), [STOMP.js](https://stomp-js.github.io/stomp-websocket/)
- **認証とデータベース**: [Firebase](https://firebase.google.com/)

## 始め方

### 前提条件

- **Node.js**: バージョン16以上
- **npm**: バージョン8以上

### インストール

リポジトリをクローンし、必要なパッケージをインストールします。

```bash
git clone https://github.com/yourusername/unicorn-doctor-frontend.git
cd unicorn-doctor-frontend
pnpm install
```

## スクリプト

以下のnpmスクリプトが利用できます。

- `npm run dev`: 開発サーバーを起動します。
- `npm run build`: プロダクションビルドを行います。
- `npm run preview`: ビルド後のプレビューサーバーを起動します。
- `npm run prepare`: Panda CSSのコード生成を行います。
- `npm run lint`: Biomeを使用してコードのリントを行います。
- `npm run format`: Biomeを使用してコードのフォーマットを行います。
- `npm run check`: Biomeを使用してコードのチェックを行います。

## ライブラリ一覧

### 依存関係

- **@ark-ui/react**: UIコンポーネントライブラリ
- **@hookform/resolvers**: React Hook Formのバリデーションresolver
- **@stomp/stompjs**: STOMPプロトコルを使用したWebSocketクライアント
- **@tanstack/react-query**: データフェッチングと状態管理
- **@tanstack/react-query-devtools**: React Queryのデバッグツール
- **@tanstack/react-router**: 型付けを備えたReactルーター
- **firebase**: Firebaseのクライアントライブラリ
- **lucide-react**: React向けのアイコンライブラリ
- **react-hook-form**: フォーム管理ライブラリ
- **sockjs-client**: SockJSプロトコルを使用したWebSocketクライアント
- **vite-tsconfig-paths**: ViteでのTSConfigパス解決
- **zod**: バリデーションライブラリ

### 開発用依存関係

- **@biomejs/biome**: コードフォーマッターとリンター
- **@pandacss/dev**: Panda CSSの開発ツール
- **@park-ui/panda-preset**: Panda CSSのプリセット
- **@tanstack/eslint-plugin-query**: React Query用のESLintプラグイン
- **@tanstack/router-devtools**: React Routerのデバッグツール
- **@tanstack/router-plugin**: React Routerのプラグイン
- **@types/sockjs-client**: SockJSクライアントの型定義
- **@vitejs/plugin-react**: Vite用のReactプラグイン
- **vite**: ビルドツール
- **vitest**: テストフレームワーク

## プロジェクト構造

```md
unicorn-doctor-frontent/
├─ src
│  ├─ components
│  ├─ hooks
│  ├─ infrastructure
│  ├─ domain
│  ├─ util
│  └─ feature
├─ public
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

- **src/**: ソースコードディレクトリ
  - **components/**: 再利用可能なReactコンポーネント
  - **hooks/**: 再利用可能なカスタムHooks
  - **infrastructure/**: Firebaseなどの外部サービスとの連携コード
  - **domain/**: ドメインロジックや型定義
  - **util/**: ユーティリティ関数
  - **feature/**: ページ固有のコンポーネントやカスタムHooks
- **public/**: 公開用の静的ファイル
- **package.json**: プロジェクトの依存関係とスクリプト
- **tsconfig.json**: TypeScriptのコンパイル設定
- **vite.config.ts**: Viteの設定ファイル

## 使用方法

### 開発サーバーの起動

```bash
pnpm run dev
```

ブラウザで`http://localhost:5137`にアクセスします。

### ビルド

プロダクション用のビルドを行います。

```bash
pnpm run build
```

### プレビュー

ビルドされたアプリケーションをローカルでプレビューします。

```bash
pnpm run preview
```

### コードのリントとフォーマット

Biomeを使用してコードのリントとフォーマットを行います。

```bash
pnpm run lint
pnpm run format
```
