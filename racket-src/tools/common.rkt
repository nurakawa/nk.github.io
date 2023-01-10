#lang racket

(provide insert-links insert-table string->date)

(define (insert-links str . links)
  (define splits
    (let loop ([splits (string-split str "@")])
      (cond
       [(null? splits) '()]
       [(= (length splits) 1) splits]
       [(= (length splits) 2)
        (define next (cadr splits))
        (if (zero? (string-length next))
            (list (string-append (car splits) "@"))
            (cons (car splits) (loop (cdr splits))))]
       [else
        (define next (cadr splits))
        (if (zero? (string-length next))
            (cons (string-append (car splits) "@" (caddr splits)) (loop (cdddr splits)))
            (cons (car splits) (loop (cdr splits))))])))
  (for/fold ([r '()] [link? (string-prefix? str "@")] [links links] #:result (reverse r))
            ([s splits])
    (cond
     [(zero? (string-length s))
      (values (cons "@" r) link? links)]
     [link?
      (values (cons `(a ([href ,(car links)]) ,s) r)
              #f (cdr links))]
     [else
      (values (cons s r) #t links)])))

(define (insert-table-row row #:bold? [bold? #f])
  (if bold?
      `(tr (th ([style "font-weight: bold"]) ,(car row))
        ,@(for/list ([col (cdr row)])
            `(td ([style "font-weight: bold"]) ,col)))
      `(tr (th ,(car row))
        ,@(for/list ([col (cdr row)])
            `(td ,col)))))

(define (insert-table id data #:bold? [bold? #f])
  `(table ([class ,id])
    ,@(if bold?
          (cons (insert-table-row (car data) #:bold? #t)
                (for/list ([row (cdr data)]) (insert-table-row row)))
          (for/list ([row data]) (insert-table-row row)))))

(define (month->string month)
  (match month
    [(or "1" "01")  "January"]
    [(or "2" "02")  "February"]
    [(or "3" "03")  "March"]
    [(or "4" "04")  "April"]
    [(or "5" "05")  "May"]
    [(or "6" "06")  "June"]
    [(or "7" "07")  "July"]
    [(or "8" "08")  "August"]
    [(or "9" "08")  "September"]
    ["10"           "October"]
    ["11"           "November"]
    ["12"           "December"]
    [_ (error 'month->string "Not a month ~a\n" month)]))

(define (string->date str #:short-month [sm? #f])
  (define splits (string-split str "-"))
  (unless (= (length splits) 3)
    (error 'string->date "Illegal date ~a\n" str))
  (define month (month->string (second splits)))
  (define month* (if sm? (substring month 0 3) month))
  (format "~a ~a, ~a\n" month* (third splits) (first splits)))
