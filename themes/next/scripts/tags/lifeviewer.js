'use strict';

function lifeViewer(args, content) {
  return `<div class="rle"><pre>${content}</pre><canvas width="480" height="480"></canvas></div>`;
}

hexo.extend.tag.register('lifeviewer', lifeViewer, {ends: true});
