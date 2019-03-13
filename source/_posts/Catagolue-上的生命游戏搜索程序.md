---
title: Catagolue 上的生命游戏搜索程序
date: 2017-10-01 18:39:00
tags:
  - 生命游戏
  - 简书搬运
---

注意：apgluxe 的原作者为 Catagolue 提供了另一个域名：gol.hatsya.co.uk。这个没有被墙。只需把原版的 apgluxe 中的 catagolue.appspot.com 换成 gol.hatsya.co.uk 就能正常工作了。原版的最新版也已经添加这个地址（如果访问不稳定，可以尝试在 ping 得通的时候记下 ip 地址，然后改 Host）。因此这里说离线版已经没有意义了。

---

不久前，我发现了这个叫 [Catagolue](http://catagolue.appspot.com/) 的神奇的网站，收录的规则和图样比 LifeWiki 要全得多。

这里收录的图样都是用一个叫 apgsearch 的程序找出来的。apgsearch 的不同版本有不同的名字，最新的第4版叫 apgluxe。它的功能就是自己倒汤，煮汤，然后在汤的残骸中自动搜索有意义的图样，然后自动上传到 Catagolue 上。

<!-- more -->

不过，正是因为这最后一步，这个程序无法在中国大陆正常运行：Catagolue 用的是谷歌旗下某网站的域名，于是被墙了。而且有翻墙工具也没用，因为它用了个叫 HappyHTML 的东西，不支持代理！

无奈之下，我把它改了一下，去掉与上传有关的部分。我完全不懂 C++，只能胡乱修改，把看起来像是和联网有关的内容都删掉，好像能够正常编译，不能保证不会有错。

这是我修改后的离线版：[https://github.com/AlephAlpha/apgluxe_offline](https://github.com/AlephAlpha/apgluxe_offline)

这个程序（无论是原版还是我修改后的离线版）是写给64位的 Unix 系统的，32位的操作系统没法使用。在64位的 Windows 上要用的话好像要先装个 [Cygwin](http://cygwin.com/)。反正我不用 Windows。

下载这个程序时可以用` git clone`，也可以直接下载 ZIP 压缩包。在下载好之后，要编译程序，在终端里 `cd` 到这个目录里，然后运行：

```
./recompile.sh
```

即可。

要运行程序的话，在同一个目录里，运行：

```
./apgluxe -n 1000000
```

这里的1000000是每一轮倒的汤的数量，可以换成你喜欢的任何数字。每倒完一轮，会生成一个统计结果，保存在一个类似于 `log.一串类似于乱码的东西.txt` 的文件当中（图样用的是 [apgcode](http://conwaylife.com/wiki/Apgcode) 格式，我不知道怎样转成 rle 或者别的 Golly 能读的格式），然后自动开始下一轮。什么时候不想玩了，按 Ctrl+C 可以退出。也可以不加 `-n 1000000` 这个参数，这样默认每轮会煮20000000锅汤（我觉得这个数字有点太大了）。如果 CPU 是多核的，还可以加 `-p 4` 这样的参数来并行运算，这个4表示4个线程。

运行时如果找到线性增长的图样（一般是 [Block-laying switch engine](http://conwaylife.com/wiki/Block-laying_switch_engine) 或者 [Glider-producing switch engine](http://conwaylife.com/wiki/Glider-producing_switch_engine)），或者罕见的周期大于2的振荡子，它会直接告诉你。刚才试了一轮，煮到将近第九十万锅汤的时候找到一个 [xp30_w33z8kqrqk8zzzw33](https://catagolue.appspot.com/object?apgcode=xp30_w33z8kqrqk8zzzw33&rule=b3s23)，在 Catagolue 上查了一下是个[蜂王梭](http://conwaylife.com/wiki/Queen_bee_shuttle)，运气不错。
