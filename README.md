# tic-tac-tato
testing heroku

/*HEROKU STUFF


- ALRIGHT: tried lots of things, it either needs a server/database OR jsdom might help. Problem is, document is not defined in nodejs and I got to define it for the thing to even run.

https://github.com/jsdom/jsdom

- appears to need a package.json file
- will probably have to add server and db since heroku seemsm to only work with node.js and can't just do standalone pages.
- get rid of composer.json and index.php probably.

- looking grim, tried a bunch of things, prob gonna need to make a server and database or something. At least a server might not need a database.

*/



/*

What I've done so far:
  I have made everything hard coded

What I need to do:
  Need to figure out how to check winners, and ties.

  - 13 ways to win.

  /// => Gameplan
    -- basically I have to make a virtual object, that is a representation of the game. This is what gets checked to see if someone is winning
    -- Might make this an array of arrays that'd be cool
    -- Whatever happens in this needs to be reflected in the DOM. but the DOM isn't what I check.


  - need to fix counter, when hiding letter, needs to remove from letter clicked. Else you can do some weird shit.
*/