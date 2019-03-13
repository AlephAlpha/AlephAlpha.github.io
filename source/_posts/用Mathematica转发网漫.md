---
title: 用 Mathematica 转发网漫
date: 2016-03-26 12:59:00
tags:
  - Mathematica
  - 简书搬运
---

此文本来是发在[果壳日志](http://www.guokr.com/blog/462333/)的，发表时间是2013年6月26日。现在果壳日志下线了，搬来这里。

### 注意：

在最新版的 Mathematica 11.3 中这里的代码已无法使用。我尝试把`URLFetch`改写成`URLExecute`，但并不成功。最后只能不再用Mathematica自带的处理网络请求的函数，而是调用[cURL](https://en.wikipedia.org/wiki/CURL)。修改后的代码和这里已经完全不同，请见[GitHub](https://github.com/AlephAlpha/WebComics).

以下是原文：

<!-- more -->

-----

```mathematica
(*_*)
```

前一段时间无聊，在微博上注册了个[马甲与小号](http://weibo.com/u/3404002352)（好吧，小号暴露了），又顺手写了一段Mathematica代码，专门用来转发网漫。

这里就说说我是怎么干的吧。

首先，要申请一个微博APP。申请了之后，你就获得了一个access_token。然后就可以用它来发微博了。

发微博要用到[新浪微博的API接口](http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI)。比如说，发不带图片的微博用[statuses/update](http://open.weibo.com/wiki/2/statuses/update)：

```mathematica
URLFetch["https://api.weibo.com/2/statuses/update.json", 
 "Method" -> "POST", 
 "Parameters" -> {"access_token" -> "你的access_token", 
   "status" -> "喵呜。"}]
```

发带图片的微博用[statuses/upload](http://open.weibo.com/wiki/2/statuses/upload)。这个比较麻烦，要采用multipart/form-data编码方式。我琢磨了很久才弄明白这个用Mathematica怎么弄。反正代码差不多是这样：

```mathematica
URLFetch["https://api.weibo.com/2/statuses/upload.json", 
 "Method" -> "POST", 
 "MultipartData" -> {{"access_token", "", 
    ToCharacterCode@"你的access_token"}, {"status", "", 
    ToCharacterCode["@拇姬 ", 
     "UTF8"]}, {"pic\"; filename=\"mandrill.png", "image/png", 
    ImportString[
     ExportString[ExampleData[{"TestImage", "Mandrill"}], "PNG"], 
     "Binary"]}}]
```

（不用UTF8编码的话可能会导致乱码。）

发图片的时候要先导出成PNG或者别的图片格式再导入成二进制形式，还是挺麻烦的。不过如果是网上的图片或者电脑里本来有的图片，就省去了第一步。

___（注意：由于2017年7月的微博接口更新，以上方法以不适用，无论发带图片或不带图片的微博都改用[statuses/share](http://open.weibo.com/wiki/2/statuses/share)接口，而且所发的内容有一些奇怪的限制。）___

然后是网漫。我是通过网漫RSS来获取网漫。RSS是XML格式，Mathematica可以把XML格式文件导入成Mathematica的树状结构，然后模式匹配什么的用起来还是很方便的。

麻烦就在于有些网漫的RSS在一个叫feeds.feedburner.com的网站上。这个网站被墙了……

如果有好用的翻墙工具的话，这个不是问题。在Mathematica中可以方便地设置代理服务器：

```mathematica
UseInternetProxy[True];
SetInternetProxy["HTTP", {"代理服务器的地址", 端口}];
```

读取完了RSS，在发微博的时候可以关掉代理：

```mathematica
UseInternetProxy[False];
```

然后从RSS中读出内容、图片地址、链接、发表日期等信息。我把每次转发漫画时把其中最新的一期的发表日期存在一个叫做webcomics.mx的文件中，以后只转发这个日期之后的漫画，这样就可以做到不重不漏。

下面是转发网漫的完整代码：

```mathematica
(* 请设成脚本所在的目录 *)
SetDirectory[
  FromCharacterCode[
   ToCharacterCode@"/home/alephalpha/文档/马甲与小号/WebComics/", "UTF8"]];

accessToken = "████不████给████你████看████";
appURL = " http://example.com";

(* 请根据所使用的翻墙软件修改此处的参数 *)
SetInternetProxy["HTTP", {"127.0.0.1", 8087}];
ProxyImport[url_, options___] := Module[{data},
   UseInternetProxy[True];
   data = Import[url, options];
   UseInternetProxy[False];
   data];

(* 上传图片，发布微博，并记录原漫画的发布时间 *)
Post[name_][pubDate_, title_, link_, image_String] :=  
  URLFetch["https://api.weibo.com/2/statuses/share.json",
   "Method" -> "POST",
   "MultipartData" -> {{"access_token", "",
      ToCharacterCode@accessToken},
     {"status", "",
      ToCharacterCode[
       "【" <> name <> "】" <> link <> " " <> title <> appURL,
       "UTF8"]},
     {"pic\"; filename=\"" <> StringDelete[image, ___ ~~ "/"],
      "image/" <> StringDelete[image, ___ ~~ "."], 
      Import[image, "Binary"]}},
   "StoreCookies" -> False];

Post[name_][pubDate_, title_, link_, image_Integer: 1] :=
  Post[name][pubDate, title, link, 
   Import[link, "ImageLinks"][[image]]];

(* 根据 pattern 来从 RSS 中获取信息，并用 Post 函数发布微博 *)
ShareWebComics[name_, rss_, pattern_] :=
  Module[{data},
   data = Sort[
     Select[Cases[ProxyImport[rss, "XML"], pattern, {0, Infinity}],
      First@# > Lookup[pubDates, name, 0] &]];
   Post[name] @@@ data;
   pubDates[name] = Max[Lookup[pubDates, name, 0], First /@ data];];



Get["webcomics.mx"];

ShareWebComics["xkcd", "http://xkcd.com/rss.xml",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}],
     XMLElement["link", {}, {link_}],
     XMLElement["description", {}, {description_}],
     XMLElement["pubDate", {}, {pubDate_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link,
    First@
     StringCases[description, 
      "<img src=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

ShareWebComics["Buni", "http://www.bunicomic.com/feed/",
  XMLElement["item", {},
    {XMLElement["title", {}, {"Buni"}],
     XMLElement["link", {}, {link_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___,
     XMLElement["description", {}, {description_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], "", link,
    First@StringCases[description,
      "src=\"" ~~ Shortest[src__] ~~ "-150x150" ~~ Shortest[fmt__] ~~ 
        "\"" ~~ ___ :>
       src <> fmt]}];

ShareWebComics["Optipess", "http://feeds.feedburner.com/Optipess?format=xml",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___,
     XMLElement["category", {}, {"Comic"}], ___,
     XMLElement["description", {}, {description_}], ___,
     XMLElement[{___, "origLink"}, {}, {link_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link,
    First@StringCases[description,
      "<img src=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

ShareWebComics["Buttersafe", "http://feeds.feedburner.com/Buttersafe?format=xml",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___,
     XMLElement["category", {}, {"Comic"}], ___,
     XMLElement["description", {}, {description_}], ___,
     XMLElement[{___, "origLink"}, {}, {link_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link,
    First@StringCases[description,
      "<img src=\"" ~~ Shortest[src1__] ~~ "/rss" ~~ 
        Shortest[src2__] ~~ "RSS" ~~ Shortest[src3__] ~~ "\"" ~~ ___ :>
       src1 <> src2 <> src3]}];

ShareWebComics["SMBC", "http://www.smbc-comics.com/rss.php",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}],
     XMLElement["description", {}, {description_}],
     XMLElement["link", {}, {link_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], StringDrop[title, 36], 
    link,
    First@StringCases[description,
      "<img src=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

ShareWebComics["SpikedMath", "http://feeds.feedburner.com/SpikedMath?format=xml",
  XMLElement["entry", {},
    {XMLElement["title", {}, {title_}], ___,
     XMLElement["published", {}, {pubDate_}], ___,
     XMLElement["content", {___}, {description_}], ___,
     XMLElement[{___, "origLink"}, {}, {link_}], ___}] :>
   {AbsoluteTime@pubDate, title, link,
    First@StringCases[description,
      "<img src=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

ShareWebComics["don't shoot the pianist", "http://euge.ca/feed/",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}],
     XMLElement["link", {}, {link_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link}];

ShareWebComics["ExtraOrdinary", "http://www.exocomics.com/feed",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}],
     XMLElement["link", {}, {link_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___,
     XMLElement[{_, "encoded"}, {}, {description_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link,
    First@StringCases[description,
      "src=\"" ~~ Shortest[src1__] ~~ "/feed" ~~ Shortest[src2__] ~~ 
        "\"" ~~ ___ :>
       src1 <> "/comics" <> src2]}];

ShareWebComics["pbfcomics", "http://www.pbfcomics.com/feed/feed.xml",
  XMLElement["entry", {},
    {XMLElement["id", {}, {link_}],
     XMLElement["title", {_}, {title_}],
     XMLElement["updated", {}, {updated_}], ___,
     XMLElement["summary", {_}, {description_}], ___}] :>
   {AbsoluteTime@updated, title, link,
    First@StringCases[description,
      " src=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

ShareWebComics["Geek&Poke", "http://feeds.feedburner.com/GeekAndPoke",
  XMLElement["item", {},
    {XMLElement["title", {}, {title_}], ___,
     XMLElement["pubDate", {}, {pubDate_}], ___,
     XMLElement["description", {}, {description_}], ___,
     XMLElement[{___, "origLink"}, {}, {link_}], ___}] :>
   {AbsoluteTime@StringDrop[pubDate, -5], title, link,
    First@StringCases[description,
      " data-image=\"" ~~ Shortest[src__] ~~ "\"" ~~ ___ :> src]}];

DumpSave["webcomics.mx", pubDates];
```
第一次运行之前要先把`pubDates`设定成一个空的[Association](https://reference.wolfram.com/language/guide/Associations.html)：

```mathematica
pubDates = <||>
```

然后，如果用的是Linux，还可以把这段保存在一个Mathematica脚本中，然后用[cron](https://en.wikipedia.org/wiki/Cron)定时执行这个脚本，就可以做到自动转发了。

就这样吧。
