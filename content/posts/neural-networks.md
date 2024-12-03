---
title: "Neural Networks"
date: "2022-02-20"
summary: "A simple explanation of neural networks: their definition, optimization, and use cases."
description: "This article presents a brief explanation of artificial neural networks and how they are used for prediction. It presents the material in two ways: first, in plain language without any mathematics; second, in simple language but with some mathematical notation."
toc: true
readTime: true
autonumber: false
math: true
tags: ["database", "java"]
showTags: false
hideBackToTop: false
---
_This blog post presents a brief explanation of artificial neural networks and how they are used for prediction. It presents the material in two ways: first, in plain language without any mathematics; second, in simple language but with some mathematical notation. This is certainly not the only article that introduces neural networks - there are plenty of excellent blog posts, videos and courses on the subject. What we aim to contribute is a way for a reader to learn the main ideas about neural networks without spending time on
mathematical notation and computing derivatives. After becoming more comfortable with the main ideas, the reader can then move on to the more mathematical explanation, which is heavily based on the style and notation of Nielsen (2018). Additionally, we include a brief discussion on a related, but very important, sub-topic: the scenarios when we would, and would not, want to use a neural network._

## High-level overview (no math)

A neural network is a computing system that is used to model a function that maps a set of inputs to their corresponding outputs. Inputs could be, for instance, peoples’ browsing history on an e-commerce platform, and the outputs could be the probability that each person would click on an advertisement. Or, inputs could be a set of images of animals, and their corresponding outputs could be the answer to the question, “is this image a cat?” A neural network that has been presented with a lot of examples of such inputs will become quite good at recognizing the patterns and get a sense of how inputs relate to outputs. The network can process an input - a list of products a person has viewed online, or an image of an animal - that it has not seen before and, based on what it learned, correctly determine how likely the person would click on an advertisement, or whether an image is of a feline.

The neural network model is a collection of inter-connected nodes, or neurons, arranged in layers. The first layer is an input layer, which yields a mathematical representation of input of the function. The final layer is an output layer, which yields the output of the neural network, or its prediction. Between the first and final layers are usually at least one “hidden layer”, or layers of interconnected neurons. Figure 1 presents an example of a neural network with two hidden layers.

### How neural networks process information

Each individual neuron in a neural network functions as a decision-maker: it reads in bits of information, weights and sums the bits of information, and then outputs a decision. By arranging several neurons into a layer, we can make decisions from multiple inputs. With each layer, the network can make more complicated decisions - decisions that are based on input from the previous layer. That is why neural networks are often designed with several hidden layers - to be able to estimate very complex relationships between input and output. Returning to the cat-recognition example, one can imagine each neuron in the hidden layer of Figure 1 making a decision on the input. The first hidden layer’s neurons could ask “does the image depict a tail?” or “does the animal in the image have a face?”. In the second hidden layer, the questions could be more detailed, such as, “if the animal has a face, does the face have two eyes and a nose and whiskers?”

A neural network learns by seeing a lot of examples for which we have a desired output. For each example it sees, a network can adjust its decision-making mechanisms. Technically, this means adjusting its neurons’ weights, which represent how much value a neuron given to each input, and its neurons’ biases, which represent by how much individual neurons shift their decisions. The final weights and biases in a network are those that make the total difference between the output of the neural network and the desired output as small as possible. With each example, the network makes an adjustment of its weights and biases. Once the network is trained with a very large number of examples, it can make good predictions for unseen examples.


So, how exactly do we train a neural network to learn the relationship between input and output ?

### How to train a neural network

When we feed an input into the neural network, we want the network’s output of the neural network to be as close as possible to the desired output - the “ground truth” output associated with the input. So, we can start by expressing the difference between the network’s output and the desired output as a cost function. Then, we can use standard optimization techniques to find the set of weights and biases of the network that minimize the cost function.

#### Gradient Descent

A standard way of minimizing a cost function is with gradient descent - we start at a random feasible point and iteratively move in the direction where we decrease the cost function fastest, until we (hopefully) reach a minimum. For neural networks, this means shifting the weights and biases of each neuron in the network, such that the network as a whole has minimal cost. In order to do this, however, we need to be able to determine in what direction to move - this means computing how the cost function changes with respect to all the weights and biases in a network. For large networks, this task is quite challenging! Hence, we use the backpropagation algorithm: a method for computing the change in a neural network’s cost function with respect to each weight and bias in the neuron.

#### Backpropagation

