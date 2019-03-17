# Cloned Copy of https://github.com/udacity/frontend-nanodegree-arcade-game for use as starter code.

# Classic Arcade Game Clone Project

## Table of Contents
- [Introduction](#intro)
- [Instructions](#instructions)
- [File Structure](#file_structure)
- [The Why of it](#why)
- [Known Issues](#issues)


<a name="intro"/>
## Introduction

This is my version of the frogger style classic arcade game done for Udacity's Front End Nanodegree Program.
This is not a production ready project but was used to explore javascript classes and es6 object oriented programming concepts in greater detail.


<a name="instructions"/>
## Instructions

This is a browser based game that should work in most, if not all, modern day browsers that support es6.
Simply clone or download this directory and open index.html, located in the root folder, in your browser.
This app was tested using Version 73.0.3683.75 of Google Chrome.


<a name="file_structure"/>
##File Structure

```
.
├── css                             # associated styleshees created by Udacity
├── images                          # default images for the game created by Udacity
├── js                              # javascript files
|    |__
|      ├── app.gameController.js   # gameController class and implementation (majority of game logic)
|      ├── app.levels.js           # game level layout file
|      ├── app.models.js           # game models, contains model class files (formerly app.js)
|      ├── engine.js               # the given Udacity javascript gameEngine (loop and animation consistency engine)
|      ├── resources.js
|
├── index.html                      # html and starting point for the application
└── README.md                       # this read me file
```


<a name="why"/>
##The Why of it

To, somewhat, quote Mythbusters "Why we Did what we did, and didn't do what we didn't do".
The original game specifications weren't too difficult. I have not worked with javascript in many years and decided to
see what kind of foundation I could build up using es6. I realize that es6 is mostly "syntactic sugar" but, isn't all code? Ignoring machine code of course.

I started with a much more grandiose project. [fend_arcade_clone original](https://github.com/TomTheToad/fend_arcade_game)
I decided that I had taken that repo a little too far. My original idea was to incorporate everything into class files as much as possible, including the game engine. I was hoping that I could keep most, if not all, out of the global scope and incorporate STATIC methods for the animation engine. It kind of worked, meaning it didn't. It ended being a whack-a-mole style venture with scope issues. I was able to incorporate quite a bit from that repo into this one. Notably the gameController, gameBlockGrid builder, and more base gamePiece and dynamicGamePiece classes. My hope was to make them as loosely coupled as possible. In this respect, I failed utterly. I did however, learn more than I bargained for about es6 classes and scope.


<a name="issues"/>
##Known issues

First and foremost: These classes are too tightly coupled for my taste. I realize this isn't really an "issue" but I had been hoping for better. Secondarily: You man find a "magic number" or two. Places that I had to adjust the area of effect or offset for a given graphic. The code comments expose these "adjustments" and make suggestions as to how to better deal with them if there was a future version.