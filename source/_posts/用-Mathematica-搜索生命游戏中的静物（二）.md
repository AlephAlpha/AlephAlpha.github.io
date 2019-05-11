---
title: 用 Mathematica 搜索生命游戏中的静物（二）
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
abbrlink: 55bd7a4e
date: 2018-05-13 17:51:00
---

* {% post_link 用-Mathematica-搜索生命游戏中的静物 %}
* {% post_link 用-Mathematica-搜索生命游戏中的静物（三） %}

---

之前写的那篇《{% post_link 用-Mathematica-搜索生命游戏中的静物 %}》，由于自己写的部分多了一点（虽然关键的一步还是用 Mathematica 自带的 `FindPath` 函数），特别慢，还特别耗内存。果然对我这种__完全__不懂算法的人，就应该把所有的事情都交给 Mathematica 才对。

---

生命游戏里的每个细胞的状态可以看成一个布尔值，一个（大小有限的）图样则可以看成一个由布尔值组成的二维数组。于是，要寻找满足某些条件图样，就相当于要求这些布尔值满足某个方程。于是，这是一个[布尔可满足性问题](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem)（SAT）。Mathematica 里有个叫 [`SatisfiabilityInstances`](http://reference.wolfram.com/language/ref/SatisfiabilityInstances.html) 的函数就是干这个的。


<!-- more -->

---

我们先把要满足的条件用 Mathematica 代码写出来。

假设我们要找的图样在一个 `x` 乘 `y` 的长方形里边，它对应的数组可以用 `Array[b, {x, y}]` 来表示，这里每个 `b[i,j]` 表示一个细胞。

静物（[Still life](http://conwaylife.com/wiki/Still_life)）指的是稳定的图样，它要满足下面两个条件：

*   每个活细胞周围的活细胞个数必须是2或者3，
*   每个死细胞周围的活细胞个数不能是3。

我们先写一个函数来数一个细胞周围的活细胞个数：

```mathematica
NeighborCount[k_, {i_, j_}] :=
  BooleanCountingFunction[{k},
   Delete[Catenate[Array[b, {3, 3}, {i, j} - 1]], 5]];
```

然后每个细胞要满足的条件可以写成这样：

```mathematica
StillLifeCondition[i_, j_] :=
  (b[i, j] && NeighborCount[{2, 3}, {i, j}]) ||
   (! b[i, j] && ! NeighborCount[{3}, {i, j}]);
```

此外，这个图样是有限的，边界之外的细胞总是死的。于是，整个图样要满足的条件可以写成：

```mathematica
Array[StillLifeCondition[##] /.
   b[i_, j_] /; i < 1 || i > x || j < 1 || j > y :> False &,
 {x, y} + 2, 0, And]
```

然后我们可以用 `SatisfiabilityInstances` 函数：

```mathematica
SearchStillLife[x_, y_] :=
 ArrayReshape[
  SatisfiabilityInstances[
    Array[StillLifeCondition[##] /.
       b[i_, j_] /; i < 1 || i > x || j < 1 || j > y :> False &,
     {x, y} + 2, 0, And],
    Catenate[Array[b, {x, y}]]][[1]], {x, y}];
```

然后我们就可以用这个 `SearchStillLife` 函数来找静物。不过，它出奇地慢，找个16乘16大小的静物也要花上44秒：

```mathematica
ArrayPlot[Boole@SearchStillLife[16, 16], Mesh -> All] // AbsoluteTiming
```

{% asset_img 1.png %}

能不能快一些？

我不清楚这个 `SatisfiabilityInstances` 函数用的是什么算法。不过看了一下维基百科，SAT 问题最常用的好像是一种叫 [DPLL](https://en.wikipedia.org/wiki/DPLL_algorithm) 的算法。我**完全**不懂算法，就不管它的细节了。总之，它要求输入的是一个[合取范式](https://en.wikipedia.org/wiki/Conjunctive_normal_form)（CNF）。

于是，我们可以试试把条件转换成 CNF，也就是说，把前面的 `StillLifeCondition` 函数改写成：

```mathematica
StillLifeCondition[i_, j_] :=
 BooleanConvert[
  (b[i, j] && NeighborCount[{2, 3}, {i, j}]) ||
   (! b[i, j] && ! NeighborCount[{3}, {i, j}]), "CNF"];
```

后面的 `SearchStillLife` 函数定义不变。现在再找一遍16乘16的静物，果然快了很多，只花了2.2秒。不过找出来的静物……

{% asset_img 2.png 居然是空的…… %}

看来 `SatisfiabilityInstances` 函数在处理 CNF 时用的是和别的形式不同的算法。满足条件的静物有很多，但 `SatisfiabilityInstances` 只会输出其中的第一个。而在输入 CNF 的时候，不巧空静物就是这“第一个”。

只能找到空静物的代码并没有什么用。我们可以试试给原来的代码引入一点随机的因素，让这个空静物不再是“第一个”。比如说，把原来数组异或上一个随机的数组，把前面的 `SearchStillLife` 函数改写成：

```mathematica
SearchStillLife[x_, y_] := 
 Block[{r = RandomChoice[{True, False}, {x, y}]},
  MapThread[Xor, {r,
    ArrayReshape[
     SatisfiabilityInstances[
       Array[StillLifeCondition[##] /. 
           b[i_, j_] /; i < 1 || i > x || j < 1 || j > y :> False /.
                   b[i_, j_] :> Xor[b[i, j], r[[i, j]]] &,
        {x, y} + 2, 0, And],
       Catenate[Array[b, {x, y}]]][[1]], {x, y}]}, 2]]
```

现在完整的代码变成了：

```mathematica
NeighborCount[k_, {i_, j_}] :=
  BooleanCountingFunction[{k},
   Delete[Catenate[Array[b, {3, 3}, {i, j} - 1]], 5]];

StillLifeCondition[i_, j_] :=
 BooleanConvert[
  (b[i, j] && NeighborCount[{2, 3}, {i, j}]) ||
   (! b[i, j] && ! NeighborCount[{3}, {i, j}]), "CNF"];

SearchStillLife[x_, y_] := 
 Block[{r = RandomChoice[{True, False}, {x, y}]},
  MapThread[Xor, {r,
    ArrayReshape[
     SatisfiabilityInstances[
       Array[StillLifeCondition[##] /. 
           b[i_, j_] /; i < 1 || i > x || j < 1 || j > y :> False /.
                   b[i_, j_] :> Xor[b[i, j], r[[i, j]]] &,
        {w, h} + 2, 0, And],
       Catenate[Array[b, {w, y}]]][[1]], {x, y}]}, 2]]
```

这次能找到好看的静物了，花的时间时间在2.7秒左右：

```mathematica
SeedRandom[233];
ArrayPlot[Boole@SearchStillLife[16, 16], Mesh -> All] // AbsoluteTiming
```

{% asset_img 3.png %}

再试试大一点的静物，比如说64乘64的。花了大概46秒。

{% asset_img 4.png 后来发现时间主要花在生成要满足的条件上了，修改之后速度可以提高到二十多秒 %}

---

找完了静物，再来找振荡子（[Oscillator](http://conwaylife.com/wiki/Oscillator)）。振荡子是随时间周期变化的图样。于是，我们可以给那个布尔值的数组增加一个时间的维度，写成 `Array[b, {p, w, h}]`，这里 `p` 是它的周期。它们满足的条件也要作出相应的修改：

```mathematica
NeighborCount[k_, {t_, i_, j_}] := 
  BooleanCountingFunction[{k}, 
   Delete[Flatten[Array[b, {1, 3, 3}, {t, i - 1, j - 1}]], 5]];

OscillatorCondition[t_, i_, j_] := 
  BooleanConvert[
   (b[t, i, j] && (b[t + 1, i, j] ⧦ 
        NeighborCount[{2, 3}, {t, i, j}])) ||
    (! b[t, i, j] && (b[t + 1, i, j] ⧦ 
        NeighborCount[{3}, {t, i, j}])), "CNF"];

SearchOscillator[p_, w_, h_] :=
 Block[{r = RandomChoice[{True, False}, {p, w, h}]},
  MapThread[
   Xor, {r, 
    ArrayReshape[
     SatisfiabilityInstances[
       Array[OscillatorCondition[##] /.
           {b[t_, i_, j_] /; i < 1 || i > w || j < 1 || j > h :> False, 
            b[0, i_, j_] :> b[p, i, j]} /.
          b[t_, i_, j_] :> Xor[b[t, i, j], r[[t, i, j]]] &,
        {p, w + 2, h + 2}, 0, And],
       Flatten[Array[b, {p, w, h}]]][[1]], {p, w, h}]}, 3]]
```

（代码里的这个 `⧦` 符号表示的是等价，Mathematica 里显示为 ⇔。）

可能因为静物比较稀少，速度比找静物时慢了很多，找一个周期2的16乘16的静物花了11秒：

```mathematica
SeedRandom[233];
ArrayPlot[#, Mesh -> All] & /@ 
  Boole@SearchOscillator[2, 16, 16] // AbsoluteTiming
```

{% asset_img 5.gif %}

周期3的就更慢了，找下面这个振荡子花了14分钟。

{% asset_img 6.gif 其实是运气不好，随机种子设成233时搜这个就特别慢，换个随机种子就会快很多 %}

更高的周期我就不敢试了。

应该会有更快的办法。有好的建议欢迎评论。
