#lang racket

(require (only-in xml write-xexpr xexpr->string)
         (only-in markdown parse-markdown)
         "common.rkt" "data.rkt")

(provide generate-blog-index)

(define (gather-pages dir)
  (define path (string->path dir))
  (cond
   [(directory-exists? path)
    (for/list ([fname (in-directory dir)]
                #:when (file-exists? fname)
                #:when (equal? (filename-extension fname) #"md"))
      fname)]
   [else
    (printf "Blog directory does not exist!\n")
    (list)]))

(define (read-lines lines name)
  (unless (equal? (first lines) "---")
    (error 'read-lines "Expected a header at the top of '~a'" name))
  (define table (make-hash))
  (for ([line (cdr lines)] #:break (equal? line "---"))
    (define kv (string-split line ": "))
    (unless (> (length kv) 1)
      (error 'read-lines "Expected a '<key>: <value> ...' binding in '~a'" name))
    (define key (string->symbol (string-downcase (car kv))))
    (define vals
      (for/list ([v (cdr kv)])
        (if (and (string-prefix? v "\"") (string-suffix? v "\""))
            (substring v 1 (- (string-length v) 1))
            v)))
    (hash-set! table key vals))
  (values table (drop lines (+ (hash-count table) 3))))

(define (read-body lines)
  (let loop ([lines lines]  [parsed '()] [space? #t])
    (cond
     [(null? lines) (reverse parsed)]
     [else
      (define ps (parse-markdown (car lines)))
      (cond
       [(null? ps) (loop (cdr lines) parsed #t)]
       [(and (not (null? parsed)) (not space?) ; collapse paragraphs
             (equal? (caar ps) 'p)
             (equal? (caar parsed) 'p))
        (if (null? (cddar ps))
            (loop (cdr lines) parsed #f)
            (let ([ps* (cddar ps)] [parsed* (cddar parsed)])
              (loop (cdr lines)
                    (cons `(p () ,@parsed* " " ,@ps*) (cdr parsed))
                    #f)))]
       [(and (not (null? parsed)) (not space?)  ; collapse block quotes
             (equal? (caar ps) 'blockquote)
             (equal? (caar parsed) 'blockquote))
        (if (null? (cddar ps))
            (loop (cdr lines) parsed #f)
            (let ([ps* (caddar ps)] [parsed* (cddar parsed)])
              (loop (cdr lines)
                    (cons `(blockquote () ,@parsed* ,ps*) (cdr parsed))
                    #f)))]
       [else (loop (cdr lines) (cons (car ps) parsed) #f)])])))

(define (generate-page fname meta body)
  (define out (open-output-file (build-path *out-dir* fname) #:mode 'text #:exists 'replace))
  (define title (first (hash-ref meta 'title)))
  (define date (string->date (first (hash-ref meta 'date))))
  (define updated (string->date (first (hash-ref meta 'last))))
  (define lines (read-body body))
  (fprintf out "<!doctype html>\n")
  (write-xexpr
   `(html
     (head
      (meta ([charset "utf-8"]))
       (title ,*name*)
       (link ([rel "icon"] [type "image/png"] [href "../resources/favicon.ico"]))
       (link ([rel "stylesheet"] [type "text/css"] [href "../main.css"]))
       (link ([rel "stylesheet"] [type "text/css"] [href "../blog.css"])))
     (body
      (div ([id "main-section"])
       (div ([id "header"])
        (h2 ([id "header-title"])
         ,*name*))
       (div ([id "back-button"])
        (p ,@(insert-links "@< Back@" "../blog.html")))
       (h3 ,title)
       (div ([class "section-body"])
        (h4 ([class "blog-header"]) ,date)
        (div ([class "blog-body"])
          ,@(append lines)
          (div ([id "postscript"])
            (p ,(format "Last updated: ~a" updated))
            (p ,@(insert-links "This work is licensed under a @Creative Commons Attribution-ShareAlike 4.0 International License@."
                               "http://creativecommons.org/licenses/by-sa/4.0/"))))))))
               
    out))

(define (generate-page-entry file)
  (define in (open-input-file file #:mode 'text))
  (define lines (port->lines in #:close? #t))
  (define fname (path->string file))
  (define fname* (string-replace fname ".md" ".html"))
  (define-values (meta body) (read-lines lines fname))
  (hash-set! meta 'link fname*)
  (printf " Rendering \"~a\" ...\n"
    (first (hash-ref meta 'title (list "Unnamed"))))
  (generate-page fname* meta body)
  meta)

(define (generate-blog-index out)
  (define pages (gather-pages *blog-dir*))
  (define out-dir (build-path *out-dir* *blog-dir*))
  (unless (directory-exists? out-dir)
    (make-directory out-dir))
  (define entries
    (sort (map generate-page-entry pages) >
      #:key (λ (x) (let ([date (first (hash-ref x 'date))])
                     (string->number (string-replace date "-" ""))))))
  (fprintf out "<!doctype html>\n")
  (write-xexpr
   `(html
     (head
      (meta ([charset "utf-8"]))
       (title ,*name*)
       (link ([rel "icon"] [type "image/png"] [href "resources/favicon.ico"]))
       (link ([rel "stylesheet"] [type "text/css"] [href "main.css"]))
       (link ([rel "stylesheet"] [type "text/css"] [href "blog.css"])))
     (body
      (div ([id "main-section"])
       (div ([id "header"])
        (h2 ([id "header-title"])
         ,*name*))
       (div ([id "back-button"])
        (p ,@(insert-links "@< Back@" "index.html")))
       (h3 "Blog")
       (div ([class "section-body"])
       ,(insert-table "blog-table"
         (cons
          (list "Date" "Title" "Tags")
          (for/list ([entry entries])
            (let ([date (string->date (first (hash-ref entry 'date)) #:short-month #t)]
                  [title (first (hash-ref entry 'title))]
                  [link (hash-ref entry 'link)]
                  [tags (hash-ref entry 'tags)])
              `(,date ,@(insert-links (format "@~a@" title) link) ,@tags))))
         #:bold? #t)))))
    out))
