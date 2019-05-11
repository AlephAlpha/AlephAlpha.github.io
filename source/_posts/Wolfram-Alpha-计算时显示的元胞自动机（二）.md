---
title: Wolfram|Alpha 计算时显示的元胞自动机（二）
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
abbrlink: 58d94558
date: 2018-08-09 13:20:00
---

* {% post_link Wolfram-Alpha-计算时显示的元胞自动机（一） %}
* {% post_link Wolfram-Alpha-计算时显示的元胞自动机（三） %}

---
这篇文章没什么内容，只是列举一些我们找到的图样。

原本发在简书时是我自己用 Mathematica 画得的图，转发到这里的时候全部换成 LifeViewer。

对随机的开局，这个元胞自动机也有可能会稳定下来，但大部分情况下会保持一种乱糟糟的状态，缓慢地无限增长。按照 Wolfram 对元胞自动机的分类，它应该算是 Chaotic 的。

<!-- more -->

# 静物

静物有很多。由于 `3457/357/5` 规则的静物在 `B357/S3457` 规则里也是静物，因此可以用《{% post_link 用-Mathematica-搜索生命游戏中的静物（二） %}》里的代码来搜索。这样可以找到很大的静物，比如说：

{% lifeviewer %}
x = 64, y = 64, rule = 3457/357/5
10.2A3.2A7.2A2.2A4.2A6.2A2.2A.A6.2A.2A$.2A2.2A3.2A3.2A7.2A2.2A2.3A.A
5.5A.4A.A2.3A.3A$.2A2.2A4.A.2A.2A.2A.2A6.3A.2A.A.2A.A2.A3.2A.4A.A3.2A
$2A.2A.A.6A4.2A.2A2.4A2.2A2.3A.2A2.2A2.5A2.3A.A.A$.A.A.4A.A2.3A.A6.2A
.A.4A2.4A3.4A.2A2.3A2.3A.3A$A.3A.3A5.A.2A7.3A.A.A7.A.5A3.2A.4A.A3.2A$
3A.A.A.7A.A4.2A2.3A.3A3.6A.A.2A3.3A3.A.3A2.2A$.A.A3.A.A2.A2.2A3.A.3A
5.A3.A.2A3.2A2.2A4.A2.2A.A.2A2.A$.2A.2A.A.2A.A.A.A.3A.2A2.A.3A3.2A4.A
.A2.A3.2A3.3A2.2A.A$3A2.3A.A.A.A.5A5.3A.3A.2A2.4A.2A.A2.A.2A5.3A2.2A$
A2.A2.A3.2A2.A3.A2.2A.2A4.A3.3A.A.A.A.A.3A.2A2.4A3.A.A$.4A2.A.2A2.5A.
A.2A.A5.3A2.2A.3A.2A.A2.2A.A.A.A.2A.3A$2A2.2A.2A.3A.A.A.A.A2.2A2.2A.A
.2A2.2A3.2A.A2.2A.5A2.A3.A$A4.4A.A.2A2.2A2.4A.4A2.A.A.A2.A2.2A.2A.A4.
A2.3A3.A$.A2.A.A4.A.A.A2.4A.2A3.A3.9A.A.A2.A5.3A.2A.3A$6A.2A.3A2.4A3.
A.4A.3A3.A.A.2A.A.5A3.3A.A.2A.2A$A.2A3.3A.A.3A2.A.A2.2A2.A2.A.A3.A.A
2.2A.A4.A.A3.3A.A.A$.A2.2A3.A.2A.2A.5A.2A.2A2.A.4A.A2.A2.3A2.A.2A2.A
2.2A3.A$2A2.A.2A.A.2A.A2.2A2.A3.A.2A.2A.2A2.A.5A.4A3.5A.2A.2A$3A.A.5A
.2A2.A.A.2A3.A.4A.8A2.A2.2A.A3.A.A.2A.A.A$.A2.2A3.A3.2A.2A2.A3.3A3.A.
A2.2A.A.2A2.A2.A5.A2.A3.2A$.A2.2A2.2A3.4A.7A.4A3.2A3.2A2.2A.A2.3A3.5A
.3A$2A.2A.3A3.2A2.A.2A.2A.A2.3A.2A.A3.2A2.4A.4A4.A.2A2.A.A$A2.2A.A3.A
2.A.3A2.A3.5A2.2A.2A3.2A.8A4.A.A3.A.2A$.A3.3A.3A2.A.A2.A2.3A.6A3.5A2.
A.5A2.A.A.A.A.4A$3A.A2.A.A.2A.2A2.2A.3A2.A.A.2A3.A.A3.A2.A.2A2.3A.A.A
.2A2.A$.A.2A3.2A3.A.2A.A2.6A3.A.2A.3A.2A.8A.2A2.A.A.A.3A$.2A2.3A.3A2.
2A2.4A.A.7A.7A2.2A.A2.A5.2A2.2A2.A$3A2.A.A.A.2A.2A2.2A.3A2.A2.A6.4A2.
4A.2A6.3A2.A2.A$.A.2A2.2A2.A2.A4.A3.A2.2A.2A.2A3.2A6.3A3.2A2.A.4A.2A$
.A.2A.A2.6A3.A2.2A.2A2.A2.12A4.A3.4A.A2.A2.A$3A.6A.A.A4.2A.2A2.4A2.A
2.2A2.A.6A.A.2A.A2.A2.2A2.A$.2A.A4.A2.A.A2.5A.A2.A2.2A.2A2.2A2.A.A2.
5A5.2A.2A.3A$.A.3A2.4A.A.A2.A3.2A.A3.4A2.A2.5A.2A3.A4.2A.A.3A.A$3A.2A
2.2A2.A2.2A2.4A.A.3A2.A2.6A.A.A2.3A6.2A3.A.A$A4.2A.3A2.3A.2A2.A3.A.A
2.2A3.A4.A.2A2.2A3.A2.A.A.3A.2A$.2A.A2.A2.A.2A.A.2A3.A.3A2.2A4.2A2.A
2.3A.9A.3A2.3A$2A.7A.A2.A6.2A.A2.2A.A3.3A2.2A4.A.A.A.A.2A.3A.A$2A.A.
2A.2A2.A2.2A.6A3.A3.2A2.A.2A2.2A2.2A2.A3.A.2A.6A$2.2A3.A3.3A.3A.2A5.
4A.3A4.7A.A.A.A2.2A2.A.A2.2A$2.4A2.A.3A2.3A.A3.4A.A.A3.3A2.A.A3.8A.4A
.2A.A$.2A2.2A.2A.A2.A3.2A3.3A2.2A.A2.4A2.A3.A.A4.A.2A2.A.A2.A$A2.2A2.
A5.6A5.5A.A.A.2A2.2A4.2A3.A.A.2A.2A.5A$4A.A2.A.3A.A.2A.A2.A2.A.A3.A.A
2.3A.3A.A.7A2.A2.3A.2A$.A2.2A.3A.A.2A3.6A3.3A.6A.A.A.4A.2A2.A2.A2.A4.
A$.2A3.A2.A.2A.3A2.A2.A4.2A.A5.A2.4A10.2A.5A2.A$2A.2A2.A.A.A3.3A6.A3.
A.6A2.2A3.3A.2A5.A2.A.2A.2A$2A.A.2A.A.4A3.2A4.6A.A2.A2.2A2.4A.2A.3A2.
A.A2.A3.A$.A.2A.A2.A2.2A.2A.3A2.2A.A.2A6.2A2.2A.3A.2A.7A.A3.A$.2A.2A
2.2A3.3A.2A.3A3.3A.6A.2A.A2.3A.A.A3.A2.4A.3A$2A.2A.2A.2A2.A2.2A.A.4A
2.A.2A.A.A.2A.A.A2.2A.A.4A.2A.A2.2A.A$.A.A.2A.2A2.3A5.4A.3A.2A2.A3.2A
2.2A2.2A.2A2.A2.A.2A3.A$.A.2A2.2A.A.2A.2A.2A.A.A.A.A.A.A.2A.A.2A2.A.A
2.A.A.2A2.A.3A.A$3A.4A.2A2.A.3A.A.4A.A.2A.4A.2A2.8A.A2.A.2A.A2.3A$A.
2A2.A4.A2.2A2.3A.A.3A2.A.4A.2A2.2A2.A3.7A.3A3.A$.A2.A.A4.2A.A3.A5.6A.
2A.A.A4.A.2A.A3.2A5.3A.3A$2A2.3A.2A.A2.4A5.A3.A.A.4A.A4.7A.4A4.A2.2A.
A$A.2A.A2.8A.2A2.3A2.2A2.2A2.2A.2A3.A2.A.2A.A2.A.2A3.A.A$.4A.A3.A3.A
2.2A2.2A.6A.A.2A.A.5A.2A2.2A.4A.A.A.A.2A$3.A.A.2A.2A3.A2.2A.3A.A3.A.
3A.3A.2A.A2.4A.A.2A.7A.A$6.A.3A3.3A3.A.A5.3A11.A2.A.A.3A4.3A2.2A$2A2.
2A5.A2.2A.2A2.2A4.A3.A5.2A.3A.2A5.A4.A.A.2A$2A2.3A.6A.A.A.2A.2A.9A.4A
.2A.A.4A.3A2.7A$6.2A.2A2.2A3.2A.2A.2A2.2A2.2A.2A7.2A2.2A.2A2.2A2.A!
{% endlifeviewer %}

