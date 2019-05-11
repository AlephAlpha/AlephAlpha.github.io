---
title: DipDup
tags:
  - Esolang
  - 简书搬运
abbrlink: afc885ea
date: 2017-01-20 16:44:00
---

在之前的[《那些奇奇怪怪的编程语言》](http://www.jianshu.com/p/ed929cf72312)一文里，我介绍了 Esolang 的概念，以及几种 Esolang 的例子。当然，这种事情自己动手更有意思。于是我也设计了一种编程语言，叫做 DipDup。

__DipDup__ 是一种基于堆栈的编程语言。它的设计参考了另外两种基于堆栈的编程语言：[Underload](http://esolangs.org/wiki/Underload) 和 [Joy](http://www.latrobe.edu.au/humanities/research/research-projects/past-projects/joy-programming-language)。

[Underload](http://esolangs.org/wiki/Underload) 是一种极简主义的编程语言，由 [Ais523](http://esolangs.org/wiki/User:Ais523) 设计于2006年。它只有七条指令（或者是八条，如果把列表也算作一种指令的话）。除了表示输出的`S`之外，都是一些简单的堆栈操作。Underload 是图灵完备的。如果你设计了一种基于堆栈的编程语言，想要证明它是图灵完备的，只需要用它实现一下 Underload 里的这些指令就行了。

[Joy](https://en.wikipedia.org/wiki/Joy_(programming_language)) 由 Manfred von Thun 设计于2001年。它不是 Esolang。除了基于堆栈（确切地说，是 [Concatenative](https://en.wikipedia.org/wiki/Concatenative_programming_language)，这个词不知道怎么翻译）以外，它没有太多奇怪的地方，一门普通的编程语言该实现的功能它都有实现。不过 Manfred von Thun 设计这门语言主要是出于学术用途，实际使用的人不多。

<!-- more -->

DipDup 可以看作是 Joy 的一个子集。我从 Joy 的两百多条指令当中选取了四条：`dip`，`dup`，`pop` 和 `cons`，分别把它们记作 `^`，`_`，`!` 和 `:`。DipDup 这个名字就是从这里来的。

DipDup 是一种基于堆栈的语言，它的每一条指令都可以看作是一个把堆栈映成堆栈的函数。把几条指令写成一串，相当于是函数的复合，得到的依然是一个把堆栈映成堆栈的函数。

四条指令的介绍如下：


* `dup`
`dup` 指的是 duplicate，复制。如果原先的堆栈是 `...ba`（堆栈的顶端写在右边），执行操作后堆栈变成 `...baa`。在 DipDup 当中，`dup` 写成 `_`。


* `pop`
不同于别的编程语言里的 `pop`，它把堆栈顶上的东西弹出之后就扔掉了，不会返回也不会输出。如果原先的堆栈是 `...ba`，执行操作后堆栈变成 `...b`。在 DipDup 当中，`pop` 写成 `!`。


* `cons`
类似于 Lisp 里的 `cons` 和 Haskell 里的 `:`。如果原先的堆栈是 `...b[a]`，执行操作后堆栈变成 `...[ba]`。在 DipDup 当中，`cons` 写成 `:`。


* `dip`
这个有点复杂，不过它是 DipDup 里最关键的一条指令。如果原先的堆栈是 `...cb[a]`，它会先弹出 `[a]` 和 `b`，然后把 `[a]` 当成一个程序作用在堆栈 `...c` 上，最后把 `b` 压回堆栈。在 DipDup 当中，`dip` 写成 `^`。

除了四条指令之外，还有列表。一个列表就是把若干个指令和列表写成一串，中间不加任何分隔符，然后用方括号 `[` 和 `]` 括起来。比如说，`[]` 就是一个列表，`[[_:]_:]` 也是一个列表。在程序中，列表可以看作是一个指令，其作用是把这个列表本身压入堆栈。一个列表也可以看作是一段程序（是的，代码即数据），或者一个函数，可以作用在堆栈上（比如说，借助 `dip` 指令）。

初始的堆栈由无穷多个空列表组成——采用无穷堆栈是因为我懒得处理堆栈为空的情况。在程序运行完了之后，输出的是堆栈最顶上的东西。

举个最简单的例子，这是一个 [Quine](https://en.wikipedia.org/wiki/Quine_(computing))，它输出的结果和程序本身一模一样：

```
[_:]_:
```

然后问题来了：DipDup 是图灵完备的吗？

前面说过，要证明一个基于堆栈的编程语言是图灵完备的，只需要用它实现一下 Underload 里的全部指令就行了。

除了列表之外， Underload 只有7种指令。其中 `S`表示输出，对图灵完备与否没有影响；`:` 就相当于 DipDup 里的 `_`（`dup`）；`!` 就相当于 DipDup 里的 `!`（`pop`）；`a` 表示用括号把堆栈最顶上的东西括起来，这个在 DipDup 里用 `[]:` 就能实现；`~` 表示交换堆栈最顶上的两个东西，相当于 Joy 里的 `swap`，这个在 DipDup 里可以用 `[]:^` 实现；`^` 表示弹出堆栈最顶上的东西（必须是个列表），并把它作为一个程序作用在剩下的堆栈上，相当于 Joy 里的 `i`，这个在 DipDup 里可以用 `[]^!` 或者 `_^!` 实现。

于是，我们只剩下一条指令没有实现：`*`。它表示的是弹出堆栈最顶上的两个东西（两个都是列表；事实上，无论是 Underload 还是 DipDup，堆栈里的东西都只有列表），把它们串接成一个列表，再压回堆栈。如果原先的堆栈是 `...[b][a]`，执行操作后堆栈变成 `...[ba]`。看起来与 DipDup 里的 `cons` 很像。但遗憾的是，这个用 DipDup 是实现不了的。

不过，我们可以换一条思路，先来看看 Underload 的图灵完备性是怎样证明的。[Esolang Wiki 里给出的办法](https://esolangs.org/wiki/Underload#Unlambda_to_Underload)是证明所有的 [Unlambda](https://esolangs.org/wiki/Unlambda) 代码都可以直接翻译成 Underload。Unlambda 是一种基于组合子逻辑的 Esolang，它是图灵完备的，因此 Underload 也是图灵完备的。

因此，我们也可以试着把 Unlambda 翻译成 DipDup。事实上，不需要翻译整个 Unlambda，[只需要实现 `S` 和 `K` 这两个组合子就够了](https://esolangs.org/wiki/S_and_K_Turing-completeness_proof)（当然，还需要用上 Underload 里的 `^`，也就是 DipDup 里的 `_^!`）。它们的实现不算复杂：

* `K` 组合子

```
[[[!]^]:]
```

* `S` 组合子

```
[[[[[_]^^]^_^!_^!]::]:]
```

具体的推导我就不写了。

最后附上用 Haskell 写的解释器：

```haskell
import System.Console.Haskeline
import Text.ParserCombinators.ReadP

data Term = C Char | E Expr

type Expr = [Term]

instance Show Term where
    show (C c) = [c]
    show (E e) = "[" ++ show e ++ "]"
    showList = (++) . concatMap show

instance Read Term where
    readsPrec = const $ readP_to_S readTerm
    readList = readP_to_S readExpr

readTerm :: ReadP Term
readTerm = (C <$> satisfy (`notElem` "[]")) +++ (E <$> between (char '[') (char ']') readExpr)

readExpr :: ReadP Expr
readExpr = many readTerm

data Stack = Expr :-: Stack
infixr 5 :-:

initStack :: Stack
initStack = [] :-: initStack

top :: Stack -> Expr
top (x :-: _) = x

type Func = Stack -> Stack

evalTerm :: Term -> Func
evalTerm (E e) = (e :-:)
evalTerm (C '^') = dip
evalTerm (C '_') = dup
evalTerm (C '!') = pop
evalTerm (C ':') = cons
evalTerm _ = id

evalExpr :: Expr -> Func
evalExpr = flip . foldl $ flip evalTerm

eval :: Expr -> Expr
eval = top . flip evalExpr initStack

dip :: Func
dip (x :-: y :-: s) = y :-: evalExpr x s

dup :: Func
dup (x :-: s) = x :-: x :-: s

pop :: Func
pop (_ :-: s) = s

cons :: Func
cons (x :-: y :-: s) = (E y : x) :-: s

rep :: String -> String
rep input = case [x | (x, "") <- reads input] of
    [x] -> show $ eval x
    _ -> error "parse error"

repl :: InputT IO ()
repl = do
    minput <- getInputLine "> "
    case minput of
        Nothing -> return ()
        Just input -> do
            catch (outputStrLn $ rep input) $ \e -> outputStrLn $ show (e :: SomeException)
            repl

main :: IO ()
main = runInputT defaultSettings repl
```
