---
title: 用 Mathematica 搜索生命游戏中的静物（三）
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
abbrlink: 18a3d91c
date: 2019-03-04 16:44:00
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
$Pre = Function[x, SeedRandom[0]; 
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

__搜索时间__：0.737029 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
7bo$5b5o3b2o$2o2bo5bo3bo$2o3bobo2bo2bo$6b5obo$3bo7bo$obobo3b2o2b3o$2ob
obo2bob2o3bo$3bob3o4bobo$2ob2o7bob2o$obo3b2o3b2o$3b3o2bobo3b2o$5bob2ob
4obo$7bo5bo$ob2o3bob2o3bo$2obo4bobo2b2o!
{% endlifeviewer %}

### 2

搜索 B2c3-ij4ai5iy6c/S2-kn3-enq4cint 规则中大小不超过 20*20 的 [C4 对称](http://www.conwaylife.com/wiki/Symmetry#C4)的静物：

__代码__：

```Mathematica
LifeFind[20, 20, "Rule" -> "B2c3-ij4ai5iy6c/S2-kn3-enq4cint", 
 "Symmetry" -> "C4"]
```

__搜索时间__：1.0303 秒

__搜索结果__：

{% lifeviewer %}
x = 20, y = 20, rule = B2c3-ij4ai5iy6c/S2-kn3-enq4cint
3bo7b2o2b4o$3obo2b2o2bo3bo2bo$o2bobo2bo2bobobo2bo$o3bob3o2bob3obobo$4o
bo5bo4bobo$3bo7bo3bobo$2b2o4bo2bo4bo$o6bob2obo3bobo$7obo2bobo2b3o$7bo
4bo$7bo4bo$b3o2bobo2bob7o$bobo3bob2obo6bo$3bo4bo2bo4b2o$2bobo3bo7bo$bo
bo4bo5bob4o$obob3obo2b3obo3bo$bo2bobobo2bo2bobo2bo$bo2bo3bo2b2o2bob3o$
b4o2b2o7bo!
{% endlifeviewer %}

### 3

搜索生命游戏中在半径为 29 的圆形内的 [D8 对称](http://www.conwaylife.com/wiki/Symmetry#D8)的静物：

__代码__：

```Mathematica
LifeFind[59, 59, "Symmetry" -> "D8", 
 "KnownCells" -> {DiskMatrix[29] _}]
```

__搜索时间__：9.23196 秒

__搜索结果__：

{% lifeviewer %}
x = 59, y = 59, rule = B3/S23
26b2obob2o$25bo2b3o2bo$18bobo5bo5bo5bobo$18b2obobo3b2ob2o3bobob2o$21b
2obo3bobo3bob2o$14b2o2b2o4bo3bobo3bo4b2o2b2o$11b2o2b4ob2obob2obobob2ob
ob2ob4o2b2o$10bob2o7b2obo2bobobo2bob2o7b2obo$9bo7b3o4bo2bobobo2bo4b3o
7bo$8bo7bo2b2ob2ob2o2bo2b2ob2ob2o2bo7bo$7bo6b3o6bo2bobobobo2bo6b3o6bo$
6bo6bo3b4obo2bo2bobo2bo2bob4o3bo6bo$6b2o5bo2bo2bo3b2ob3ob3ob2o3bo2bo2b
o5b2o$7bo3b3obobo3b2o2bo7bo2b2o3bobob3o3bo$5bo4bo4b2ob3o2bobob5obobo2b
3ob2o4bo4bo$5b2o3bo2b2o3bo2bobo2bo5bo2bobo2bo3b2o2bo3b2o$6bo2b2obobo3b
o2bob2obob3obob2obo2bo3bobob2o2bo$6bobo2bobo5b3o2bo2bo3bo2bo2b3o5bobo
2bobo$2b2ob2obo2bo2b3o5bobo3bobo3bobo5b3o2bo2bob2ob2o$3bobo2b2ob2obo2b
o3bobo3b2ob2o3bobo3bo2bob2ob2o2bobo$2bo3bo2bobo2bo2bo3bobobo3bo3bobobo
3bo2bo2bobo2bo3bo$3b2ob2o5bob3ob3o2bob2o3b2obo2b3ob3obo5b2ob2o$4bo2bob
obobo4bo3bobobo5bobobo3bo4bobobobo2bo$3bo2bo2b2obob3o2b2o2bo4bobo4bo2b
2o2b3obob2o2bo2bo$4b2ob2o3bo3b3o2b2o4b2ob2o4b2o2b3o3bo3b2ob2o$bo4bo2bo
bob2o5bo17bo5b2obobo2bo4bo$obo3bo2b2obo2b2o4b2o4b2ob2o4b2o4b2o2bob2o2b
o3bobo$o2bo3b2o3bobo2bobobo2bobobobobobo2bobobo2bobo3b2o3bo2bo$bob4o3b
3obobob2o3b2ob2o3b2ob2o3b2obobob3o3b4obo$2o5b3o4bobo3bo17bo3bobo4b3o5b
2o$bob4o3b3obobob2o3b2ob2o3b2ob2o3b2obobob3o3b4obo$o2bo3b2o3bobo2bobob
o2bobobobobobo2bobobo2bobo3b2o3bo2bo$obo3bo2b2obo2b2o4b2o4b2ob2o4b2o4b
2o2bob2o2bo3bobo$bo4bo2bobob2o5bo17bo5b2obobo2bo4bo$4b2ob2o3bo3b3o2b2o
4b2ob2o4b2o2b3o3bo3b2ob2o$3bo2bo2b2obob3o2b2o2bo4bobo4bo2b2o2b3obob2o
2bo2bo$4bo2bobobobo4bo3bobobo5bobobo3bo4bobobobo2bo$3b2ob2o5bob3ob3o2b
ob2o3b2obo2b3ob3obo5b2ob2o$2bo3bo2bobo2bo2bo3bobobo3bo3bobobo3bo2bo2bo
bo2bo3bo$3bobo2b2ob2obo2bo3bobo3b2ob2o3bobo3bo2bob2ob2o2bobo$2b2ob2obo
2bo2b3o5bobo3bobo3bobo5b3o2bo2bob2ob2o$6bobo2bobo5b3o2bo2bo3bo2bo2b3o
5bobo2bobo$6bo2b2obobo3bo2bob2obob3obob2obo2bo3bobob2o2bo$5b2o3bo2b2o
3bo2bobo2bo5bo2bobo2bo3b2o2bo3b2o$5bo4bo4b2ob3o2bobob5obobo2b3ob2o4bo
4bo$7bo3b3obobo3b2o2bo7bo2b2o3bobob3o3bo$6b2o5bo2bo2bo3b2ob3ob3ob2o3bo
2bo2bo5b2o$6bo6bo3b4obo2bo2bobo2bo2bob4o3bo6bo$7bo6b3o6bo2bobobobo2bo
6b3o6bo$8bo7bo2b2ob2ob2o2bo2b2ob2ob2o2bo7bo$9bo7b3o4bo2bobobo2bo4b3o7b
o$10bob2o7b2obo2bobobo2bob2o7b2obo$11b2o2b4ob2obob2obobob2obob2ob4o2b
2o$14b2o2b2o4bo3bobo3bo4b2o2b2o$21b2obo3bobo3bob2o$18b2obobo3b2ob2o3bo
bob2o$18bobo5bo5bo5bobo$25bo2b3o2bo$26b2obob2o!
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

__搜索时间__：2.01369 秒

__搜索结果__：

{% lifeviewer %}
x = 10, y = 10, rule = B3/S23
bo$2bo2b2o$3o3bo$6bob2o$3b2obob2o$4bobo$2bobobob2o$bobo2bo2bo$bobobobo
$2b2ob2o!
{% endlifeviewer %}

## 振荡子

### 5

搜索生命游戏中大小不超过 16*16 的周期为 3 的振荡子：

__代码__：

```Mathematica
LifeFind[16, 16, 3]
```

__搜索时间__：312.22 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
3b2o3bobo$2bo2bo2b2obo$2bo6bo4b2o$2o3b2o2b3obobo$bobo6bo2b2o$o2b2o3b2o
2b2o$3o3bo3bo2bo$3b2obo4b2o$2obo2b2obobo$o3b2o2bobo2bo$b3o3bo2bob2o$4b
2o2b3o$b2o8b3o$bo4bo2b2o3bo$3bo2bobo2bobo$2b2o3bo2b2ob2o!
{% endlifeviewer %}

### 6

搜索生命游戏中大小不超过 8*8 的周期为 5 的 [D8 对称](http://www.conwaylife.com/wiki/Symmetry#D8)的振荡子：

通过设置 `"Changing" -> True` 来避免搜到静物。这里搜到的是 [Octagon 2](http://www.conwaylife.com/wiki/Octagon_2)。

__代码__：

```Mathematica
LifeFind[8, 8, 5, "Symmetry" -> "D8", "Changing" -> True]
```

__搜索时间__：0.967876 秒

__搜索结果__：

{% lifeviewer %}
x = 8, y = 8, rule = B3/S23
2bo2bo$2bo2bo$2ob2ob2o$2bo2bo$2bo2bo$2ob2ob2o$2bo2bo$2bo2bo!
{% endlifeviewer %}

### 7

搜索生命游戏中大小不超过 6*6 的周期为 4 的振荡子：

通过设置 `"Changing" -> {1, 3}` 来避免搜到静物或者周期 2 的振荡子。这里搜到的是 [Mold](http://www.conwaylife.com/wiki/Mold)。

__代码__：

```Mathematica
LifeFind[6, 6, 4, "Changing" -> {1, 3}]
```

__搜索时间__：1.39685 秒

__搜索结果__：

{% lifeviewer %}
x = 6, y = 6, rule = B3/S23
bo$ob2o$4bo$o2bobo$2bo2bo$3b2o!
{% endlifeviewer %}

### 8

搜索生命游戏中大小不超过 16*16 的周期为 2 的[凤凰](http://www.conwaylife.com/wiki/Phoenix)：

__代码__：

```Mathematica
LifeFind[16, 16, 2, 
 "OtherConditions" -> 
  Array[! C[##, 1] || ! C[##, 2] &, {16, 16}, 1, And]]
```

__搜索时间__：2.45976 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
5bo$5bobo$3bo5bo$9bobo$2b2o$12b2o$4bobo$6bo6bo$8bo$14b2o$8b2o$14bo$10b
obo$12bo!
{% endlifeviewer %}

### 9

搜索{% post_link Wolfram-Alpha-计算时显示的元胞自动机（一） 3457/357/5 %} 规则中大小不超过 7*7 的周期为 5 的振荡子：

__代码__：

```Mathematica
LifeFind[7, 7, 5, "Rule" -> "3457/357/5", "Changing" -> True]
```

__搜索时间__：7.60117 秒

__搜索结果__：

{% lifeviewer %}
x = 7, y = 7, rule = 3457/357/5
2.A$C2AB$D2AC$2.A.DC$3.B2AB$3.C3A$4.D!
{% endlifeviewer %}

### 10

搜索未知的规则中大小不超过 5*5 的周期为 11 的振荡子：

__代码__：

```Mathematica
LifeFind[5, 5, 11, "Rule" -> "", "Changing" -> True]
```

__搜索时间__：11.9036 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B4j5ceiry6cik7ce/S2ik3ceijnq4aiknt5aeik6ak7ce
b2o$4o$o3bo$5o$bobo!
{% endlifeviewer %}

### 11

搜索未知的有 3 种状态的 [Generations 规则](http://www.conwaylife.com/wiki/Generations)中大小不超过 5*5 的周期为 11 的振荡子：

__代码__：

```Mathematica
LifeFind[5, 5, 11, "Rule" -> "", "Generations" -> 3, 
 "Changing" -> True]
```

__搜索时间__：12.6993 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = 2cen3ciq4cinwyz5acer/3e4e6e/3
2.A$2A.A$A3.A$2ABA$2.A!
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

__搜索时间__：15.7658 秒

__搜索结果__：

{% lifeviewer %}
x = 11, y = 5, rule = B2cek3nr4ckt5acejq/S01e2e3ceik4aijnrw5nq6k
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

__搜索时间__：1.08588 秒

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

__搜索时间__：73.9559 秒

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

__搜索时间__：12.2288 秒

__搜索结果__：

{% lifeviewer %}
x = 21, y = 21, rule = B3/S23
4$5b2ob3o$5b6o4b3o$5bo5b2ob4o$bobob3o3bobo4b2o$2bo3bo6b2o3b2o$2b2o3b2o
b2o2bo3bo$3b2o2b3o2bo$7bo4bo4bo$4bo2bo8b2o$3b2obo5b3o$3b2ob5o3b2o$3b2o
4b5ob2o$4bo3bo7bo$4bo2bo4bo2bo$5b3o5b3o!
{% endlifeviewer %}

### 16

搜索 [B2-ak3ain/S1 规则](http://www.conwaylife.com/forums/viewtopic.php?f=11&t=3761)中大小不超过 10*10，周期为 5，速度为 c/5 的 D2 对称的对角方向的飞船：

__代码__：

```Mathematica
LifeFind[10, 10, 5, 1, 1, "Rule" -> "B2-ak3ain/S1", 
 "Symmetry" -> "D2\\"]
```

__搜索时间__：0.716357 秒

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

__搜索时间__：1.80908 秒

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

__搜索时间__：2.06594 秒

__搜索结果__：

{% lifeviewer %}
x = 16, y = 16, rule = B02-ak3ai/S1
2$2b3obo$2b4o$b5obo$bob3o$bob3o$2b2o3b3o$3bobob3o$6bo2bo!
{% endlifeviewer %}

### 19

搜索未知的规则中大小不超过 5*5，周期为 6，速度为 (2,1)c/6 的[马行船](http://www.conwaylife.com/wiki/Knightship)：

__代码__：

```Mathematica
LifeFind[5, 5, 6, 2, 1, "Rule" -> ""]
```

__搜索时间__：3.93996 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B2ek3acikn4jkq5j8/S02acek3n4inrwy5aij6n
bo$2b3o$4o$3o!
{% endlifeviewer %}

### 20

搜索未知的 [totalistic 六边形规则](http://www.conwaylife.com/wiki/Hexagonal_neighbourhood)中大小不超过 8*8，周期为 3，速度为 c/3 的对角方向的飞船：

__代码__：

```Mathematica
LifeFind[8, 8, 3, 1, 1, "Rule" -> "", "Hexagonal" -> True, 
 "Totalistic" -> True, "Changing" -> True]
```

__搜索时间__：1.13951 秒

__搜索结果__：

{% lifeviewer %}
x = 8, y = 8, rule = B245/S356H
$b2obobo$b3obo$2b5o$bobob2o$2b3o$bob2o!
{% endlifeviewer %}

### 21

搜索一个规则，使得生命游戏中的滑翔机在这个规则中是一个周期 7 速度为 (3,1)c/7 的[骆行船](http://www.conwaylife.com/wiki/Oblique_spaceship)：

__代码__：

```Mathematica
LifeFind[17, 17, 7, 3, 1, "Rule" -> "", "Changing" -> True, 
 "KnownCells" -> {ArrayPad[{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}}, 7]}]
```

__搜索时间__：42.7168 秒

__搜索结果__：

{% lifeviewer %}
x = 17, y = 17, rule = B2ce3iny4kt5in/S1ce2ei3jn4ai
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

__搜索时间__：18.0479 秒

__搜索结果__：

{% lifeviewer %}
x = 11, y = 11, rule = B3aeijnry4kq6c8/S02aen3ajnr4ir5ajry6k7ce
4$6bo$5b2o$4b3o!
{% endlifeviewer %}

## 其它

### 23

搜索生命游戏中大小为 5*5 的周期 4 的琼脂：

__代码__：

```Mathematica
LifeFind[5, 5, 4, "Agar" -> True, "Changing" -> {1, 3}]
```

__搜索时间__：25.1042 秒

__搜索结果__：

{% lifeviewer %}
x = 5, y = 5, rule = B3/S23:T5,5
o$b2o$2o$o3bo$bo!
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

__搜索时间__：71.539 秒

__搜索结果__：

{% lifeviewer %}
x = 100, y = 100, rule = B3/S23
o4bo9bo2bo2bob2ob2ob2obobob2ob2obobo3b2o4bobo4bo2b2o2bob2o2b2o3bo7bo2b
o2bo4bo$2bo3bo2bo3bo4bo3b10o3b7o4b6o2bobo2bo2bo6b9o3b2obobo3bo4b2o$obo
7bo2bobo5b2obobobo2b3obo5b8ob8o2b10o2bob10o5b9o$b3obo6b3o5bobo2b11ob2o
2b6o2bo3bo2b4obo2b4o2b2o6b2ob2ob6o2b4ob3o$5o3b4obo3bo4b4ob3o2bob2o4b2o
bobo3b2o3b3obob2ob3o2b3ob3ob5ob4ob2obob2ob3o$10ob2obo3bo2bob2ob2ob7ob
3obobobobob2o2b5ob3ob2ob3o2b14o2bo4b2ob2o$b3o2b3o2b2o4b6obob3o2bo2bob
6o5bo2bobobob2o2b2ob4o2bob6obo3b2o2b3obo2b4obo$3o3b2o2b8ob2ob2obo3b2ob
2o2b2ob3obobo3b2o4b4ob3o3b7ob2ob2ob6ob3o3bo2bobo$2o2bob3ob2obob3ob3ob
2obobob2ob2o2b5o4b5o2b3o2b3ob2o3bo2bob6ob6obob2obob2ob4o$b2obo2b3o3b3o
2bob2ob7obobob3obob5ob9o2bobob2o2bo2bo3b2o2b5obob2o3bo2b7o$b2o3b4ob3ob
obob2ob2o2bobobobob3ob4ob3ob2obobob7obo10b2o2bo2b5ob5obobobobo$2b4obo
2b4ob4obob3obobob3obob2o2b2o2b9o3b3ob4o6bo3b3ob2o3bo2b5o4bo2b2o$2b2ob
8obobo2b2o2b2o5b2ob2obo2bobobob2ob2o2b4o3b5o3bo6b2ob2ob3ob2obobob4ob4o
$4obo2b2ob2ob6ob2obo4bo3b2ob5ob6o2b2o2b2obo2b3o5bo3bob4ob6ob2o2bob7o$
2bob2ob2o2bob2ob2o2b6obo3b3o2b3obo2bo3bob2obo2bobob4o2bo6bo2bo2bo2b4ob
2ob2o8bo$2bo2b2ob6o2b2ob3obob2o6b2obo3b4o2b14obo6bo2b3o2b3o6b2o2b2o3bo
2bo$4bob5o2b2o2b2ob6o3b5ob2o3b3ob3o6b4ob4obo4bo2b5ob3o3bob2o2b3o3bo$bo
4bo6bob4o2bo2b8o2b3obobo2b2o2bo2bo4b3o2b2o2bob5obo2b2ob2o4b2o4b2o6bo$
3bo2b3o3b6o2bo6b4o3b4o2b4obo3bo7bob2o2b5o2b3o2b3o2b2o3bo2bob3obo3bo$o
4b2o3b5o2bo5bob6obobo3b2ob6o5b2o3b3o2b3ob2ob3ob4o2b7obo2b3obo$o2bob2o
5b2ob4o8bob2obob2obob3ob4o8bob2ob3o3b2ob2o2b7o2bobob4o3b3o3bo$5bo6b3ob
ob3o3b2ob2ob9obob2o2b3ob4obob2ob2o4b2o2bo2b2o3bo3bob6obo2bobobo$o4b2o
6b10o4b3obo2b2o2b2ob5ob12o2bo2b2obo2b2ob3o3bo4b2ob4o3bo$4b3o2bobo4bob
2ob4ob4o2bo2b6o4b5o2bobo4b12ob4o6bob14o$4b4o7b4obo2b3obobo5b3obobobo2b
obo4b2o2bob3o2b6o2b3o3bo3bobo2b3obobob5o$2o3bob2o3bo2b4ob2obob4ob7o2b
4o3bob5ob2o2bo2bobo2b2obo2bobobo7b7obo3b2o$4b2ob2o2bo2b2o2b2ob4o3b2ob
2ob2o2b2obo3b4ob6obob8ob3ob3o5b4obo5b2ob3o$3bob3ob6ob2o2b2ob3o3bo3b4ob
5o2b3o3b2ob2o3b6o2b2ob4obo2b6ob2o2b3ob3obo$bo4b3obobo2bob2obo2b2obo2b
3o2b8obobob3o2b3o3bo5b3ob3o2b13obo3b2ob2o3bo$2b5ob5o2b2ob3o2bo4b2o4bo
2b15o3b2o4bo3bobo3bob6ob6o5bobob4o$ob3o2bob5ob2obob5obob2ob3ob2o2b3ob
2o4bob5o3bo3bob3o2b3obob4obobo2b4ob4obob2o$2bob2ob2o3b2obob4o2b2obob7o
b3o2b4obo3bob2obo4bo4b8obob2ob4o3b11ob2o$b5ob2o2b2obob4o3bob5ob3obob3o
2bob2o2bob2o3bob3obo3b2o2b3o5bo2b9ob4ob4o$ob6o3b2ob5o2bob2ob3o4bob8o2b
2obob2o3b7o2b2obo2b2ob3ob3obobob4o7b2obo$5b3o4b3o3b2obob6o4b3o3bob3o2b
4ob2o3b3obob3o5b7obob3o4bo2b2ob2o$b2obo3b2o2bobobob2o4bob4o2b2ob2o3b2o
b4obo2bobo3b2ob2o2b3o2b3ob2o2b5o5bo$6bob6obo3bo4bo2bob8o4bobo2bo2bob4o
b2ob3o2bo4b6obob2obo2bo12b2o$ob2o3b2obobo2b5obo4bo2b2obob2o5b2ob3ob4o
2bob2o2bo3b5obo3bo5b2obo3bo2bo3bo$5bobobob2obob2o2bo4b3o2b7o2b3ob3ob2o
b2o3b5obo3b3obo3b2o2b2obo3bob3ob2obo$ob3o2b6o3bob2o4bob4obobobobo3b4o
3b4obo2bob2o6bo2b2o4bobo5bo2b2ob2o2bobo3bo$b9ob2o2bo2b3obo4b4o3b6ob2ob
2ob4o2bo2bo2bo3bo7b3o3b2obo9bo$2b4o2bob2o5bobob3o3b3o5bob12obo2bo4b3o
2bo7b4o2b2o2b2obob2o3b2ob2o2bo$o3b2obo2b2o3bo4b2o2bo3b2obobobo7bo3bo3b
o2b7o5bo2bobob2o7b2o2b2o2bo2bobo3bo$5b4obo3bo2bob2o2b2o2bobobobo3b2o2b
o2bo5b6ob5o5bo3b4obo2bo2bo4bob4obo$o3b2ob4obo4bob3ob2o4b6o6bobob2o2bob
6obob2o9b3o2bo3b2ob2ob2obo2b3o$o3b2o2b3o4bo4bobo2bobob3obobo4bo4b6obob
2o2bob2ob2obo2bobobo2b2o7bob3o2bo2bobo$5b2obob2o3bo4bob2o3bobo4bob9obo
2b6obo3b2o5bo2b3ob2ob2obo2bo2bob2obo3bobo$5b2ob4o6b5ob3obobo2bo2b2ob4o
b2obob2ob3o4b6ob3ob5obo2b2ob2o2bo6b2ob4o$2bob2ob2ob3o2b7ob3obo8bobobo
3b2o3bo2bo2b5obob6obobobobo6bo2bobobo5b2o$2bob2obo2b3o2bob2obob8o4bob
4ob8obob9ob3o3b3obob2ob2o5bo3b2o2b2o2bo$b5ob2o2b4o2b8ob2o4bo2b5ob2o4b
2o3b2o3b3obob4ob3o3b3o4b2o3bo3b2obob3o$b4ob3obo2bobo2b2obobo2bob2o6bo
3b2o2b3ob6o2bob5obo3b4o2b3o2bobob2obo3bo3b6o$2bo2bob7o2b3o2b2ob12o2bo
2bo3bo3bobob2o4bobo2bo3bobobobob3o3bobo3bo2bo3b3o$o2b2ob4o2b2o2b2o2b2o
bob5ob3ob3o3b2obo3bobo2b6ob2ob4ob7obo4bo2b3obo2bo2b2o$b4ob5o2b2o2b2ob
2ob5o3b2o2bob5o2bo2b5obo2b2ob2ob3o3b2ob3ob2o2bobob2ob2obo4b3obo$3obo2b
ob6o2b2ob6o3b7o2bobo3bo2bobob3ob4o2b3o4b2obob3o2bob2ob2o5b4o2b2o$9o2bo
2bo3b4o2bo2b4obo2b3ob4o4b3ob5o2b2o2b5ob2ob5o2bo3bo5bob2ob2obo$bo2b2obo
2bo5bo2bo4b8ob4obobo3b2ob3obo2b9o2b3obob2obo3bo6b2obob3ob3o2bo$bo3b7o
2b2o3b6ob3o2b4obob2obob4o2b2obo3bo3bobobo3bob2o2bobobo2bob3ob5obob2obo
$4b3ob4o2bob3ob2ob2obob2o2bob2ob2ob3ob4ob2o6bo3b2o3b3o2b2o3bob2obo4b5o
bob3o$4b5obo4bob3ob4ob3ob2o2bo2bo3bo2b4o2bo3bo5b10obob6obo3b4o2b2obobo
2bo$2b7obo3bob2ob2obo2b2ob7ob3obob2o3bo2b2obo2bo3b2ob2o2b2ob5obob2obo
4bo3bob2obo$o3b2obo5bo2bo3bo2b4o2bobo2b2ob8o2b3ob5o5b6ob3ob3o2bo8bo2b
5o$b4o2bo3bo3b2o3b6o2b3obobo3bo2b2ob5obob3ob3o2b2ob3o2bo2b3o14b3ob2o3b
2o$2obob4obo3bob3ob2o4b12o2b3o2bob3ob2o2b6o2bo2bob2ob2o2b2obo5bo2bobob
ob2o$2ob5ob3o2bob4ob2o2b2o2b3obobob3ob4o2bo2bobob2ob4ob5ob3obo3b2o3b2o
2bo2b2ob2ob2o$bob3o2b4o3b2o2bob2o2b3o4bo2bob2ob2ob2ob7ob5o2b2ob2obobob
o2b17ob4o2b2o$3o3bo2b3obo2b2ob4ob2ob3o2b2o4b3o4b2o2bobob2ob4o2bobob3o
3bo3bob2o2bo2b3ob6o$2ob9o2bo2b3ob5obo3b4o3bob4o2bob7ob3ob3ob4o2bo5bob
4o3b5ob4o$bob3obo3b4obobo2b3ob3ob3o2b3ob7ob2obobo2b3ob2obob2obo3bobo6b
4o3bobo3b2o4bo$ob3ob3o3bo2b4o2bob5o3b2obo3b3o2bobob2ob4o3b2ob4obobob3o
5b6o2bo3b3o3bo$2b2obob2o2b2o3b3ob3o2bobo4b4ob4o2b4obo2bob9ob3o3b4o2b4o
4b6ob2o6bo$ob4ob2obob2obob4o2b2o2b2obob4ob5ob3obob4obob2o5bob2o2b8o4bo
b5obob3o3bo$o2b2obob4obo3bobo3b2ob3obob2obo2b3obob3ob2o2bo2b3o2bob5o2b
ob5obobo2b3obo2b3o3bo$2b3ob3ob2obobob3obob4ob7ob4obobob2ob2obob6o2b2o
4b2o4bo9bobo2b3o$b5ob4o3bo2b4o2b5o2bobo2b2ob5ob2o3b4ob3ob2obo3bob2o4bo
6bo2bob3ob2o2bo$b2obob2ob2o3b7ob3o3bob3ob4o2bo2b4ob2obo6bob2obo3bobo2b
4obo7b2obobobo2bobo$2o2bo2b2ob2obobo5b2o3bo3b11obo2b2ob2ob2ob2ob2o2b2o
3b2ob8o4bo2bobob2ob3obobo$2ob4o2b4o2bobobobo5b3o2bob2o3b6o2b4ob5ob2ob
7o2b2ob2obobo7b2ob5o$b6obob2obo3bobob2o2bob3obo3b2o2b5obob3ob2o2bob3ob
7o3bo2bob2o2bo5b4ob2obo4bo$ob2ob2o6bobo5b2o2bob3o5b6ob2o3b4ob5o2bo2b2o
2b2ob3o2b6o5b4obo5bo$4b3o2b2obo2bobobobo6b2o2bob4ob5o2bobo2bo2b3o2b2ob
3ob3o2b2ob2obob4o2b2ob3ob2o3bo$4b2o7bo3bobob6ob3o2b2o4b2o3b5obob2o3b2o
b5o2bo4b2ob2o2bob6ob3o$o2b2ob5obo3b8ob4ob3ob3obobobob2obob3ob4ob2o2b6o
b3obobob4ob3o2b2obo7bo$2bob4ob4o3b3o2bobo2b2o2b5o5b2o2b2obo2b3ob2obob
2o5b4ob4ob3o2b10ob2o4bo$b10o2bob3o3b2ob7o4bob3obobobo3bo3b2obob3ob2o2b
2o3b2obob2ob2o2bo2b2ob2o4bo$ob5ob2o4b11o2bo2bo2b9o3b2o4b2o2bobob7obo2b
3ob3ob3obo3b2o2bob2obo$2b2o2b7o2bo2bobobobob2o2b2o3bobo3b2o2b11ob2obo
2b2obob2ob2ob4o2bo6b10obo$ob2ob2o4b2o2bo2bob3ob9ob3o2b3obob4ob5ob2o3b
4ob2obob7o2b2o2b6o2b3ob2o$b2ob3obo11b2ob2o4bo2b4o5b4o2bo5b2o2b3ob2o2b
4o3bobob2ob9obob4obo$2bob3o2bo2bo4bo2b2o2b7obob2obo4b3o3b3o2b2o2bo3bob
2o4bob3obobob4ob2ob2obob2o2b2o$b2obobo4b2o3bo4bobo2b2o2b3o3bo4bo2b9o2b
2obob2ob2ob4ob4ob3o2b3ob2ob2ob3obob3o$b4ob2o4bobo4bob6ob5ob2ob3o3b2ob
3o2b5ob5ob5obob3ob3obobobobo3bobob5o$8o6bobo3b4ob3obob6ob7ob2obo2bo2b
2ob2obob3obo3bo4bo4b2obobob2ob2ob3o$2ob2obo4b2o3bo2b3o4b2o2b2o2b3o2b4o
bobob3obob2obo2b2o2b3ob2ob2ob2obobob2ob6ob3o2b2o$bo5bo3bob7obob2o2bob
4ob2ob2o4bob2ob3o3b3obob2o2b2ob3ob5o5b2ob2o4bob3obobo$2o8bo2b5o2b2o5b
11ob4ob3ob2ob4ob4ob3o2b2o3b4o2bobob3obo2bob2obob2o$3o4bo3bo2bob6ob5o5b
o4b10o2b5o2b2obobobobo3b3ob2obobobobob2o3b3o2bobo$bobobo4bo3bo2b8obo3b
o3bo2b8o3bo2bobo2bo2b11ob5o5b19o$o8bobo4bob2ob2o4bo2bo5bob2ob2o3bo4bob
o4bob2o2b2ob2o4b2obo3bob2o2b2ob2o2b2ob2o!
{% endlifeviewer %}
