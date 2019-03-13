---
title: 用 Mathematica 搜索生命游戏中的静物（三）
date: 2019-03-04 16:44:00
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
---

* {% post_link 用-Mathematica-搜索生命游戏中的静物 %}
* {% post_link 用-Mathematica-搜索生命游戏中的静物（二） %}

---

我把《{% post_link 用-Mathematica-搜索生命游戏中的静物（二） %}》里的代码整理了一下，写成了个叫做 LifeFind 的 Mathematica 包。现在它支持不同的规则和对称性，可以搜索静物之外的图样，但搜索速度并没有提高。可以在[这里](https://github.com/AlephAlpha/LifeFind)下载。

需要强调的是，我之所以用 SAT，不是因为它是最好/最快的办法，而是因为我完全不懂算法，只能用 Mathematica 里现成的函数。

以下是这个包的一些使用范例 ：

<!-- more -->

---

搜索之前记得[下载与安装](https://github.com/AlephAlpha/LifeFind/wiki/%E4%B8%8B%E8%BD%BD%E4%B8%8E%E5%AE%89%E8%A3%85)，并用以下命令来加载这个包：

```Mathematica
<<Life`
```

LifeFind 的搜索是随机的，同样的搜索可能会得到不同的结果。为了确保以下范例的可重复性，我用以下的命令将每次搜索时的[随机种子](https://en.wikipedia.org/wiki/Random_seed)设为 233，顺便用 [`Timing`](https://reference.wolfram.com/language/ref/Timing.html) 函数给出搜索在我的电脑上所花的时间。

```Mathematica
$Pre = Function[x, SeedRandom[233]; 
   Last@Echo[Timing@x, "Timing: ", First], HoldAll];
```

搜索时间仅供参考。随机种子不同，搜索结果和搜索时间都会有很大区别。

## 静物

### 1

搜索生命游戏中大小不超过 16*16 的静物：

__代码__：

```Mathematica
LifeFind[16, 16]
```

__搜索时间__：0.941665 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
bo3b2ob2ob2obo$obo2bo3bobob2o$bobobob2o2bo$3b2obobobo2b2o$2bo3bo2bob2o
2bo$2b2obobobo3b3o$6bo2b3o$5obobo3b2o$o3bobob2obo2bo$2bo4bo4bobo$b3o5b
2obob2o$o4b4obobo2bo$ob3obo6bo$bo9b2o$3b2obo3bo2b3o$2b2ob2o3b2o3bo!
{% endlifeviewer %}

### 2

搜索 B2c3-ij4ai5iy6c/S2-kn3-enq4cint 规则中大小不超过 20*20 的 [C4 对称](http://www.conwaylife.com/wiki/Symmetry#C4)的静物：

__代码__：

```Mathematica
LifeFind[20, 20, "Rule" -> "B2c3-ij4ai5iy6c/S2-kn3-enq4cint", 
 "Symmetry" -> "C4"]
```

__搜索时间__：1.49678 秒

__搜索结果__：

{% lifeviewer %}
x = 20, y = 20, rule = B2c3-ij4ai5iy6c/S2-kn3-enq4cint
2bo4bo2bo6bo$bob4ob2obo4bobo$obo4bo2bo3b2obobo$bo3bo2bo6bo2bo$2b3ob2o
5bobo2bo$2bo2bo2b5obobobo$4bobobo4bobo2bo$5bo2bo2bo3bobobo$bo3bob2o2b
4obobo$obo2bo8bo3bo$bo3bo8bo2bobo$bobob4o2b2obo3bo$obobo3bo2bo2bo$bo2b
obo4bobobo$bobobob5o2bo2bo$bo2bobo5b2ob3o$bo2bo6bo2bo3bo$obob2o3bo2bo
4bobo$bobo4bob2ob4obo$2bo6bo2bo4bo!
{% endlifeviewer %}

### 3

搜索生命游戏中在半径为 29 的圆形内的 [D8 对称](http://www.conwaylife.com/wiki/Symmetry#D8)的静物：

__代码__：

```Mathematica
LifeFind[59, 59, "Symmetry" -> "D8", 
 "KnownCells" -> {DiskMatrix[29] _}]
```

__搜索时间__：15.6273 秒

__搜索结果__：

{% lifeviewer %}
x = 59, y = 59, rule = B3/S23
25b2o5b2o$24bobo2bo2bobo$19b2o2bo2bobobobo2bo2b2o$20b4ob2obobob2ob4o$
18bo5bo3bobo3bo5bo$12b2o3bob4obo3bobo3bob4obo3b2o$11bo2bo2bobo2bobob2o
bob2obobo2bobo2bo2bo$11b2o2bobo3bo2bo2bo3bo2bo2bo3bobo2b2o$13b2o2bo2b
2obobo2b3o2bobob2o2bo2b2o$11b2o4bobo3bob3o3b3obo3bobo4b2o$10bo2b4o2b2o
b2o4bobo4b2ob2o2b4o2bo$6b2obobobo3b2o5b2o2bobo2b2o5b2o3bobobob2o$5bobo
bo2bo3bo2bob2obobobobobobob2obo2bo3bo2bobobo$5bo2bob2o3bo2bo3bobob2obo
b2obobo3bo2bo3b2obo2bo$6bobobo3bo4b3o2bo4bo4bo2b3o4bo3bobobo$7bo2bo2bo
b4o3b2ob2obobob2ob2o3b4obo2bo2bo$10bobo2bo2bobo2bo2bobobobo2bo2bobo2bo
2bobo$5b5obo3bo2bob2o2bobobobobobo2b2obo2bo3bob5o$4bo6bobob4o2bob2o2bo
3bo2b2obo2b4obobo6bo$2bo2b2o2b2obobo4bobo2bo3b3o3bo2bobo4bobob2o2b2o2b
o$2b2obo2bobo3bob2o2bobo2b3o3b3o2bobo2b2obo3bobo2bob2o$3bobob2o3bobo2b
3o2b3o2bobobo2b3o2b3o2bobo3b2obobo$3bob2o3bob2obo4b2o3bo2bobo2bo3b2o4b
ob2obo3b2obo$2b2o4b3o4b2obo2bo2bo4bo4bo2bo2bob2o4b3o4b2o$bo2b4o3b4o2b
3obobo11bobob3o2b4o3b4o2bo$o2bo4b2obo3bo4bobo13bobo4bo3bob2o4bo2bo$4o
2bo2bo2b2ob3o2bo5b2o3b2o5bo2b3ob2o2bo2bo2b4o$6b2obo3bo4bob2o4b2o3b2o4b
2obo4bo3bob2o$2b4o2bob3o2b3obo2bo13bo2bob3o2b3obo2b4o$bo4bobo4b2o4bobo
bo11bobobo4b2o4bobo4bo$2b4o2bob3o2b3obo2bo13bo2bob3o2b3obo2b4o$6b2obo
3bo4bob2o4b2o3b2o4b2obo4bo3bob2o$4o2bo2bo2b2ob3o2bo5b2o3b2o5bo2b3ob2o
2bo2bo2b4o$o2bo4b2obo3bo4bobo13bobo4bo3bob2o4bo2bo$bo2b4o3b4o2b3obobo
11bobob3o2b4o3b4o2bo$2b2o4b3o4b2obo2bo2bo4bo4bo2bo2bob2o4b3o4b2o$3bob
2o3bob2obo4b2o3bo2bobo2bo3b2o4bob2obo3b2obo$3bobob2o3bobo2b3o2b3o2bobo
bo2b3o2b3o2bobo3b2obobo$2b2obo2bobo3bob2o2bobo2b3o3b3o2bobo2b2obo3bobo
2bob2o$2bo2b2o2b2obobo4bobo2bo3b3o3bo2bobo4bobob2o2b2o2bo$4bo6bobob4o
2bob2o2bo3bo2b2obo2b4obobo6bo$5b5obo3bo2bob2o2bobobobobobo2b2obo2bo3bo
b5o$10bobo2bo2bobo2bo2bobobobo2bo2bobo2bo2bobo$7bo2bo2bob4o3b2ob2obobo
b2ob2o3b4obo2bo2bo$6bobobo3bo4b3o2bo4bo4bo2b3o4bo3bobobo$5bo2bob2o3bo
2bo3bobob2obob2obobo3bo2bo3b2obo2bo$5bobobo2bo3bo2bob2obobobobobobob2o
bo2bo3bo2bobobo$6b2obobobo3b2o5b2o2bobo2b2o5b2o3bobobob2o$10bo2b4o2b2o
b2o4bobo4b2ob2o2b4o2bo$11b2o4bobo3bob3o3b3obo3bobo4b2o$13b2o2bo2b2obob
o2b3o2bobob2o2bo2b2o$11b2o2bobo3bo2bo2bo3bo2bo2bo3bobo2b2o$11bo2bo2bob
o2bobob2obob2obobo2bobo2bo2bo$12b2o3bob4obo3bobo3bob4obo3b2o$18bo5bo3b
obo3bo5bo$20b4ob2obobob2ob4o$19b2o2bo2bobobobo2bo2b2o$24bobo2bo2bobo$
25b2o5b2o!
{% endlifeviewer %}

### 4

搜索生命游戏中大小不超过 10*10，恢复时间不超过 4 的 [glider eater](http://www.conwaylife.com/wiki/Eater)：

这里多搜了一代，以确保搜到的是静物。

__代码__：

```Mathematica
LifeFind[10, 10, 6, "Rule" -> "B3/S23", "Periodic" -> False, 
 "KnownCells" -> 
  Join[{{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}}}, Table[{}, 3], 
   Table[0, 2, 4, 4]], 
 "OtherConditions" -> 
  Array[If[Max[##] <= 3, True, 
     C[##, 1] \[Equivalent] C[##, 5] \[Equivalent] C[##, 6]] &, {10, 
    10}, 1, And]]
```

__搜索时间__：2.97737 秒

__搜索结果__：

{% lifeviewer %}
x = 10, y = 10, rule = B3/S23
bo$2bo2b2o$3o3bo$6bob2o$3b2obob2o$4bobo$2bobobo$bob2obob2o$bo4bo2bo$2o
4b2o!
{% endlifeviewer %}

## 振荡子

### 5

搜索生命游戏中大小不超过 16*16 的周期为 3 的振荡子：

__代码__：

```Mathematica
LifeFind[16, 16, 3]
```

__搜索时间__：343.556 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
4b2ob2o3bo2bo$5bobo4b4o$bobo3bo2b2o$ob6obo3b3o$o7bo2b2o2bo$bob2obo2b2o
2b2o$2b2obob2o2bo$5bo2bo2b4o$2b2o2bo8bo$2bo4bo5b3o$2b2obob2o3bo$2b2o3b
o2bo2bo$b3o2bob2o3bo$o4b3o3b2o$2o2bob3o$4bob2o!
{% endlifeviewer %}

### 6

搜索生命游戏中大小不超过 8*8 的周期为 5 的 [D8 对称](http://www.conwaylife.com/wiki/Symmetry#D8)的振荡子：

通过设置 `"Changing" -> True` 来避免搜到静物。这里搜到的是 [Octagon 2](http://www.conwaylife.com/wiki/Octagon_2)。

__代码__：

```Mathematica
LifeFind[8, 8, 5, "Symmetry" -> "D8", "Changing" -> True]
```

__搜索时间__：1.76343 秒

__搜索结果__：

{% lifeviewer %}
x = 8, y = 8, rule = B3/S23
$2bo2bo$bob2obo$2bo2bo$2bo2bo$bob2obo$2bo2bo!
{% endlifeviewer %}

### 7

搜索生命游戏中大小不超过 6*6 的周期为 4 的振荡子：

通过设置 `"Changing" -> {1, 3}` 来避免搜到静物或者周期 2 的振荡子。这里搜到的是 [Mold](http://www.conwaylife.com/wiki/Mold)。

__代码__：

```Mathematica
LifeFind[6, 6, 4, "Changing" -> {1, 3}]
```

__搜索时间__：0.655831 秒

__搜索结果__：

{% lifeviewer %}
x = 6, y = 6, rule = B3/S23
$3o$3obo$bobobo$2bo2bo$3b2o!
{% endlifeviewer %}

### 8

搜索生命游戏中大小不超过 16*16 的周期为 2 的[凤凰](http://www.conwaylife.com/wiki/Phoenix)：

__代码__：

```Mathematica
LifeFind[16, 16, 2, 
 "OtherConditions" -> 
  Array[! C[##, 1] || ! C[##, 2] &, {16, 16}, 1, And]]
```

__搜索时间__：4.2407 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
$12bo$10bobo$14bo$8b2o$14b2o$9bo$11bobo$7bo3bo$5bobo$9bo$3b2o$9b2o$4bo
$6bobo$6bo!
{% endlifeviewer %}

### 9

搜索{% post_link Wolfram-Alpha-计算时显示的元胞自动机（一） 3457/357/5 %} 规则中大小不超过 7*7 的周期为 5 的振荡子：

__代码__：

```Mathematica
LifeFind[7, 7, 5, "Rule" -> "3457/357/5", "Changing" -> True]
```

__搜索时间__：18.3763 秒

__搜索结果__：

{% lifeviewer %}
x = 7, y = 7, rule = 3457/357/5
.AB$C2AC$D2AD$2.AC.A$3.B2AB$3.3AC$5.D!
{% endlifeviewer %}

### 10

搜索未知的规则中大小不超过 5*5 的周期为 11 的振荡子：

__代码__：

```Mathematica
LifeFind[5, 5, 11, "Rule" -> "", "Changing" -> True]
```

__搜索时间__：17.162 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B2k3n4jnry5eiry7c8/S2ck3aeijnqr4erwyz5aijqr6aekn7e8
bobo$2b3o$3obo$5o$3bo!
{% endlifeviewer %}

### 11

搜索未知的有 4 种状态的 [Generations 规则](http://www.conwaylife.com/wiki/Generations)中大小不超过 5*5 的周期为 11 的振荡子：

__代码__：

```Mathematica
LifeFind[5, 5, 11, "Rule" -> "", "Generations" -> 4, 
 "Changing" -> True]
```

__搜索时间__：63.1457 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = 2cik3ijr4aenqwy5ijk6ce/3e4aqw5y6ak/4
.A.A$ABA.A$A2CA$A2CBA$.3A!
{% endlifeviewer %}

### 12

搜索一个规则，使得生命游戏中的滑翔机在这个规则中是一个周期 48 的 [Reflectorless rotating oscillator](http://conwaylife.com/wiki/Reflectorless_rotating_oscillator)；具体地说，在 12 代之后向右平移 6 格并顺时针旋转 90 度：

我们只需搜索 13 代，就能让搜到的图样满足条件。注意要设置 `"Periodic" -> False`。

__代码__：

```Mathematica
LifeFind[5, 11, 13, "Rule" -> "", "Periodic" -> False, 
 "KnownCells" -> 
  Join[{ArrayPad[{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}}, {{1, 1}, {1, 7}}, 
     0]}, Table[{}, 
    11], {ArrayPad[{{1, 0, 0}, {1, 0, 1}, {1, 1, 0}}, {{1, 1}, {7, 
       1}}, 0]}]]
```

__搜索时间__：37.1343 秒

__搜索结果__：

{% lifeviewer %}
x = 11, y = 5, rule = B2ceik3y4ckqw5kr6cn/S01ce2eikn3eiq4jn5akn6ek
$2bo$3bo$b3o!
{% endlifeviewer %}

## 飞船

### 13

搜索生命游戏中大小不超过 5*16，周期为 3，速度为 c/3 的竖直方向的飞船：

这里搜到的是 [25P3H1V0.1](http://www.conwaylife.com/wiki/25P3H1V0.1)。

__代码__：

```Mathematica
LifeFind[5, 16, 3, 1, 0]
```

__搜索时间__：1.23444 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 5, rule = B3/S23
o2bo$b2o2bo3b2obo2bo$b2ob2o2bo4b2o$5b3ob3ob2o$7bo!
{% endlifeviewer %}

### 14

搜索生命游戏中大小不超过 12*15，周期为 5，速度为 2c/5 的 D2 对称的竖直方向的飞船：

这里搜到的是 [44P5H2V0](http://www.conwaylife.com/wiki/44P5H2V0)。

__代码__：

```Mathematica
LifeFind[12, 15, 5, 2, 0, "Symmetry" -> "D2|"]
```

__搜索时间__：526.74 秒

__搜索结果__：

{% lifeviewer %}
x = 15, y = 12, rule = B3/S23
4bobobobo$b3o7b3o$2o11b2o$3bo7bo$2b2o7b2o$b2o9b2o$2ob2o5b2ob2o$2bo2bo
3bo2bo$2b2ob2ob2ob2o$3bobo3bobo$4bo5bo!
{% endlifeviewer %}

### 15

搜索生命游戏中大小不超过 21*21，周期为 4，速度为 c/2 的 [glide symmetric](http://www.conwaylife.com/wiki/Glide_symmetric#Glide_symmetric_spaceship) 的竖直方向的飞船：

__代码__：

```Mathematica
LifeFind[21, 21, 4, 2, 0, 
 "OtherConditions" -> 
  Array[C[##, 1] \[Equivalent] C[# + 1, 21 + 1 - #2, 3] &, {21, 21}, 
   1, And]]
```

__搜索时间__：42.8359 秒

__搜索结果__：

{% lifeviewer %}
x = 21, y = 21, rule = B3/S23
$4bo$3bo2bo2b2o5b2o$3bo4bo6bo$10bo5bo$4b2obob5obo$6bo6b3o$8bobo$2b2o7b
o6b2o$2b3o6bo6b3o$bob2o3bo2bo5bob2o$b3o5b3o5b3o$2bo15bo3$4b2o4b2o4b2o$
4b3o3b3o3b3o$3bob2o2bob2o2bob2o$3b3o3b3o3b3o$4bo5bo5bo!
{% endlifeviewer %}

### 16

搜索 [B2-ak3ain/S1 规则](http://www.conwaylife.com/forums/viewtopic.php?f=11&t=3761)中大小不超过 10*10，周期为 5，速度为 c/5 的 D2 对称的对角方向的飞船：

__代码__：

```Mathematica
LifeFind[10, 10, 5, 1, 1, "Rule" -> "B2-ak3ain/S1", 
 "Symmetry" -> "D2\\"]
```

__搜索时间__：1.63345 秒

__搜索结果__：

{% lifeviewer %}
x = 10, y = 10, rule = B2-ak3ain/S1
$6bo$5bobo$5bo2bo$5bobo$2b3o$bo$2bobo$3bo!
{% endlifeviewer %}

### 17

搜索上面搜到的飞船的大小不超过 15*15 的  D2 对称的 [tagalong](http://www.conwaylife.com/wiki/Tagalong)：

__代码__：

```Mathematica
LifeFind[15, 15, 5, 1, 1, "Rule" -> "B2-ak3ain/S1", 
 "Symmetry" -> "D2\\", 
 "KnownCells" -> {ArrayPad[
    FromRLE@"x = 10, y = 10, rule = B2-ak3ain/S1\n\
$6bo$5bobo$5bo2bo$5bobo$2b3o$bo$2bobo$3bo!", {{5, 1}, {5, 1}}, _]}]
```

__搜索时间__：4.2824 秒

__搜索结果__：

{% lifeviewer %}
x = 15, y = 15, rule = B2-ak3ain/S1
$8bo$10bo$10bo$10bo2$11bo$10bobo$bo8bo2bo$10bobo$2b3o2b3o$6bo$7bobo$8b
o!
{% endlifeviewer %}

### 18

搜索 [B02-ak3ai/S1 规则](https://github.com/HuntingBot/Celluar-Automata/issues/70)中大小不超过 16*16，周期为 4，速度为 c/4 的 [glide symmetric](http://www.conwaylife.com/wiki/Glide_symmetric#Glide_symmetric_spaceship) 的对角方向的飞船：

__代码__：

```Mathematica
LifeFind[16, 16, 4, 1, 1, "Rule" -> "B02-ak3ai/S1", 
 "OtherConditions" -> 
  Array[C[##, 1] \[Equivalent] C[#2 + 1, #1, 3] &, {16, 16}, 1, And]]
```

__搜索时间__：2.79788 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B02-ak3ai/S1
2$8bo$5bob2o$3b5ob2o$3b6o$3b9o$3b9o$3b9o$2bo2b7o$5b7o$4bo2b2o2bo!
{% endlifeviewer %}

### 19

搜索未知的规则中大小不超过 5*5，周期为 6，速度为 (2,1)c/6 的[马行船](http://www.conwaylife.com/wiki/Knightship)：

__代码__：

```Mathematica
LifeFind[5, 5, 6, 2, 1, "Rule" -> ""]
```

__搜索时间__：9.79478 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B2ceik3ckn4knqr5akq7c/S1e2cek3aeijq4jz5jkq6c
2o$2b2o$3bo$obo!
{% endlifeviewer %}

### 20

搜索未知的 [totalistic 六边形规则](http://www.conwaylife.com/wiki/Hexagonal_neighbourhood)中大小不超过 8*8，周期为 3，速度为 c/3 的对角方向的飞船：

__代码__：

```Mathematica
LifeFind[8, 8, 3, 1, 1, "Rule" -> "", "Hexagonal" -> True, 
 "Totalistic" -> True, "Changing" -> True]
```

__搜索时间__：2.15809 秒

__搜索结果__：

{% lifeviewer %}
x = 8, y = 8, rule = B245/S356H
bo$3o$b2ob2o$3bob2o$2bob4o$2b5o$3b3o$4bo!
{% endlifeviewer %}

### 21

搜索一个规则，使得生命游戏中的滑翔机在这个规则中是一个周期 7 速度为 (3,1)c/7 的[骆行船](http://www.conwaylife.com/wiki/Oblique_spaceship)：

__代码__：

```Mathematica
LifeFind[17, 17, 7, 3, 1, "Rule" -> "", "Changing" -> True, 
 "KnownCells" -> {ArrayPad[{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}}, 7]}]
```

__搜索时间__：130.006 秒

__搜索结果__：

{% lifeviewer %}
x = 17, y = 17, rule = B2ek3aein4aikr5cnr/S1e2ei3aeijknr4k5ckn6a
7$8bo$9bo$7b3o!
{% endlifeviewer %}

### 22

搜索未知的规则中在第一回合的大小不超过 3*3，周期为 7，速度为 2c/7 的对角方向的飞船，使得生命游戏中的滑翔机在这个规则中也成立：

__代码__：

```Mathematica
LifeFind[11, 11, 7, 2, 2, "Rule" -> "", "Changing" -> True, 
 "KnownCells" -> {ArrayPad[Table[_, 3, 3], 4]}, 
 "KnownRules" -> 
  PatternRules@CA[{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}}, 4]]
```

__搜索时间__：53.9408 秒

__搜索结果__：

{% lifeviewer %}
x = 11, y = 11, rule = B3aijnr4kq7c8/S02aen3ajknr4ijrw5air6akn7c
4$5b2o$4bobo$4b3o!
{% endlifeviewer %}

## 其它

### 23

搜索生命游戏中大小为 5*5 的周期 4 的琼脂：

__代码__：

```Mathematica
LifeFind[5, 5, 4, "Agar" -> True, "Changing" -> {1, 3}]
```

__搜索时间__：5.48619 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B3/S23:T5,5
b3o$4bo$3bo$2o2bo!
{% endlifeviewer %}

### 24

搜索[刘看山](https://www.zhihu.com/people/liu-kan-shan-78/activities)的[父母](http://www.conwaylife.com/wiki/Parent)：

也可以用包里的 `Predecessor` 函数。

__代码__：

```Mathematica
LifeFind[100, 100, 2, "Periodic" -> False, 
 "KnownCells" -> {{}, 
   ImageData[
    1 - Binarize[
      ImageResize[Import@"https://pic4.zhimg.com/da8e974dc_xl.jpg", 
       100], 0.8], "Bit"]}]
```

__搜索时间__：125.216 秒

__搜索结果__：

{% lifeviewer %}
x = 100, y = 100, rule = B3/S23
9bobob2o5bob2ob2ob2obo3bo10bo4bo5bo2bo5bo3b2ob2o4bo5bo6bob2obo$2bob2o
2bo3b5o4b10o9bobo3bo2bo3bobo2bo3bobo2bo15bo5bo3b4o$o2b8obobo3b3obobo2b
4obo4bobo5b3o2b3o3b6o3b12obo3bo6bo2b5obo$4b5o3b2obob4ob2ob2ob4o2b2o2b
4o2bobob3ob4ob2ob3ob3obob4ob3o2b4o2bob5o2bo2bo$o3bobo5b7ob2ob2ob2ob2ob
7ob6ob4ob3ob3ob10o3bob2o5bobo2b4ob5o$2bob3o3bobo3b3obobob5ob2obo3bo2b
3o2bob2obo2bobobo2bo2b2o2b2o2bob2obo5b5o3b8o$obob4o3bobo3bob3ob2ob3obo
2b2ob3o2b6ob10o2b3obo2b2o3bob3obo2b3obobo3b2o2b3o$b4ob6o3bo2b16ob4ob2o
2b8obo2b2ob2ob3ob3obob2obobo2bob3o4bo5b4o$2bobobo2b2obo6bo2b2ob4o2b2ob
2obo2b4o5bo3b2ob4obob6o3b3obob4ob2ob3o5b2ob2o$2bob3o7bo3bo3bob3o4b2ob
2obo2b2ob2obo2bo3b2o2b2o2b5o3b3obo2b2ob2obo2b3ob3obob3o$4b4o8bo4b2o2b
2o5b2o2b3ob2ob2obo7b6ob3o2b5ob2ob6ob2o2bob10obo$2bob6o7b7o2bobo2b2o2bo
bob2obob4o4bo2bob3o2bo2b2ob2ob5o2bob3ob8obo2b2obo$4b2obo3b2ob6ob2ob3ob
o2b2o4b5obo2b4o2bob7o2bob3obobo2b2o2b6obo3b4o2b2o$2bobob3ob6obobob3obo
b4ob6o4b2o4b8ob2ob6obob3o4b5ob4ob4obob3o$o2bob7ob3obob2o3b3ob3ob3ob3o
2bob2o3b2ob6o4b2ob5ob2obob6ob4o3b2ob5ob2o$b2ob2obobob8obob4o3b2obo4b2o
4b2o2b2o4bo2b3ob2obobobo2bo2bob2o3bobob2o5b2o3bo$2ob2o2bobob2o5b3o3b2o
3b11o2bob6ob4ob7obob6o4b2ob9o3bo3b2ob2o$3o2b6o4bob3ob2o2bob2o4b3o2bobo
4bo2b7ob2o4b4o2bo2b4ob2ob3o3bo3bob6o$bobob2o2b4o2bob3ob3ob5ob2o3b2o7bo
b3o4b4obo3b3obobobob3o2b3o2bobo4b6o2b2o$bo3bo2b3o3b4o2b2ob2obo2b10obo
2b4ob3obob2obobo3b2ob8o2b6obo5b2obob2o$6ob2ob3ob9ob3o3b4ob2ob2o5bobob
2obob2ob4ob3obo2b5obob5o3bo3b2obobo$5ob2o2bo3b3obob4o2b4obo4b4obo3b3o
2b4o2b2ob2ob2ob3o5bo5b3o5b2ob5o2bo$bob2ob5o3b6o2b6ob2o5b2o2bo2b2ob3obo
2b6obobob2ob3obob4ob4ob6o2bo2b2o3bo$bo2bob2o2b2ob8o3b2o2bobobo2b3ob7ob
3obobo2b2obobobo2b2o4b2ob4ob5ob3o2bob3obobo$3bobob2o2b5ob4ob2obobobobo
3b6ob2ob2ob2o3b2o4b7obob2ob4ob2o6b2o2b5obobo$5b3ob5ob2o2b5ob10ob12o2bo
2b3ob3ob2o2b3o4bo2bob12ob3ob2o3bo$5b2ob2o2b2o2bo5bob3o2b3ob3ob2o2bobo
2bo2b4ob2ob3ob3obob3obob4o3b5o2b2o2b8o$2o4b3o3b2ob5o3b5obob5o5b2ob4ob
6o3bo3b2ob9o2b2o9b2o2bobo3b3o$3bo2b2o2bob5ob5o2bob4o3b2o4b3ob11obo2b2o
b2ob4ob5ob2o4bo5bob2ob2ob4o$7bo3b3o3bo2bob2ob5o2bob4o2b5obo4b3o2b3o3b
2o2b2o2b2ob2o2bobobo2bobob2ob6obo$6bob3o2b5o2b2ob3ob3o4bob4o2bob2o3bob
obobo2b2ob2o2bobo2b4o2b2o2b4o3b2ob4ob2obo$ob2o4b4ob3ob2ob4o2b2o2b5o2b
2ob2o2bo3bo2b3o3b2obob5ob2obob4ob3ob4obob2obobobo$b8obob3ob3o2b10ob4o
2b4obob6obobob2o5b2ob4obob5ob2ob2o3b2o2bob3obo$2bob6o2bo3b4o4bo3b3o2bo
b4o3b3ob2ob4o3b2o3bo3bobobo3bobob5o2b6ob3obo$obobobo2b2ob4o3b4o2b4o2b
2ob2ob2o2bobo4b6o3b2o6b3ob2o2b2ob2o3bo2b3ob8obo$b5o4b6o2b6ob6ob2o2b4o
4b3ob5obob3o3b2ob2ob7o2b2o2b2ob12o2bo$2b3o3bobobob3ob2ob2obobob3o2bobo
b7ob3ob2ob2o2b2ob2o4b4obo2b9obo7b5o$ob2obo4b6obobo3bobo2bobob2o5bob2ob
5o3b2o2bo2b3obo2bo2b3obo2bob2ob2ob2o2bo5b2obo$2b2o4bob4o3b2o2b5ob3ob2o
bo5b3o2bob2o3bo2b2obo2b2o2bo2bob3ob3o8bob3obo3b2o$bob2o4b5o3b3o3b2ob3o
2bo6bob2obo2b3ob3obob4ob3o7bo7bo2bo3bobob3ob2o3bo$4b3o3bo2b2obob2obo2b
3o3b4o2bo2b2o6b5obo2b10ob2o4b2o4bo4bo2bo2bo4bo$bobob6obob3ob3o2bo3b5o
8bo4bo2bo5bobob4ob14ob2ob2o3b2o3bo2bo3bo$5b6o3bobobob3ob2ob2ob4o2bo2b
2obobo3bo3bo3b2o3b3obo4b3obo3bo2b2obo5bob2obo$bobob6o2b3o2b2o2b2o3b2ob
2o3bo3b2o2b3o2bo2bo4b2obob3o2b5ob3o5b2o2bo4b5o2bo2bo$5bo3b2obobobob2ob
3o2bob2o10bo5b9ob3o2b2o2b3obo2b4obo3bob2o5b2o2bo3bo$o3b7o3b3ob2ob5o3bo
4bo2b3o2b2ob2o2bo2b4o3b4ob2o3b2o2b3o2bo6bo2bo4b2o2b3o$4b11o3bo2b4obob
2ob2o2b2obob6ob5o2bo2b5ob3o3b5o2bobob2o2bobo2b2o2b2o2b3o$bob3o2bo2b2o
2bob3ob3o4b2ob2o2b4ob2o4b3obob2ob5o2b4obob2o2b2o3b2o2b2o3b2o2bo3bob2o$
2b2obo2b2obobobob3o2bobobo5b4ob2o2b2o2b2o3b2ob3o3bobo4bo2bob2ob3o6bo2b
obo8b3o$b2o2b4ob2o3bob6o9bo2bo2bo2b2o2b4ob4ob5o3bobob5ob2ob2o2bo4b3o3b
ob2o2b3o$b5ob2ob2o2bob2obob2o4bob2ob8ob4o2b10obobo3b4o2b5o2bo3bob2o2bo
2bo2bo2b3o$2bo2bob4o6bob3o6b5obobobob2o2b3o6bo2bob7obobo3bob3obo2bo3bo
bobo2bo2b3obo$o2bob2o3b2o3bob5obo3b6o2b2obobo7bobob4obob3obo2bo5b5obo
2bo5bobo3b2obo$5b4ob2o2bob3ob2o3b8o3b5o2b2obo4b2obobobobo2b2o3bo2b3o3b
2obo2bo6bob2ob2o$bo3bob4o6bo4b5ob4o3b6ob2o2bo5b2o2b8ob3o2bob3o2bo2bo4b
obo2bob2ob2obo$2bob2o2bobobo2bo2b3ob2ob2o4b6ob3obo5b2o2b2ob2obob5ob2ob
6o2bo4bo4b2o3bo3b2o$b3ob3o2b2o3b7o2bobo3bobobob6o3bob5o2bob5o3b6o5b2o
2bobo2b2obo3b2o3bo$ob3ob6obo3b5ob2ob2o5b6o3b2ob3obob4o2b2ob3ob5o2b2o2b
2o2bobo2b2o2bo2b3ob3o$4bob2o2bo2bo5b2o2b10o2b2o3b6o2b2obo2b5o2b3ob4o7b
obo4bo6b2ob2ob4o$ob2ob2o4bo3bo5b2obo4b3ob4ob6o2bo2b2obob2ob2obo2b15o3b
o6bob4obobo$b3ob2obo5bo2bo3b2ob2o2bob4ob2o3b2o2b4ob6obobo3bobo3b2ob6o
3bobobo3bob3o2b5o$2bo3bobo5b2obo2b2o2b2o5bob4o3bo2bob2ob2ob5ob7o2b2o3b
obobobo7bob6o2b3o$bob2ob5obobob6obob6obob2o3b2o6b2ob5ob2ob2obob5ob5o4b
2obob4obo3b2o$3b6o5bo2bo2b2o4b10o3b3o5b2ob3obobob17ob2o5b3o2bobo2b5o$
2bobob3o5bo2bo2b2obobo5b2obo3b3obobo3bobobob2ob4o2b4o3bobo2b2o7b9o3b4o
$4bob2o3b2obob4o2bo4b2obob3o2bob2o5bob2ob2ob3o8bo3b3o6bo5bo2b3ob3o3bo$
3b3ob8ob3ob2ob9obob4ob6o2b2ob2ob3obo4b8o2b2ob2o4bob3obob4o2bo$b4obobob
o4b4ob5obobob5obobob3ob2ob5obob2o2bobo3b3o5b5obo2bob5o2bob2o$3bob2o2b
2obo3b2obo6b2ob3ob3obob3obo2b5o2b3ob4o10b3obobo3b3obob3obob3o$ob2o2b5o
3b2o2b2ob2o3b3obob2ob3ob4obob2ob2ob2ob5o4bobob7ob6o2bo3b2o4b4obo$b3ob
4obobobob4o4b3o2bob2ob4obo3b3o2b2o2b3ob4obo2bobob2ob2obob5o3b3ob2obob
2ob3o$2b3obo2b3o2bob4o6bo2b2o2bob3ob2o2bo2b6o2b3ob3o9b3ob2o2b2o2bob6ob
ob7o$bob3obo2bo3b4o2b2o2b5ob6obob8obo2b4ob2o2bobo4b2o2bob2o2bo2b2o2bob
o3b4o3b3o$5bo4bobo4bob7obob4o2b3obobo2b4o2bo2bob2o2b2o4b4obo2b6ob2ob2o
bobob2o2b3obo$bob3o6bo3bobob3o2b2obo2b2obobob3o2bob2o5bo2b3ob9o5b2o2bo
b2o2b2o3bobo2b4obo$o4b2o3bo3bo3b5o3bob2o3b8ob5o8bob2o2bob5o2bo3b4obo2b
obobo3b4ob2o$5bobo2bobo5b5obob4ob3o2bo2bo2b2ob2obo2bo2b2ob2obo2bob5o2b
ob5ob5obobob8o$bob3o6bo4b6o2b3o2b3o4bo2bob3obo2bo4b2o2bo4b2ob2o5bo3b4o
b2ob3o2b5ob4o$2b3obo3bo3bo2b3obo2b2ob2obobo9b2ob2ob6o2b2ob4ob2o3bo2b2o
bo3bo2b2ob2o3b2obobobo$obobo4bo3bo2b2obobob3o2b2ob3o3bo4bob6ob3ob2obob
2ob5ob5o6b2ob3ob3ob4ob2o$bobob6o2bob5o3b2o2bo2b4o2bo3b4o2bob3o3bobob2o
bobobo3bo2b2o2bobob4o2b4ob7obo$3ob2ob2ob4ob5o3b2o4b2ob3o7b4ob2o2b5ob2o
b4o2b3o2bobobo4b2obobob4ob3ob3o$3o2b3ob2o4b3o2b2obo3bob2ob3obo8b2o2bob
5o2bob2ob3ob2o4b7o2b2o3bo3b5obo$b2obo3b2o4b2obo2b4o3bo2bo2b3o6b2ob6o3b
3ob4ob3obo2bo2b2ob3obob2o2b2obob2o3bobo$b6o2b5ob5ob3ob7obobobob2o4b2ob
ob4ob4o3bobob2o2bo3b2o3b10o2bo3b2o$2b3o4b2obo3bo2b2obob4o2bobob2o2b4ob
2o3b3ob2ob3o3b2o2b4o5b2obob2o2bobobob4o2b2obo$2b2o6bo5b6o2b2o2b2o2b2ob
2obobob3o3b6o2b2o3b2o3b3o2bo3bo2b2o3b2o2b3ob4obobo$obo2bo4b2ob2ob7o2b
8o2b7o2b2ob2o5bobo5bobobobo6b2obo2bob2ob7ob6o$b2o4bob2obo3bo2bob3ob3ob
2o2bobo2bob2ob3ob3ob5obo2bob2o2b3o4b3ob2o3b2obob4o3b2o2b2o$4o4b3o2b5ob
o2b4obob8o2b2obob4ob7o3bo2b3ob2obob5o2b2o3bob4o3b4ob2o$2ob3o3bo3b5o3bo
2bob6o2b2ob2obob7obo4b7obob2o3b3ob2o2b2o2bob2o8bobob2o$bob9o2bobob6o2b
11ob2ob5o3b2ob3obob9o3b4ob3ob5o2bo3bo4b5o$ob3ob4obo2b2ob2ob4ob2o4b2obo
2b3ob5obo2b4ob2obobo2bo2bobo2b2obo2b3o2bobo4bo2bo3bobo$2b3o4bo2bob3o2b
2ob4obobobobob2o2bob3obo2b2obob2ob2ob4ob3obo2b5o2b2obob9o2bobob2o$b2o
2bob3o2bo2bobob2o4bo4b2ob4ob4ob2obob3o2bob3obob3ob2o3b3obob3ob3obob7ob
o3b2o$b9obob6obob2ob6obob2ob2o2bob2o3b2ob3ob6obobobo2bobo2b8o3b5obob6o
$2bo2bo2bo3b5ob2ob4ob2ob5ob2obob2o2b9ob2o3bo2b2ob5obob3o6b3o5bo2bobob
3o$bo2bo3bo2bo7bob5o2b4o2b2obobob5ob4o3bobo3bob2ob3o5b3obo2b7o2bob3o2b
ob2o$7b4obob2ob6o3bo2bo3bo2b4o2b2o7b4o4b10o3bobo2bo4bobo6b8o$bo4bob2o
9b2o3bo4bo5bob2obo4b2obobob2obo2bob2ob2ob2ob2o4bo6bobo5bob2o2b2obo!
{% endlifeviewer %}
