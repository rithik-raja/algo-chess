# [AlgoChess](https://algochess.xyz)

A simple wagering application on the Algorand blockchain built around chess and its variants. Using smart contracts written in [Reach](https://reach.sh), it enables peer-to-peer wagering in a trustless manner.\
A user will interact with the platform in the following manner:
1. Decide the particulars of the game and pay a wager.
2. Send a link to a friend that allows them to join the game and pay their side of the wager.
3. The [backend](https://github.com/imfeelingitchy/algo-chess-backend) monitors the game and pays out the pot to the winner.

Other relevant features:
- The wagers are handled by a smart contract and the outcome of the game is decided by a centralized oracle. This is what makes the wagering process trustless.
- Provision to rejoin the game even if users get disconnected while making transactions.
- Returning of funds to participants even if the centralized oracle, for some reason, fails.
