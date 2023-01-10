---
Date: 2021-01-21
Title: "Publishing the generic-flonum package"
Last: 2021-03-07
Tags: research
---

As a side effect of recent work, I created an alternate MPFR interface in Racket. I posted in the previous blog, that I was planning on extracting that code into a package for public use. As of today, that library has officially been cleaned up, documented, and published in the Racket Package Index. To try it out, install Racket and run `raco pkg install generic-flonum`. Here is an excerpt from the documentation.

> While the [math/bigfloat](https://docs.racket-lang.org/math/bigfloat.html) interface is sufficient for most high-precision computing, it is lacking in a couple areas. Mainly, it does not properly emulate subnormal arithmetic or allow the exponent range to be changed.
> 
> Normally, neither of these problems cause concern. For example, if a user intends to find an approximate value for some computation on the reals, then subnormal arithmetic or a narrower exponent range is not particular useful. However, if a user wants to know the result of a computation specifically in some format, say half-precision, then math/bigfloat is insufficient.
> 
> At half-precision, `(exp -10)` and `(exp 20)` evaluate to `4.5419e-05` and `+inf.0`, respectively. On the other hand, evaluating `(bfexp (bf -10))` and `(bfexp (bf -10))` with `(bf-precision 11)` returns `(bf "4.5389e-5")` and `(bf "#e4.8523e8")`. While the latter results are certainly more accurate, they do not reflect proper behavior in half-precision. The standard bigfloat library does not subnormalize the first result (no subnormal arithmetic), nor does it recognize the overflow in the second result (fixed exponent range).
> 
> This library fixes the issues mentioned above by automatically emulating subnormal arithmetic when necessary and providing a way to change the exponent range. In addition, the interface is quite similar to math/bigfloat, so it will feel familiar to anyone who has used the standard bigfloat library before. There are also a few extra operations from the C math library such as gflfma, gflmod, and gflremainder that the bigfloat library does not support.
> 
> See [math/bigfloat](https://docs.racket-lang.org/math/bigfloat.html) for more information on bigfloats.

To read more of the documentation, please visit [here](https://docs.racket-lang.org/generic-flonum/index.html). The source code for the package can be found at [this](https://github.com/bksaiki/generic-flonum) repository. In the future, I plan on integrating this into the FPBench reference interpreter, so we can finally emulate subnormal arithmetic for various floating-point formats correctly. This has been an outstanding issue for a long time.
