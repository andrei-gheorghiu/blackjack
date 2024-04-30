# Blackjack game prototype

## Approach

I used the challenge as an opportunity to explore the possibility to bring into Vue 3 some concepts I learned while working with React. Most importantly, I wanted to test implementing Storybook in Vue3 and how it would play with testing components.

## Storybook + Vitest in Vue - not a good combination right now

The whole point of having Storybook is being able to create some snapshots of components with particular states, which would then make testing really easy. Unfortunately, the choice I made for testing library (Vitest) is not fully supported by Storybook. Given more time, I'd probably rewrite the tests using `@testing-library/vue`, which I see from examples are compatible.

Given the subject of the challenge, I took it on more as an opportunity to play with different possibilities and concepts and I didn't have the same calculated, strict and rigorous approach I would have had if this was a real project, for a real client. I hope that's not a problem.

## Requirements / game features
As for the requirements, I made a few design choices which are arguably unnecessary, but, since it was just a PoC, I wanted to set the bar higher:
- ability to have more than 1 player
- ability to have more than 1 deck
- I created a base class PlayingCard which I then extended into BlackjackCard with the idea in mind that, if other card games are added to the app, they wouldn't share the same card values
- I made the Ace have both possible values (`[1, 11]`). To comply with initial requirements, `1` can easily be removed from `src/types/blackjack.ts > BLACKJACK_CARD_VALUES > ACE`.

## Next steps

Here's what I would do next, if I was to work more on it (probably in this order):
 - add the concept of Bank to each player, eventually coupled with an algorithm to increase the minimum bet, as the game progresses
 - add ability to split hand, up to three times in the same hand, given the player has sufficient funds
 - add ability to double
 - add an intro screen where one could add/remove/name players
 - add staggered card animations, where each card would come in from the top side of the screen, as a dealer would throw them on a bj table
 - add intermediary screens between player turns (Heroes 3 style), which would allow a few friends the ability to play the game together on the same machine, provided they don't look at the screen when it's the another players' turn
 - improve responsiveness for mobile: a vertical display of player hands on mobile would probably feel better; I'd need to test a bit before figuring out what works best, eventually researching some mobile playing card app layouts
 - something I'd be really interested in is exploring a multiplayer mode, where one player would host the game and others would connect as Player 2, 3, 4, etc... This would require slightly rethinking the UI. It would be particularly useful if the app was to be packaged as a mobile app. I've always wanted to explore connecting a few devices over bluetooth or Wi-Fi for a small game like this. Anyway, that's almost a separate project and off-topic here.
 - create a few reasonable game options:
   - dealer hits on soft 17
   - optional: remember last bet size vs reset to default
   - add surrender option
   - add hints (see https://www.techopedia.com/gambling-guides/blackjack-strategy)
   - add a help page (basic strategy, tips, etc...)
 
## Enjoyed

These are all my thoughts on this, at the moment. I really enjoyed the challenge, felt like a breath of fresh air. Thanks!
