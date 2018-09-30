'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける　XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '<script>alert(\'test\');</script>',
    postedBy: 'guest1',
    trackingCookie: '2818776986341977_877af16dc89a33b5f1d4b6a697fa12d711baa46e',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.indexOf('&lt;script&gt;alert(\'test\');&lt;/script&gt;') > 0);
console.log('テストが正常に完了しました');