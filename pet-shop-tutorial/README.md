# Truffleチュートリアル、ペットの採用アプリ

## やったこと
  - Truffleの公式チュートリアルを実施しました
    - https://trufflesuite.com/tutorial/
  - チュートリアルで作るDappに下記の機能をカスタムで追加しました
    - Metamaskで保持しているETHの支払いできる機能
    - 支払ったETHの総額を表示させる機能

## プロキシの管理について
  - `pet-shop-tutorial/.openzeppelin`ディレクトリにjson形式で管理する
    - 開発用のブロックチェーンネットワークのプロキシは各自で管理するため、gitの管理下から外す
    - しかし、メインネットなどのプロキシはgitの管理下におくこと
## アプリの内容
  - 作るシステム
    - ペットショップの里親追跡システム
  - 学べること
    - 開発環境の構築
    - Truffle Boxを使用したTruffleプロジェクトの作成
    - スマートコントラクトの作成
    - スマートコントラクトのコンパイルとマイグレーション
    - スマートコントラクトのテスト
    - スマートコントラクトと対話するためのユーザーインターフェースの作成
    - ブラウザでDappと対話する
  - 背景
    - Pete's Pet ShopのPete Scandlon氏は、ペットの里親募集を効率的に処理する方法として、イーサリアムの利用に関心を持っています
    - この店には、常時16匹のペットを収容できすスペースがあり、すでにペットのデータベースも持っています
    - 最初の概念実証として、PeteはEthereumアドレスと里親になるペットを関連付けるダンプを見たいと考えています
  - ディレクトリ構成
    - contracts/
      - スマートコントラクト用のSolidityファイルが含まれます
    - migrations/
      - スマートコントラクトのデプロイを処理するためのファイルが含まれます
    - test/
      - スマートコントラクトのテストファイルが含まれます
    - src/
      - フロントエンドのソースコードを配置
    - truffle-config.js
## カスタムで追加した要件
  - ペットの採用時に採用費として0.005ETH支払うこと
  - 支払った採用費の総額をETH単位で表示させること

<img width="1413" alt="スクリーンショット 2022-07-09 14 56 54" src="https://user-images.githubusercontent.com/38268537/178093694-a09bb403-939c-490f-b985-edf3b2cc1323.png">


## 環境
  - solidityのバージョン: 0.5.0
  - ローカルで使用するブロックチェーン: Eth用のGanache
  - 使用するウォレット: Metamask

## 環境構築
### npmコマンドが使えない場合
  - どんな方法でもいいのでまずは nodeenvコマンドをインストールしてください
    - 参考: https://qiita.com/masakuni-ito/items/1ea015eea03ef4b95c72
  - nodeenvコマンドをインストールは、下記のコマンドを実行してnpmコマンドを使用できるようにしてください
```sh
# nodenvでnode.jsをバージョンを指定してインストール
nodenv install -l
nodenv install 17.0.1
nodenv global 17.0.1

# node.jsがインストールできるとnpmコマンドが使えるようになります
npm -v
```

### npmコマンドが既に使える場合
```sh
pwd
<workspace>/pet-shop-tutorial

# truffleコマンドのインストール
npm install -g truffle

# openzeppelinなどのSolidityで使用するライブラリをインストールします
npm install
```

### Ganacheの準備
下記のサイトに従ってインストールしてください
  - https://trufflesuite.com/docs/ganache/quickstart/

## テストの実行
```sh
truffle test
truffle test <テストファイル>
```

## スマートコントラクトのマイグレーション
```sh
truffle migrate

# スマートコントラクトの完全入れ替えをしたい場合
truffle migrate --reset
```

## アプリの起動
```sh
npm run dev
```

## Solidity公式資料
  - https://docs.soliditylang.org/en/v0.8.15/
## Truffle公式資料
  - https://trufflesuite.com/docs/truffle/
  - 公式チュートリアル
    - https://trufflesuite.com/tutorial/
  - Ganacheとは
    - https://trufflesuite.com/docs/ganache/
  - Ganacheのダウンロードサイト
    - https://trufflesuite.com/ganache/
## npm公式資料
  - openzeppelin
    - https://www.npmjs.com/package/@openzeppelin/contracts/v/2.3.0
## OpenZeppelinの公式資料
  - https://docs.openzeppelin.com/contracts/4.x/
  - `Upgratable対応`Proxies
    - https://docs.openzeppelin.com/contracts/4.x/api/proxy
    - https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable
    - `Initializeインターフェースの実装の参考にできる`https://docs.openzeppelin.com/learn/upgrading-smart-contracts#initialization
  - `スマートコントラクトのジェネレータ`スマートコントラクトUpgratabilityなどの設定ができるようになる
    - https://wizard.openzeppelin.com/#erc20
  - OpenZeppelin Truffle Upgrades API
    - https://docs.openzeppelin.com/upgrades-plugins/1.x/api-truffle-upgrades
  - `参考になる`OpenZeppelin Upgrades: Step by Step Tutorial for Truffle
    - https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579
## web3.js公式資料
 - 公式リファレンス
   - https://web3js.readthedocs.io/en/v1.7.4/
## 参考資料
  - 【Solidity】Payable関数とWithdraw関数
    - https://qiita.com/ryu-yama/items/4c37d5ff0fbc5364e569
  - Web3.jsとTruffleを使用して単純なEthereum DAppを作成する
    - https://morioh.com/p/c8f4a0c5085a
  - web3.jsを用いてブラウザからスマートコントラクトにアクセスする
    - https://qiita.com/oiwaiman/items/86c76aedd069f657323a
  - Web3.js を使用して Ether を送る方法
    - https://blog.playground.io/entry/2018/03/06/094400
  - Error: VM Exceptionの解決
    - https://blog.mktia.com/solve-the-error-vm-exception/
## 用語
  - 
