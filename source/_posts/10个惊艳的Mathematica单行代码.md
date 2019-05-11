---
title: 10个惊艳的Mathematica单行代码
tags:
  - Mathematica
  - 简书搬运
abbrlink: 8f61538a
date: 2016-05-28 14:56:00
---

几年前兴起过一个“10个惊艳的XX单行代码”的潮流。始作俑者好象是Marcus Kazmierczak的[《10 Scala One Liners to Impress Your Friends》](https://gist.github.com/mkaz/d11f8f08719d6d27bab5)，然后出现了各种其它语言的版本。

我不是编程工作者，现在才看到那些文章，跟风写了个Mathematica版。不过很多功能在Mathematica里都可以直接用一个函数搞定，看起来不是那么惊艳。

需要Mathematica 10.1以上的版本。

<!-- more -->

### 1. 列表每项乘以2

```mathematica
Range[10] * 2
```

### 2. 列表求和

```mathematica
Fold[Plus, Range[1000]]

Total[Range[1000]]
```

### 3. 验证字符串中是否存在某词

```mathematica
wordList = {"coffeescript", "eko", "play framework", "and stuff", "falsy"}
tweet = "This is an example tweet talking about javascript and stuff."

StringContainsQ[tweet, wordList]
```

### 4. 读取文件

```mathematica
fileText = Import["data.txt"]

fileLines = Import["data.txt", "List", "Numeric" -> False]
```

### 5. 生日歌

```mathematica
Do[Print["Happy Birthday " <> If[i == 3, "dear NAME", "to You"]], {i, 4}]
```

### 6. 过滤列表中的数字

```mathematica
{passed, failed} = Lookup[GroupBy[{49, 58, 76, 82, 88, 90}, # > 60 &], {True, False}, {}]
```

### 7. 读取和分析XML Web service

```mathematica
results = Import["http://search.twitter.com/search.atom?&q=scala", "XML"]
```

### 8. 寻找列表中最大最小值

```mathematica
Min[{14, 35, -7, 46, 98}]
Max[{14, 35, -7, 46, 98}]
```

### 9. 并行处理

```mathematica
result = ParallelMap[processItem, dataList]
```

### 10. 埃拉托斯特尼筛法

```mathematica
Reap[Range[2, #] //. p : {x_, ___} :> Complement[p, Range[0, #, Sow[x]]]][[2, 1]] &
```
