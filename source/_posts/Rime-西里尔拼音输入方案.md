---
title: Rime 西里尔拼音输入方案
date: 2016-10-06 13:41:00
tags:
  - 文字游戏
  - 简书搬运
---

这是我给 [RIME 输入法](http://rime.im/)弄的一个输入方案，通过西里尔字母来输入中文。采用的是俄罗斯汉学家 Пётр Иванович Кафаров （教名Palladius）设计的转写方案。使用前请背熟俄文键盘，但使用时**不要**将自己的键盘布局切换成俄文。

截图：

{% asset_img palladius.png 我能吞下玻璃而不伤身体 %}

<!-- more -->

```yaml
# Rime schema
# vim: set sw=2 sts=2 et:
# encoding: utf-8

schema:
  schema_id: palladius
  name: "西里尔拼音"
  version: "0.0"
  author:
    - AlephAlpha <alephalpha911@gmail.com>
  description: |
    通过西里尔转写（Систима Палладия）输入中文

switches:
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: simplification
    reset: 1
    states: [ 漢字, 汉字 ]

engine:
  processors:
    - ascii_composer
    - key_binder
    - speller
    - punctuator
    - selector
    - navigator
    - express_editor
  segmentors:
    - ascii_segmentor
    - abc_segmentor
    - punct_segmentor
    - fallback_segmentor
  translators:
    - punct_translator
    - r10n_translator
  filters:
    - simplifier
    - uniquifier

speller:
  alphabet: '`qwertyuiop[]asdfghjkl;''zxcvbnm,.'
  delimiter: " "
  algebra:
    - erase/^xx$/
    - xform/^([zcs])i/$1I/
    - xform/^([jqxy])u/$1v/
    - xform/^j/cz/
    - xform/^q/c/
    - xform/^x/s/
    - xform/^zh/CZ/
    - xform/^ch/C/
    - xform/^sh/S/
    - xform/^r/Z/
    - xform/^z/cz/
    - xform/^you$/iu/
    - xform/^yv/v/
    - xform/^yi?/i/
    - xform/^wu$/u/
    - xform/ong$/ung/
    - xform/uo$/o/
    - xform/v$/iui/
    - xform/v/iu/
    - xform/([aeou])i$/$1y/
    - xform/n$/nY/
    - xform/ng$/n/
    - xform/ia/A/
    - xform/ie/E/
    - xform/io/O/
    - xform/iu/U/
    - derive/uy$/uey/
    - derive/huy/hoy/
    - derive/([bpmf])en/$1In/
    - derive/^e$/I/
    - derive/([CSZ])i/$1I/
    - abbrev/^([A-Za-z]).+$/$1/
    - abbrev/^(cz|CZ).+$/$1/
    - abbrev/^(.+)Y$/$1/
    - 'xlit|abwgdEOZziyklmnoprstufhcCSXHIYeUA|f,dult`;pbqrkvyjghcnea[wxio]sm''.z|'

translator:
  dictionary: luna_pinyin
  prism: palladius
  preedit_format:
    - 'xlit|`qwertyuiop[]asdfghjkl;''zxcvbnm,.|ёйцукенгшщзхъфывапролджэячсмитьбю|'
    - xform/хуй/хуэй/

punctuator:
  full_shape:
    ' ' : { commit: '　' }
    '/' : { commit: 。 }
    '?' : { commit: ， }
    '\' : [ 、, ＼, ｀ ]
    '|' : [ ／, ÷, ｜, '§', '¦' ]
    '!' : { commit: ！ }
    '@' : { pair: [ '“', '”' ] }
    '#' : [ ＃, ⌘ ]
    '$' : { commit: ； }
    '%' : [ ％, '°', '℃', ＆ ]
    '^' : { commit: ： }
    '&' : { commit: ？ }
    '*' : [ ＊, ·, ・, ×, ※, ❂, ＠, ☯, ￥, '$', '€', '£', '¥', '¢', '¤' ]
    '(' : [ （,  「, 【, 〔, ［, 『, 〖, ｛, 《, 〈, «, ‹, ‘ ]
    ')' : [ ）,  」, 】, 〕, ］, 』, 〗, ｝, 》, 〉, », ›, ’ ]
    '-' : [ －, ～ ]
    '_' : [ ——, …… ]
    '+' : ＋
    '=' : ＝
  half_shape:
    '/' : { commit: 。 }
    '?' : { commit: ， }
    '\' : [ 、, '\', '`' ]
    '|' : [ 、, '/', ÷, '|', '§', '¦' ]
    '!' : { commit: ！ }
    '@' : { pair: [ '“', '”' ] }
    '#' : [ '#', №, ⌘ ]
    '$' : { commit: ； }
    '%' : [ '%', '°', '℃', '&' ]
    '^' : { commit: ： }
    '&' : { commit: ？ }
    '*' : [ '*', ·, ・, ×, ※, ❂, '@', ☯, ￥, '$', '€', '£', '¥', '¢', '¤' ]
    '(' : [ （,  「, 【, 〔, ［, 『, 〖, ｛, 《, 〈, «, ‹, ‘ ]
    ')' : [ ）,  」, 】, 〕, ］, 』, 〗, ｝, 》, 〉, », ›, ’ ]
    '-' : [ '-', '~' ]
    '_' : [ ——, …… ]
    '+' : '+'
    '=' : '='


key_binder:
  import_preset: default
  bindings:
    - { when: has_menu, accept: comma, send: comma }
    - { when: has_menu, accept: period, send: period }
```