因此我无法，也没有必要去列举找到的所有静物。

最常见的静物是方块：

{% lifeviewer %}
x = 2, y = 2, rule = 3457/357/5
2A$2A!
{% endlifeviewer %}

或者两个方块相连：

{% lifeviewer %}
x = 4, y = 3, rule = 3457/357/5
2.2A$4A$2A!
{% endlifeviewer %}

或者三个：

{% lifeviewer %}
x = 5, y = 4, rule = 3457/357/5
2.2A$2.2A$2A.2A$2A.2A!
{% endlifeviewer %}

或者更多……

最常见的一个不是由多个方块组成的静物是这个：

{% lifeviewer %}
x = 5, y = 5, rule = 3457/357/5
2.2A$2.2A$2A.2A$3A.A$2.2A!
{% endlifeviewer %}

也有一些稍大一点的对称的静物，比如说：

{% lifeviewer %}
x = 10, y = 10, rule = 3457/357/5
4.2A$2.6A$.A.A2.A.A$.2A.2A.2A$2A.A2.A.2A$2A.A2.A.2A$.2A.2A.2A$.A.A2.A
.A$2.6A$4.2A!
{% endlifeviewer %}

# 振荡子

由于一个活的细胞至少要过4代才能死掉，因此不存在周期小于5的振荡子。

