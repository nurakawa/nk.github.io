#lang racket

(require (only-in xml write-xexpr xexpr->string))
(require "common.rkt" "data.rkt")

(provide generate-papers-index)

(define (copy-papers index)
  (for/list ([(name info) (in-dict index)])
    (match-define (list link loc desc) info)
    (let ([src-path (build-path *papers-dir* loc)]
          [dest-path (build-path *out-dir* *papers-dir* (format "~a.pdf" link))])
      (copy-file src-path dest-path #t))))

(define (generate-papers-index out)
  (define sorted-papers (sort *paper-info* string<? #:key car))
  (copy-papers sorted-papers)
  (fprintf out "<!doctype html>\n")
  (write-xexpr
   `(html
     (head
      (meta ([charset "utf-8"]))
       (title ,*name*)
       (link ([rel "icon"] [type "image/png"] [href "resources/favicon.ico"]))
       (link ([rel "stylesheet"] [type "text/css"] [href "main.css"])))
     (body
      (div ([id "main-section"])
       (div ([id "header"])
        (h2 ([id "header-title"])
         ,*name*))
       (div ([id "back-button"])
        (p ,@(insert-links "@< Back@" "index.html")))
       (h3 "Papers")
       (div ([class "section-body"])
        (p "An archive of short papers, class notes, and more.")
        ,@(for/list ([(name info) (in-dict sorted-papers)])
           (match-define (list link loc desc) info)
           (let ([paper-path (format "~a/~a.pdf" *papers-dir* link)])
            `(p ,(car (apply insert-links (list (format "@~a@" name) paper-path)))
                ,(format " - ~a" desc))))))))
    out))
