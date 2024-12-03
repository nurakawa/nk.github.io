---
title: "Linear Regression"
date: "2024-01-22"
summary: "A straightforward explanation of the linear regression model: how it is defined, how it is optimized, and when to use it."
description: "A straightforward explanation of the linear regression model: how it is defined, how it is optimized, and when to use it."
toc: false
readTime: true
autonumber: false
math: true
tags: ["database", "java"]
showTags: false
hideBackToTop: false
---

## Problem Setting

A regression problem involves estimating the relationship between two entities: a quantitative response variable and a predictor variable. This could be, for example, a person’s exam scores (the response) and the number of hours he spent studying (the predictor), or an item’s sale price and its cost of production.

In 1903 Karl Pearson collected data on the heights of 1,078 fathers and their full-grown sons; the following is a scatterplot of the data, where each point represents a father-son pair:

![Figure 1: A scatterplot of Pearson’s father-son pairs, obtained from [3].](../../linear-regression/pearson-scatterplot.png)

The trend in the scatterplot indicates some correlation between fathers’ and sons’ heights: taller fathers tend to have taller sons, and vice versa. However, not every father-son pair falls neatly into this trend. 

It would be useful to develop a quantitative model that can, in a way, summarize the relationship we observe in the data. Hence, to solve the __regression problem__ is to find some mathematical function that can take as input a predictor (the father’s height) and output a reasonably close estimate of the response (his son’s height). Because the trend appears to be linear, it makes sense to __assume that the mathematical function is a line__.

## The Linear Model

One approach to statistical modeling is to constrain the function that maps a father’s height to his son’s height to take a specific form. Linear Regression models the relationship between the response variable and its predictor variables as a line. A linear model takes the form:

$$y = \beta_0 + \beta_1X_i + \epsilon_i, \hspace{2em} i \in 1 \dots n$$

where $(X_i, y_i), \hspace{0.5em} i \in 1 \dots n$ are the _n_ observations of (predictor, response) pairs, $\beta_0, \beta_1$ are, respectively, the intercept and slope of the line. They are often referred to as the model parameters. The random error in the model is denoted as $\epsilon_i, \hspace{0.5em} i \in 1 \dots n$. 

In terms of our example, this model would be saying:

_A son’s height is equal to some constant (the intercept), plus a factor (the slope) multiplied by his father’s height, plus random error. This is estimated from 1,078 observations of father-son pairs._

In order to find the line best describes the relationship between father and son heights, we need to estimate the model parameters, or to find slope and intercept of the line.

## Optimization: Estimating the model parameters

How do we estimate the parameters, or coefficients, of this linear model?

Consider again the scatterplot of Pearson’s data, this time with two candidate linear regression models. What would be the better line to summarize the trend we see in the cloud of points — the solid line, or the dashed line?

![Figure 2: Pearson’s father-son pairs with sample regression lines, from [2].](../../linear-regression/pearson-scatterplot-regression.png)

The line that would best summarize, or fit, all the data would follow it as closely as possible. This means that the total distance between the regression line and each data point is as small as possible. As a result, if we were to use this line to predict a son’s height given his father’s height, the prediction would, on average, have the smallest amount of error relative to the data. Any other line would be biased — it would be a better fit for some points than for others.

Below, we see a visualization of what this means: if we add all the vertical lines, or _residuals_, between the points and the line, this sum would be as small as possible.

![Figure 3: Fitting a regression line, from [2].](../../linear-regression/regression-line.png)

To find the best fitting line we can use the __least squares optimization method__: we define a cost function of our parameters to be the Residual Sum of Squares and compute its solution.

For a single observation, its residual would be:

$$r_i = y_i - (\beta_0 + \beta_iX_i)$$

(We can ignore the $\epsilon$ term).

The dashed vertical lines in Figure 3 are residuals.We define the __Residual Sum of Squares (RSS)__ as the sum of the squared residuals:

$$RSS = \sum_{i=1}^{n}r_i^2 = \sum_{i=1}^{n} (y_i - (\beta_0 + \beta_iX_i))^2$$

The reason why we sum the squared residuals is to obtain a __quadratic__ function, which has a closed-form solution. This way we can directly solve for the $\beta$ parameters by taking the derivative with respect to each parameter and setting them to equal zero. This can be done manually, or using statistical software.

After optimization we obtain the fitted linear model:

$$\hat{y} = \hat{\beta_0} + \hat{\beta_1}X_i, \hspace{2em} i \in 1 \dots n$$

where our estimates for the $\beta$ parameters are denoted with “^”, and our “fitted values”, or predicted values, are the y observations denoted with “^”.

## Making predictions

To make predictions for a new observation, we use our estimated parameters and our formula for the fitted regression model:

$$\hat{y_\text{new}} = \hat{\beta_0} + \hat{\beta_1}x_\text{new}$$

Another way to look at the linear regression model is that it models an average. Each prediction is the expected value given our data; in other words, it is what we would expect to see, on average. For a more complete prediction, we could derive prediction intervals based on properties of our estimated parameters.

## Assumptions of a Linear Regression model

We cannot always use a linear model for regression problems. Before fitting a model, we have to check for the following:

__(A1) Conditional Independence__: The response observations are conditionally independent given the predictor observations. This means that for any observation, the value of its response does not change given the presence of another observation. This would be broken if, for example, students cheat on an exam; then, one student’s exam score would depend on the presence of another student.

__(A2) Constant Variance__: Observations of the response variable are uncorrelated and have constant variance. The variance term is called σ². This would be broken if, for example, the response is recorded on a device that has decreasing precision over time; the variance in measurements would increase with time.

__(A3) Errors are independent, with Gaussian distribution and zero-mean__: The deviations of the response around its expectations, modeled with the random error term epsilon , has a Gaussian distribution with a mean of 0 and a variance of $\sigma^2$. In mathematical notation:

$$\forall i \hspace{1em} \epsilon_i \sim \mathcal{N}(0, \sigma^2)$$


### Why are these assumptions necessary to fulfill ?

These assumptions allow us to draw conclusions about the presence of bias and about the distribution of our estimated parameters. It follows that we can perform statistical hypothesis testing on our estimates of the model parameters. This is useful because:  

- A hypothesis test can show statistical significance that an estimated coefficient is nonzero; in other words, that the estimated relationship between a predictor and a response exists and is not trivial.

- We can derive confidence intervals for a parameter estimates, meaning that we give a range of the magnitude of a relationship between a predictor and a response. Because our parameter estimates depend on our data, confidence intervals allow for more realistic predictions.  

- Breaking these assumptions can lead to poor model fit and poor prediction results.


## When to use a linear model for regression problems

The simple linear regression model described in this post can be generalized to be used for a larger number of predictors, and it has many adaptations for more complex regression problems. As in our example, linear models make sense to use if exploratory data analysis shows linear relationships between predictors and a response variable.

There are many advantages to using linear models, including ease of optimization, useful statistical properties of its estimates and direct interpretation of the parameters. If a linear model fits well to the data, then it is better to use it instead of fitting a more complex model.

However, it is important to remember that linear regression models only work well when the assumptions it makes on the data are met.