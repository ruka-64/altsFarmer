# Alts Farmer - Farming your discord alt accounts.

## これは何

作成直後、もしくは一部の長期間放棄されていた Discord アカウントは不正利用防止のために規制が強化されています。フレンド申請をたった 3 人の友人に送るだけでもあなたのアカウントはロックされてしまいます。

このツールは、定期的にメッセージを送信することで規制の緩和を試みます。

**⚠️ Discord のセルフボットは利用規約で禁止されています。アカウントのロックについて、私は一切責任を負いません。**

## 特徴

- すぐ使える: ダウンロードして、依存関係を`pnpm i`でインストール。あとは設定ファイルを 2 行分編集するだけ。
- 軽量: 無駄なキャッシュを保存せずに、長期間運用しても安定した動作ができる設計になっています。
- 細かい調整: 正規クライアントを装うための細かい調整、設定が含まれています。

## セットアップ

あらかじめ、使用するアカウントを何かしらのサーバーに入れておいてください。

1. このリポジトリをダウンロード or クローン
2. `config.js.example`を`config.js`としてコピー
3. 設定ファイルの`token`と`channelId`を設定する

### token を入手する

Discord 内で Developer Tools を開いてください。(`Ctrl+Shift+I`)
Console タブで以下のコードを実行:

```js
window.webpackChunkdiscord_app.push([
  [Symbol()],
  {},
  (req) => {
    if (!req.c) return;
    for (let m of Object.values(req.c)) {
      try {
        if (!m.exports || m.exports === window) continue;
        if (m.exports?.getToken) return copy(m.exports.getToken());
        for (let ex in m.exports) {
          if (
            m.exports?.[ex]?.getToken &&
            m.exports[ex][Symbol.toStringTag] !== 'IntlMessagesProxy'
          )
            return copy(m.exports[ex].getToken());
        }
      } catch {}
    }
  },
]);

window.webpackChunkdiscord_app.pop();
console.log('%cCopied your Discord token!', 'font-size: 50px');
```

自動でコピーされます。`config.js`に貼り付けましょう。

### channelId を入手する

`設定(⚙️) > 詳細設定`から開発者モードを有効化してください。

使用するアカウントが参加しているサーバー内にある、適当なチャンネルを右クリックし、`チャンネルIDをコピー`を押してください。

`config.js`に貼り付けましょう。
