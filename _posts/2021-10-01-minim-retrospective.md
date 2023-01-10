---
layout: post
title: "A One-Year Retrospective on Minim"
date: 2021-10-02
last_modified: 2021-10-02
categories: blog
---

September 20th marked the one year anniversary of Minim's creation.
It initially started as an pandemic-fueled side project based on
  an online guide of making a small Lisp language.
Since then, Minim has undergone significant changes in design
  and scope.
Today Minim is a fully-interpreted language, complete with a small
  standard library, syntax macros (not quite R6RS compliant),
  and many more features.
To celebrate the past year of development, I have decided to describe
  my experience designing and implementing the language.

#### The Early Days

The initial versions of Minim were hacky at best.
The goal of development during Minim 0.1.x was expanding
  the number of available types.
By version 0.1.2, the language supported booleans, exact
  and inexact numbers, symbols, strings, pairs, lists,
  user-defined functions, hash tables, vectors,
  and sequences.
Nearly all of these types since then have undergone
  structural changes.
The set of procedures to create and modify these
  procedures was minimal at the time, just enough
  to be useful.

The worst feature of this era was the owner-reference
  system that kept track of objects, so it could free
  resources when objects went out of scope.
Initially, new copies were created every time objects were
  referenced, but with an "improvement", objects
  could be set as owners of their data or references
  of another object's data.
This required unnecessary amounts of copying objects,
  annoying equality checks, and hours of debugging
  segmentation faults.
What I didn't know at the time was Scheme implementations
  usually never copy immutable objects and use
  garbage collectors to know when to free memory.
This issue was not fixed until I finally added my own
  garbage collector in version 0.3.0.

#### Expansion

With a plethora of types in the language, the focus for
  Minim 0.2.x shifted to increasing the number of
  procedures available.
First, file reading was added to support a standard
  library that was not hard-coded in C.
In these versions, file reading occured separately
  from the existing parser, tracking parentheses
  and ignoring comments to extract a hopefully
  parsable string.
Initially, reading source code was rough
  since the reader would spontaneously fail, leading
  to hours of searching for and fixing bugs, and often
  to my frustration, the creation of new bugs.
In the same release, I added errors with backtracing
  and syntax with source locations which proved to be
  helpful when modifying the standard library.

Minim 0.2.1 and 0.2.2 were expansions of the math
  and list libraries.
I put as many of the new procedures to the standard
  library as I could rather to the already large
  set of primitive procedures.
I also added arity and type errors so that these new
  procedures could reject arguments upfront and
  print a more descriptive error.
By then, issues with parsing motivated me to remake the
  parser from scratch which turned out to be a huge
  improvement for the language.
Since then the parser has barely changed and no longer
  hinders development.

#### Standardization

Development of Minim 0.3.x felt quite different from the
  previous versions.
Primarily, I began reading the existing standards on Scheme
  including R4RS, R5RS, and R6RS.
For the most part, I ignored these standards before because
  I wasn't interested in sticking to an existing blueprint
  for Minim.
However, my design choices began to feel flawed and haphazard
  and the way forward was becoming unclear.
Implementing procedures and features described in the standards
  became the main goal during this era of development.

The first few changes were performance-related: the
  addition of a garbage collector and the implementation
  of tail calling.
I detailed the design of the garbage collector in
  my previous blog post which you can read [here](./2021-07-14-minim-gc.html).
These changes caused a significant slow down in performance,
  but accelerated the pace of development since I didn't have to
  worry about memory management, aside from a few bugs that
  needed patching.

With garbage collection in place, I turned to important features
  of any Scheme language: quoting and syntax macros.
Syntax macros turned out to be quite the headache;
  my intial implementation continually caused Minim to crash.
I eventually reimplemented macros from scratch, but I found out that even my
  most recent attempt is still not compliant with the standard.
As of today, I have considered that part of the project to be
  "good enough", but fixing it is still definitely on my to-do list.

After the syntax macro mess, I moved on and added
  types like characters, records, and file ports; additional
  procedures for strings and lists; and more features
  like multi-valued expressions, continuations, and multi-signature
  functions with `case-lambda`.

#### Today

And with that, we have finally reached the present day.
As you have just read, the development of Minim has been a
  long and winding path, from basic and hacky beginnings
  to a much more robust implementation.
If there's anything I've learned, it's that a small idea can
  be fully realized with time and effort.

As for those following my footsteps: I'd highly recommend reading
  standards for an existing language.
You might not be able to implement everything, but I found that
  following the Scheme standards made Minim a much more robust and
  sensical language.
Standards are an important part of language design no matter how
  long and dense they might seem.

#### The Future

What's next for Minim?
As I've mentioned before, syntax macros are not Scheme-compliant,
  but there are many more features of Minim that have deviated
  from the standard, usually because of my naive choices.
A couple examples include the use of `def` instead of `define`
  and the syntax of function definitions.
I am still weighing whether or not to resolve these design differences.

More recently, I have implemented caching for Minim source code files: syntax
  macros are applied and the resulting desguared code is emitted for later use.
Testing shows that this decreases the number of expressions executed on boot significantly.
On top of caching, I have implemented constant folding since certain expressions
  can be resolved before runtime.
In particular, my implementation of `case-lambda` is egregious in its use of
  constant expressions for resolving arity.

My target goal is to implement a native-code compiler for Minim,
  but having just begun a compilers course this quarter,
  I have a feeling this may be a long ways away.
Until then, I will focus on implementing more of the standard.
Please check out the source [repository](https://github.com/bksaiki/Minim)
  for Minim to see my progress and give the language a try!
