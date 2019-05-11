---
title: Wolfram|Alpha 计算时显示的元胞自动机（三）
tags:
  - 生命游戏
  - Mathematica
  - 简书搬运
abbrlink: 15c7e60a
date: 2019-03-02 19:13:00
---

* {% post_link Wolfram-Alpha-计算时显示的元胞自动机（一） %}
* {% post_link Wolfram-Alpha-计算时显示的元胞自动机（二） %}

---

现在我给 [LifeFind](https://github.com/AlephAlpha/LifeFind) （即{% post_link 用-Mathematica-搜索生命游戏中的静物（三） 前面 %}提到的用来搜索生命游戏中的图样的那个 Mathematica 包）加上了搜索 Generations 规则的功能。于是，它也能够搜 Wolfram|Alpha 的那个元胞自动机。

搜索速度很慢，而且只能搜周期很小的图样，于是其实没有太多有意思的发现。不过，至少振荡子不再只有那么几个了。

运行以下的 Mathematica 代码之前先要导入 LifeFind 包（当然，导入之前先要[安装](https://github.com/AlephAlpha/LifeFind/wiki/%E4%B8%8B%E8%BD%BD%E4%B8%8E%E5%AE%89%E8%A3%85)）：

```mathematica
<< Life`
```

搜索结果是随机的。输入下面的代码来搜索很可能会搜出不同的图样。

<!-- more -->

## 静物

静物没什么好说的。原本就能搜 `B357/S3457` 规则的静物，只是现在可以把这个规则写成 `3457/357/5` 了。

还可以加点别的条件，搜个胖乎乎圆滚滚的，好看。

```mathematica
LifeFind[59, 59, "Rule" -> "3457/357/5", "Symmetry" -> "D8", 
 "KnownCells" -> {DiskMatrix[29] _}]
```

搜出的结果：

{% lifeviewer %}
x = 59, y = 59, rule = 3457/357/5
25bo7bo$23b5obob5o$18b2ob3ob2ob3ob2ob3ob2o$17bob2obobo2b2ob2o2bobob2ob
o$17b2obob2o2bo2bo2bo2b2obob2o$13b2ob2ob3obob2o2bo2b2obob3ob2ob2o$13b
2obob2obobo2bob3obo2bobob2obob2o$14bob2obo2b5o2bo2b5o2bob2obo$11bo2b2o
bob3o3bo2bobo2bo3b3obob2o2bo$9b5ob2ob3obo3bob3obo3bob3ob2ob5o$9b2ob2ob
o2bo2b5obobobob5o2bo2bob2ob2o$8b2o2bob6o2b2o2bo5bo2b2o2b6obo2b2o$9b4ob
o2bob2o5b2obob2o5b2obo2bob4o$5b2o2b2o2b3obo2b2ob3o2b3o2b3ob2o2bob3o2b
2o2b2o$5b4o2b3o2bobo2b2ob2o2bobo2b2ob2o2bobo2b3o2b4o$8b4obobo2b2o2bobo
b2obob2obobo2b2o2bobob4o$5b3obobo2bob3o3bob2o2bobo2b2obo3b3obo2bobob3o
$3b3ob2o2b3o2b2o2bob2o2bo2bo2bo2b2obo2b2o2b3o2b2ob3o$2bobobo2b3o2b3o2b
4o2bob2ob2obo2b4o2b3o2b3o2bobobo$2b2ob5ob2o2bo2b2obo2b11o2bob2o2bo2b2o
b5ob2o$3b3o2b2o2b2o3b2o2b3obo7bob3o2b2o3b2o2b2o2b3o$2bo2b2obobo2b2o3b
4ob2ob7ob2ob4o3b2o2bobob2o2bo$2b3o2bob3o2b5obobob3o2bo2b3obobob5o2b3ob
o2b3o$b2ob4o2b2obo3bo2b2ob2o9b2ob2o2bo3bob2o2b4ob2o$bobo3bo2bo2b4o2bob
3ob2o2bo2b2ob3obo2b4o2bo2bo3bobo$3o2bob2obo2b2obob3obob11obob3obob2o2b
ob2obo2b3o$b2ob4obob2o2bobobob2ob4obob4ob2obobobo2b2obob4ob2o$bobo6bob
o2bo2b2obo3b2o2bo2b2o3bob2o2bo2bobo6bobo$2b2o2bob2o3b2obob2obo3bo2bobo
2bo3bob2obob2o3b2obo2b2o$b2ob4ob2ob2obobobob2ob4obob4ob2obobobob2ob2ob
4ob2o$2b2o2bob2o3b2obob2obo3bo2bobo2bo3bob2obob2o3b2obo2b2o$bobo6bobo
2bo2b2obo3b2o2bo2b2o3bob2o2bo2bobo6bobo$b2ob4obob2o2bobobob2ob4obob4ob
2obobobo2b2obob4ob2o$3o2bob2obo2b2obob3obob11obob3obob2o2bob2obo2b3o$b
obo3bo2bo2b4o2bob3ob2o2bo2b2ob3obo2b4o2bo2bo3bobo$b2ob4o2b2obo3bo2b2ob
2o9b2ob2o2bo3bob2o2b4ob2o$2b3o2bob3o2b5obobob3o2bo2b3obobob5o2b3obo2b
3o$2bo2b2obobo2b2o3b4ob2ob7ob2ob4o3b2o2bobob2o2bo$3b3o2b2o2b2o3b2o2b3o
bo7bob3o2b2o3b2o2b2o2b3o$2b2ob5ob2o2bo2b2obo2b11o2bob2o2bo2b2ob5ob2o$
2bobobo2b3o2b3o2b4o2bob2ob2obo2b4o2b3o2b3o2bobobo$3b3ob2o2b3o2b2o2bob
2o2bo2bo2bo2b2obo2b2o2b3o2b2ob3o$5b3obobo2bob3o3bob2o2bobo2b2obo3b3obo
2bobob3o$8b4obobo2b2o2bobob2obob2obobo2b2o2bobob4o$5b4o2b3o2bobo2b2ob
2o2bobo2b2ob2o2bobo2b3o2b4o$5b2o2b2o2b3obo2b2ob3o2b3o2b3ob2o2bob3o2b2o
2b2o$9b4obo2bob2o5b2obob2o5b2obo2bob4o$8b2o2bob6o2b2o2bo5bo2b2o2b6obo
2b2o$9b2ob2obo2bo2b5obobobob5o2bo2bob2ob2o$9b5ob2ob3obo3bob3obo3bob3ob
2ob5o$11bo2b2obob3o3bo2bobo2bo3b3obob2o2bo$14bob2obo2b5o2bo2b5o2bob2ob
o$13b2obob2obobo2bob3obo2bobob2obob2o$13b2ob2ob3obob2o2bo2b2obob3ob2ob
2o$17b2obob2o2bo2bo2bo2b2obob2o$17bob2obobo2b2ob2o2bobob2obo$18b2ob3ob
2ob3ob2ob3ob2o$23b5obob5o$25bo7bo!
{% endlifeviewer %}

## 振荡子

由于 LifeFind 找不了周期稍大一点的振荡子，我其实也没有多少新的发现。

随便倒一锅汤，一般都能看到一个周期8的转圈圈。虽然周期有点大，但个头很小，LifeFind 一搜就出来了：

```mathematica
LifeFind[4, 4, 8, "Rule" -> "3457/357/5", "Changing" -> True]
```

{% lifeviewer %}
x = 4, y = 4, rule = 3457/357/5
3.$3A$B2A$.CD!
{% endlifeviewer %}

原本这就是已知的周期最小的振荡子了。现在有了 LifeFind，可以轻松找到周期5的振荡子（比搜生命游戏里同样大小的振荡子快多了，大概因为是 Generations？）：

```mathematica
LifeFind[4, 8, 5, "Rule" -> "3457/357/5", "Changing" -> True]
```

{% lifeviewer %}
x = 8, y = 4, rule = 3457/357/5
.D.D.AB$4AC2AC$B2A.B2AD$.CD2.A!
{% endlifeviewer %}

稍大一点的：

```mathematica
LifeFind[4, 8, 5, "Rule" -> "3457/357/5", "Changing" -> True]
```

{% lifeviewer %}
x = 7, y = 7, rule = 3457/357/5
4.CB$3.D3A$4.2A$.BADBA$C2AC$D2AB$2.A!
{% endlifeviewer %}

加点对称性条件，能搜到更漂亮的：

```mathematica
LifeFind[10, 10, 5, "Rule" -> "3457/357/5", "Changing" -> True, 
 "Symmetry" -> "C4"]
```

{% lifeviewer %}
x = 10, y = 10, rule = 3457/357/5
4.D$3.B3A$3.C2AB$.AB.DA.CB$.3A2.D2AD$D2AD2.3A$.BC.AD.BA$3.B2AC$3.3AB$
5.D!
{% endlifeviewer %}

有一个长得和它很像的周期6：

```mathematica
LifeFind[10, 10, 6, "Rule" -> "3457/357/5", "Changing" -> True, 
 "Symmetry" -> "C4"]
```

{% lifeviewer %}
x = 10, y = 10, rule = 3457/357/5
4.BA$3.C2A$3.D2A$3.BCDBDC$3AD2.C2AB$B2AC2.D3A$.CDBDCB$4.2AD$4.2AC$4.AB
!
{% endlifeviewer %}

以上这几个振荡子好像都是周期8转圈圈的变种。当然也有不是的，比如这个两个细胞渐渐消失的振荡子：

```mathematica
LifeFind[8, 8, 5, "Rule" -> "3457/357/5", "Changing" -> True, 
 "Symmetry" -> "D4X"]
```

{% lifeviewer %}
x = 8, y = 8, rule = 3457/357/5
6b2o$2b2o2b2o$bob3o$b2o2bo$2bo2b2o$2b3obo$2o2b2o$2o!
{% endlifeviewer %}

还有很多别的振荡子。但由于最小的周期也有5，搜索较大的振荡子比较困难。这里就不贴出更多结果了。

## 飞船

目前找到的飞船速度还是只有 c/2。不过飞船特别多，也不难搜。

以下是几次输入

```mathematica
LifeFind[16, 16, 4, 2, 0, "Rule" -> "3457/357/5", "Changing" -> True, 
 "Symmetry" -> "D2|"]
```

得到的结果：

{% lifeviewer %}
x = 16, y = 16, rule = 3457/357/5
2$3.D.D4.D.D$.DCBC6.CBCD$.B3A.D2BD.3AB$D.ADABA2CABADA.D$BCABAB4ABABACB
$5A2C2A2C5A$3A2.6A2.3A$6.A2CA$4.CDA2CADC$4.AB4ABA$4.3A2.3A$5.A4.A!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = 3457/357/5
3.D.2A2.2A.D$2.CDC6ACDC$.D.10A.D$CBD4A2.4ADBC$2ABC.BC2ACB.CB2A$.6A2.6A
$.2A.AD4ADA.2A$3.4A2.4A$5.AC2ACA$2.DCD2A2.2ADCD$D.BAB2A2D2ABAB.D$BC2A
2.A2BA2.2ACB$3A3.4A3.3A$3A4.2A4.3A!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = 3457/357/5
$2.2D8.2D$.CBC.CD2.DC.CBC$.3ADB.2A.BD3A$CDA.A.A2BA.A.ADC$ABACA.4A.ACAB
A$5A6.5A$.A.2A6.2A.A$.DC.D6.D.CD$.BACB2.2B2.BCAB$2.3AD.2C.D3A$2.3ABC2A
CB3A$3.2A.4A.2A!
{% endlifeviewer %}

{% lifeviewer %}
x = 16, y = 16, rule = 3457/357/5
5.BC2.CB$5.2A2.2A$6.4A$DC4.4A4.CD$BAD2BDA2.AD2BDAB$.AB3CA2BA3CBA$.14A$
2.A.A.4A.A.A$2.DC.D4.D.CD$.CBACB4.BCABC$.2A.A.C2.C.A.2A$CDACACA2DACACA
DC$AB5A2B5ABA$3A.A.4A.A.3A$.A5.2A5.A!
{% endlifeviewer %}

也能搜胖乎乎圆滚滚的飞船（不过毕竟是飞船，没法很圆，像个大虫子）：

```mathematica
LifeFind[47, 47, 2, 1, 0, "Rule" -> "3457/357/5", "Symmetry" -> "D2|",
  "KnownCells" -> {DiskMatrix[23] _}]
```

{% lifeviewer %}
x = 47, y = 47, rule = 3457/357/5
2$18.D9.D$16.D.BC7.CB.D$8.DC5.CBC2A.D3.D.2ACBC5.CD$8.BADC.CD3A.ACB3.BC
A.3ADC.CDAB$9.ABA.ABA3.3A3.3A3.ABA.ABA$9.3A.3A3.3A3.3A3.3A.3A$10.A3.A
2.D11.D2.A3.A$3.DC.DCD3.DCD.CB.CD5.DC.BC.DCD3.DCD.CD$3.BACBABC.CBABCA.
CABC3.CBAC.ACBABC.CBABCAB$4.3AD.AD2A.3ADA.2A3.2A.AD3A.2ADA.D3A$4.3ABCA
BA.D3ABA.ADC.CDA.AB3AD.ABACB3A$5.2A.4ACB2A.2A.ABA.ABA.2A.2ABC4A.2A$8.D
.ADA2.DC2A.3A.3A.2ACD2.ADA.D$6.D.BCABAC.BADAD3A.3ADADAB.CABACB.D$.DC.D
CBC.A.3AD.ABABADA.ADABABA.D3A.A.CBCD.CD$.BACBA.ADACA2.BC5ABA.AB5ACB2.A
CADA.ABCAB$2.3ADCAB3ADC.ADA2.3A.3A2.ADA.CD3ABACD3A$2.3AB4A.ABADABA.CDA
3.ADC.ABADABA.4AB3A$3.2A6.3AB3ACAB5.BAC3AB3A6.2A$6.D.D2.4A2.3A7.3A2.4A
2.D.D$3.CDCBCB.D4.CD.2A7.2A.DC4.D.BCBCDC$2.CAB3A.CBCDCDAB.A.C5.C.A.BAD
CDCBC.3ABAC$CDA.A2DAD3ABAB.ACACADC.CDACACA.BAB3ADA2DA.ADC$ABA.A2BABA3.
2AC5ABA.AB5AC2A3.ABA2BA.ABA$3A.6AD.D.3A.A.3A.3A.A.3A.D.D6A.3A$.A3.2A2.
AB.B.2A.D3.A3.A3.D.2A.B.BA2.2A3.A$4.C.A.C.ACACADCB2.D5.D2.BCDACACA.C.A
.C$2.CDACACAD5ABA.CDBC3.CBDC.AB5ADACACADC$2.AB5ABA.A.3A.AB2A3.2ABA.3A.
A.AB5ABA$2.3A.A.2A.D3.A2.3A5.3A2.A3.D.2A.A.3A$3.A3.C.ACBC3.DC3A5.3ACD
3.CBCA.C3.A$5.CDAC4A2.CBA4.CDC4.ABC2.4ACADC$5.AB5A3.2A3.CDABADC3.2A3.
5ABA$5.3A.A.AC.CA.D.CABDADBAC.D.AC.CA.A.3A$6.A3.CDADA2.BDADABABADADB2.
ADADC3.A$10.ABABA2CABAB5ABABA2CABABA$10.3A.8A3.8A.3A$11.A.D4A11.4AD.A$
12.CB.D5.D3.D5.D.BC$12.2ACB3.D.BC.CB.D3.BC2A$13.3A3.BC2A.2ACB3.3A$13.
3A3.3A3.3A3.3A$19.3A3.3A!
{% endlifeviewer %}
