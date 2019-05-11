---
title: 测试在 Hexo 中插入 LifeViewer
tags:
  - 生命游戏
abbrlink: d960e01f
date: 2019-03-12 21:03:21
---

测试在 Hexo 中插入 LifeViewer。

以下 RLE 来自 [LifeWiki 的 LifeViewer 页面](http://www.conwaylife.com/wiki/LifeViewer)：

{% lifeviewer %}
x = 59, y = 7, rule = B3/S23
o5b5ob5ob5obo3bob5ob5obobobob5ob4o$o7bo3bo5bo5bo3bo3bo3bo5bobobobo5bo
3bo$o7bo3bo5bo5bo3bo3bo3bo5bobobobo5bo3bo$o7bo3b3o3b3o3bo3bo3bo3b3o3bo
bobob3o3b4o$o7bo3bo5bo5bo3bo3bo3bo5bobobobo5bo3bo$o7bo3bo5bo6bobo4bo3b
o5bobobobo5bo3bo$5ob5obo5b5o3bo3b5ob5o2bobo2b5obo3bo!
#C [[ COLOUR DEAD 0 0 0 COLOUR ALIVE 0 0 0 ]]
#C [[ LOOP 1101 STARS NOSTEPBACK ]]
#C [[ AUTOSTART X -90 Y 60 LAYERS 6 ZOOM 4 DEPTH 3 ]]
#C [[ PAUSE 3 X 90 Y -60 ANGLE 20 THEME 0 ]]
#C [[ PAUSE 1.5 X 90 Y 60 ANGLE 340 ZOOM 6 ]]
#C [[ PAUSE 1.5 X 0 Y 0 ANGLE 0 THEME 3 ZOOM 4 ]]
#C [[ PAUSE 1 X 0 DEPTH 0.2 ZOOM 6 THEME 4 ]]
#C [[ T 1 THEME 7 ]]
#C [[ T 400 ZOOM 5 X 5 Y -10 THEME 2 ]]
#C [[ T 450 DEPTH 5 ]]
#C [[ T 560 X -155 Y 127 DEPTH 0.5 ]]
#C [[ T 950 X -242 Y 214 ANGLE 20 ]]
#C [[ T 1050 DEPTH 0 ANGLE 0 AUTOFIT "#T" ]]
#C [[ T 1100 X 0 Y 0 ZOOM 0.25 THEME CUSTOM ]]
{% endlifeviewer %}

<!-- more -->

[LifeViewer](http://www.conwaylife.com/wiki/LifeViewer) 是 Chris Rowett 写的一个在线版的生命游戏模拟器，功能十分强大，支持的规则很多，还可以通过脚本来控制其速度和视角。

我修改了一下 Hexo 的 [NexT](https://github.com/theme-next/hexo-theme-next) 主题，使得可以在文章中方便地插入 LifeViewer。

只需要修改了 NexT 主题的三个地方：

首先，下载 [lv-plugin.js](http://www.conwaylife.com/forums/styles/prosilver/template/lv-plugin.js)，放到 `source/js/src/` 文件夹。

然后，在 `scripts/tags/` 文件夹中放进这么一个扩展名为 `.js` 的文件：

```javascript
'use strict';

function lifeViewer(args, content) {
  return `<div class="rle"><pre>${content}</pre><canvas width="480" height="480"></canvas></div>`;
}

hexo.extend.tag.register('lifeviewer', lifeViewer, {ends: true});
```

最后，在 `layout/_custom/head.swig` 文件中插入这么两行（参见[此处](http://www.conwaylife.com/forums/viewtopic.php?f=3&t=1622#p17014)）：

```html
<meta name="LifeViewer" content="rle pre 37 hide limit">
<script src="{{ url_for(theme.js) }}/src/lv-plugin.js"></script>
```

然后就能用了。比如说，要在文章中插入一架滑翔机，只需要在 MarkDown 中插入：

```
{% lifeviewer %}
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!
{% endlifeviewer %}
```

效果如下：

{% lifeviewer %}
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!
{% endlifeviewer %}

不过在手机上看效果不太好，LifeViewer 总是比手机屏幕要宽，不知道怎么改。

想要知道 LifeViewer 的更多用法，点击上面这个 LifeViewer 右上方的 Help 即可。例子见《{% post_link π日，来吃个派 %}》。
