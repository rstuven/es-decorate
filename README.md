# es-decorate

> ES7 decorators for CoffeeScript

## Why

Libraries such as
[Angular](https://angular.io/docs/js/latest/api/annotations/)
and
[Aurelia](http://eisenbergeffect.bluespire.com/aurelia-update-with-decorators-ie9-and-more/)
are starting to use decorators according to the API proposed in
https://github.com/wycats/javascript-decorators
which is supported in Babel 5+ and TypeScript 1.5

On the other hand, it seems CoffeeScript
won't be adding decorators any time soon:
- https://github.com/jashkenas/coffeescript/issues/76
- https://github.com/jashkenas/coffeescript/issues/996

`es-decorate` fills the syntactic gap providing a
helper function that can apply decorators compliant
with the proposed decorator API.

## Install

    npm install --save es-decorate

## Usage

Following the examples in https://github.com/wycats/javascript-decorators:

``` coffeescript
decorate = require 'es-decorate'

# Class decorator must be assigned to variable or property.
Foo = decorate F('color'), G, class #  Class name is optional in CoffeeScript

  # Method with redundant name
  bar: decorate 'bar', @, F('color'), G, ->

  # Or just...
  decorate 'baz', @, F('color'), G, ->
  #  ...if no code analyzer will miss the explicit method declaration
```

Multiline declaration:

``` coffeescript
Foo = decorate [
  F 'color'
  G
  H
  I 123
  J
  ], class Foo
```

Less dumb example, using Angular 2:

``` coffeescript
decorate = require 'es-decorate'
{Component, View} = require 'angular2/angular2'

AppComponent = decorate [
  Component selector: 'my-app'
  View template: '<h1>My first Angular 2 App</h1>'
], class AppComponent
  constructor: ->
```
