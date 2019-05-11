---
title: 用 Mathematica 搜索生命游戏中的静物
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
abbrlink: 855cb24b
date: 2017-11-06 00:43:00
---

* {% post_link 用-Mathematica-搜索生命游戏中的静物（二） %}
* {% post_link 用-Mathematica-搜索生命游戏中的静物（三） %}

---
果壳网已死。临死前[元胞自动机小组](https://www.guokr.com/group/381/)还回光返照了一段时间——虽然真正活跃的人大概不超过五个。

以下的代码就算是我给果壳网以及元胞自动机小组烧的一点纸钱吧。

```mathematica
a = Merge[
   k[#[[;; 2]], 
       CellularAutomaton["GameOfLife", #][[2, 2]]] -> #[[3]] & /@ 
    Tuples[Tuples[{0, 1}, 3], 3], Identity];
g[x_, y_, z_] := 
  FindPath[Flatten@
     MapIndexed[
      Outer[v[#2 - 1, Most[#1]] -> v[#2, Rest[#1]] &, ##, 1] &, 
      Lookup[a, 
       MapThread[
        k, {First[
          Partition[{x, y}, {2, 3}, {2, 1}, {{1, -2}, {-1, 2}}, 0]], 
         z}], {}]], v[0, {0, 0}], v[Length[z], {0, 0}], Length[z] + 2,
     All][[;; , 2 ;;, 2, 1]];
With[{w = 16, h = 16},
 o = Table[0, w + 2];
 i = g[o, o, o];
 f[l : {___, x_, y_}] := 
  If[Length@l == h + 2, 
   If[y == o && MemberQ[i, x], l, Missing["NotFound"]], 
   Catch[Do[
     If[MissingQ[#], , Throw[#]] &[f[Append[l, z]]], {z, 
      RandomSample[g[x, y, y]]}]; Missing["NotFound"]]];
 SparseArray[f[{o, RandomChoice[i]}]]]
```

<!-- more -->

返回的结果是一个`SparseArray`，可以用`ArrayPlot`来转换成图片。这是搜索16*16的静物。把`With[{w = 16, h = 16},`里的16换成别的数字可以搜索别的大小的静物，但不要把`w`改得太大。如果一次搜索的时间太久，可能是运气不好，可以用`Alt+.`来中断计算。

下面是5次搜索的结果：

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
ob2o2bob2o5bo$2ob4obobo2b3o$9bo2bo$5o5b2ob3o$o2bobob3o2bo2bo$5bobo3bo2bo$4bo3b2ob3o$o2bob3o2bo$4obo2bo2bob3o$5bo2b2ob2o2bo$3obo4bo4bo$o2b2obo2bob2ob2o$bo3b2o3bobo2bo$2b2o10bo$obob3o4b3o$2o4bo4bo!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
bo11bobo$b3o6bobob2o$4bobob3obo$b2obob2o4bo$o2bo5b2obobo$2o8bo2bobo$6bobo2bobobo$3bobob5ob2o$b3obo$o4b3obob4o$b4o3b3o4bo$3bo2bo5bo2bo$5b2ob7o$b4o3bo$bo3bobo3bob2o$4b2ob2o2b2obo!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
2bobob2obobobo$bob2obob2ob2obo$bo4bo3bo3bo$2bob3o3bo3b2o$ob2o5b2obobo$2o3b2o4b2obo$3b2ob4o3bo$2obo5bob2o$2o3b2o2bobo$3bobobobobo$3obo2b2obob2o$o3bobo3bo3bo$4b2obobob2obo$2b2o3bobo3bo$bo2bob2o2bobo$2b2o5b2ob2o!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
2b2obo4bo3b2o$bob2obob3o2bobo$o5b2o3b3o$b5o3b2o4bo$2bo2bob3o2b4o$o5bo4b2o$2o6b3o3b2o$bo4bobo2b2obo$bobo2b2o3bo2bo$2ob3o6bob2o$bo4b2o3b2o2bo$bob2obo5bobo$2o2bo3bobo3b2o$2bobo2b2ob2o2bo$2bobobo2bo2bobo$3b2ob2o3b2ob2o!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = B3/S23
bobo2bob2o2bobo$ob6ob5obo$o14bo$b4ob5ob3o$4b2o4bobo$obo4bo2bo2bobo$2ob8o3b2o$3bo$2obo2bo2b2o$bob4o3bo2bobo$o9bobob2o$3obo4b2obo$3b2o3bo4b3o$2o5bobob2o2bo$ob3o3b2obo2bo$4bo7b2o!
{% endlifeviewer %}
