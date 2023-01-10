#lang racket

(require "common.rkt")
(provide (all-defined-out))

;; Top level
(define *name* "Brett Saiki")
(define *out-dir* "docs")
(define *blog-dir* "blog")
(define *papers-dir* "papers")
(define *main-page* "index.html")
(define *blog-index* "blog.html")
(define *papers-index* "papers.html")

;; Sections
(define *self-description*
  (list
    "My name is Brett Saiki.
    I am a fourth-year undergraduate student at the University of Washington
      double-majoring in computer engineering and mathematics.
    I am engaged in research on computer number systems and term-rewriting techniques
      alongside my advisers @Zach Tatlock@ and @Pavel Panchekha@.
    I currently work on projects like Herbie, Ruler, and FPBench."
    "https://homes.cs.washington.edu/~ztatlock/"
    "https://pavpanchekha.com/"))

(define *contact-info*
  `(("UW Email" ,@(insert-links "@bsaiki@@cs.washington.edu@" "mailto:bsaiki@cs.washington.edu"))
    ("Personal Email" ,@(insert-links "@bksaiki@@gmail.com@" "mailto:bksaiki@gmail.com"))))

(define *personal-links*
  `(("More links" ,@(insert-links "@LinkedIn@" "https://linkedin.com/in/brettsaiki")
                  ,@(insert-links "@Resume@" "resources/resume.pdf")
                  ,@(insert-links "@Github@" "https://github.com/bksaiki")
                  ,@(insert-links "@Blog@"  "blog.html")
                  ,@(insert-links "@Papers@" "papers.html"))))

(define *research-projects*
  `(("@Herbie@ - a tool for minimizing error in floating-point expressions."
     "https://github.com/herbie-fp/herbie")
    ("@FPBench@ - a collection of benchmarks, compilers, and standards for
        the floating-point research community."
      "https://github.com/FPBench/FPBench")
    ("@Ruler@ - a framework for synthesizing rewrite rules for a particular domain."
     "https://github.com/uwplse/ruler")))

(define *publications*
  '(((conf . "Object-Oriented Programming, Systems, Languages & Applications (OOPSLA) 2021")
     (title . "Rewrite Rule Inference Using Equality Saturation")
     (author . "Chandrakana Nandi, Max Willsey, Amy Zhu, Brett Saiki, Yisu Wang, Adam Anderson, Adriana Schulz, Dan Grossman, Zachary Tatlock")
     (paper . "https://arxiv.org/pdf/2108.10436.pdf")
     (award . "Distinguished Paper Award"))
    ((conf . "IEEE Symposium on Computer Arithmetic (ARITH) 2021")
     (title . "Combining Precision Tuning and Rewriting")
     (author . "Brett Saiki, Oliver Flatt, Chandrakana Nandi, Pavel Panchekha, Zachary Tatlock")
     (paper . "https://herbie.uwplse.org/arith21-paper.pdf")
     (talk . "https://youtu.be/ytWhp0I8KVw"))))

(define *side-projects*
  `(("@Minim@ - a Scheme-like language inspired by recent work in Racket."
     "https://github.com/bksaiki/Minim")
    ("@ENL@ - a library of alternate number systems written in C. Currently supports quad-double."
     "https://github.com/bksaiki/ENL")
    ("@generic-flonum@ - Racket interface for MPFR that supports subnormal numbers
        and variable exponent sizes."
     "https://docs.racket-lang.org/generic-flonum/index.html")))

(define *resource-links*
  `(("@FPBench community@ - FPBench, FPCore, number systems, and more.
     Please start here if you want to know more about the FPBench Project."
     "https://fpbench.org")
    ("@Herbie web demo@ - an interactive page that runs programs through Herbie.
     Try it out!"
     "https://herbie.uwplse.org/demo")))

(define *news-entries*
  `(("June 12, 2022" "@Herbie 1.6@ is now live! Please check out the newest release of Herbie.
     It features my work replacing Herbie's \"recursive rewrite\" algorithm with one
     using the @egg@ library as well as many other exciting features like shorter
     branch conditions and an improved web interface."
     "https://herbie.uwplse.org/doc/latest/release-notes.html"
     "https://docs.rs/egg/latest/egg/index.html")
    ("July 14, 2021" "I gave a talk at @FPTalks 2021@,
     the second annual research conference hosted by the FPBench team,
     complete with 20 virtual talks.
     Please join us next year (hopefully in person!).
     My talk was a shortened version of the one Oliver and I gave at ARITH '21."
    "http://fpbench.org/talks/fptalks21.html")
    ("March 27, 2021" "I released Minim version 0.2.1.
     The language contains over 130 built-in procedures and constants as well
     as a small standard library. As of 0.2.0, Minim can be run in a REPL or on a file.")
    ("October 28, 2020" "I released Minim version 0.1.0, the first release for the project,
      with minimal support for symbols, numbers, pairs, lists, and lambdas.
      It's hilarious that you can calculate e^x but you can't print \"Hello, World!\".
      Next steps: strings, hash tables, vectors, and everything else a language should have..."
      "https://github.com/bksaiki/Minim")
    ("June 24, 2020" "I attended FPTalks 2020, the first annual research conference hosted
      by the FPBench team, complete with 16 speakers, Zoom, and virtual hangouts.
      Please join us next year in June. Check out the @FPBench community@ page for more
      information." "https://fpbench.org")))

;; Papers
(define *paper-info*
  '(
    ;; class notes
    ("Real Analysis" "real-analysis"
      "folland/real-analysis.pdf" "real analysis notes from MATH 334/335 at UW")
    ("Complex Analysis" "complex-analysis"
      "gamelin/complex-analysis.pdf" "complex analysis notes from MATH 336 at UW")
    ("Numerical Analysis" "numerical-analysis"
      "numerical-analysis/numerical-analysis.pdf" "numerical analysis notes from MATH 464 at UW")
    ("Probability" "probability"
      "probability/probability.pdf" "probability notes from MATH/STAT 394 at UW")
    ;; papers
    ("Computer-Automated Rewriting" "computer-rewriting"
      "rewriting_blog/rewriting.pdf" "paper on computer-aided rewriting (written for ENGR 231)")
    ("Computer Number Systems" "computer-numbers"
      "computer_numbers_systems/paper.pdf" "paper on computer number systems (written for MATH 336)")
    ("Construction of Numbers" "construction-of-numbers"
      "construction_of_numbers/construction_of_numbers.pdf" "constructing numbers from first principles")
  ))