目前发现的振荡子不多，而且没法转换成 Life-like 的情形来搜索。

最常见的振荡子是这个周期8的转圈圈：

{% lifeviewer %}
x = 3, y = 3, rule = 3457/357/5
3A$B2A$.CD!
{% endlifeviewer %}

第二常见的是这个周期26的梭：

{% lifeviewer %}
x = 5, y = 5, rule = 3457/357/5
2.A$.2AB$3ADC$.2AB$2.A!
{% endlifeviewer %}

然后还找到这个周期15的：

{% lifeviewer %}
x = 9, y = 9, rule = 3457/357/5
3.3A$3.3A$3.ACA$3A.A.3A$2ACA.AC2A$3A.A.3A$3.ACA$3.3A$3.3A!
{% endlifeviewer %}

以及这个周期18的：

{% lifeviewer %}
x = 5, y = 5, rule = 3457/357/5
2.B$3AC$2ADAB$3AC$2.B!
{% endlifeviewer %}

在我以为再也发现不了什么新的振荡子的时候，[Hunting](https://github.com/HuntingBot) 发现，两个梭相撞有时也能得到新的振荡子，比如说：

{% lifeviewer %}
x = 13, y = 6, rule = 3457/357/5
2.A$.B2A6.A$CD3A4.2AB$.B2A4.3ADC$2.A6.2AB$10.A!
{% endlifeviewer %}

后来，[ConwayLife.com](http://www.conwaylife.com/forums/viewtopic.php?f=11&t=2409&p=68221#p68221) 上的 [danny](http://www.conwaylife.com/forums/memberlist.php?mode=viewprofile&u=1857) 还发现了一个周期 10 的振荡子：

{% lifeviewer %}
x = 9, y = 9, rule = 3457/357/5
4.DC$4.3A$3.2AB.A$2.A.A.BAC$D3A.3AD$CAB.A.A$.A.B2A$2.3A$3.CD!
{% endlifeviewer %}

在我给 LifeFind 添加上搜索 Generations 的规则的功能之前，找到的振荡子就这么多。

# 飞船

已经找到好几架飞船，但速度都是c/2。

最常见的飞船是这个周期2的：

{% lifeviewer %}
x = 5, y = 4, rule = 3457/357/5
.CA$DB3A$2.C2A$.DB2A!
{% endlifeviewer %}

以及这个，也是周期2：

{% lifeviewer %}
x = 5, y = 6, rule = 3457/357/5
.CA$DB3A$2.C2A$2.C2A$DB3A$.CA!
{% endlifeviewer %}

这个不知道该算一架飞船还是两架：

{% lifeviewer %}
x = 5, y = 9, rule = 3457/357/5
.CA$DB3A$2.C2A$.DB2A2$.DB2A$2.C2A$DB3A$.CA!
{% endlifeviewer %}

别的飞船的头部都和上面这些飞船一样，只是尾部有些区别。

比如说这个周期4的：

{% lifeviewer %}
x = 8, y = 6, rule = 3457/357/5
4.CA$.BADB3A$BC2A.C2A$BC2A.C2A$.BADB3A$4.CA!
{% endlifeviewer %}

这个也是周期4：

{% lifeviewer %}
x = 9, y = 9, rule = 3457/357/5
5.CA$2.BADB3A$.AC2A.C2A$DB3ADB2A2$DB3ADB2A$.AC2A.C2A$2.BADB3A$5.CA!
{% endlifeviewer %}

还是周期4：

{% lifeviewer %}
x = 9, y = 12, rule = 3457/357/5
5.CA$4.DB3A$3.CA.C2A$.CD2A.C2A$.BD6A$BC2A2DA$BC2A2DA$.BD6A$.CD2A.C2A$
3.CA.C2A$4.DB3A$5.CA!
{% endlifeviewer %}

最后这个是周期8：

{% lifeviewer %}
x = 8, y = 10, rule = 3457/357/5
4.CA$3.DB3A$2.CA.C2A$DABA.C2A$8A$.2B2DA$ABA2DA$AC6A$BA.A.C2A$4.DB2A!
{% endlifeviewer %}

在给 LifeFind 添加上搜索 Generations 的规则的功能之前，找到的飞船就这些。

# Puffer

Puffer 这个词不知道怎么翻译……河豚？蒸汽机车？喷气者？

目前发现的好看的 puffer 只有两个。

这个周期是28：

{% lifeviewer %}
x = 8, y = 18, rule = 3457/357/5
4.CA$3.DB3A$2.CA.C2A$DABA.C2A$.AB5A$2.A2DA$2.A2DA$.7A$2ADA.C2A$2ADA.C
2A$.7A$2.A2DA$2.A2DA$.AB5A$DABA.C2A$2.CA.C2A$3.DB3A$4.CA!
{% endlifeviewer %}

这个周期是64：

{% lifeviewer %}
x = 13, y = 24, rule = 3457/357/5
9.CA$8.DB3A$3.DCA.CA.C2A$2.C.5A.C2A$2.DB3AC5A$2.C2.2BA2DA$3.4AB2DA$.D
A.9A$2.2A.A2DA.C2A$.2AC2A2DA.C2A$D2A2C8A$D2A2CA2C2DA$D2A2CA2C2DA$D2A
2C8A$.2AC2A2DA.C2A$2.2A.A2DA.C2A$.DA.9A$3.4AB2DA$2.C2.2BA2DA$2.DB3AC
5A$2.C.5A.C2A$3.DCA.CA.C2A$8.DB3A$9.CA!
{% endlifeviewer %}

还有别的 puffer，但后面喷出的东西很不规则，而且无法稳定下来，并不好看。它们的速度基本上都是 c/2，“头部”也类似于上面的这些飞船和 puffer。目前发现的唯一例外是一个 (2,14)c/46 的斜 puffer（也就是说，每46代向下移动2格，向右移动14格）：

{% lifeviewer %}
x = 4, y = 5, rule = 3457/357/5
2.BA$.C2A$D.CA$.3A$.2A!
{% endlifeviewer %}

# 复制子？

除了以上这些东西之外，还有一个比较有趣的图样。它差点就能成为一个复制子了，不过复制了十几代之后就乱了。

{% lifeviewer %}
x = 5, y = 5, rule = 3457/357/5
2.A$.BAB$2AC2A$.3A$.3A!
{% endlifeviewer %}
