export function cardsCheer(numberOfCards: number) {
  let response
  switch (true) {
    case numberOfCards < 5:
      response = `I see you just started! You have ${numberOfCards} cards, let's add more!`
      break
    case numberOfCards < 20:
      response = `You have the average amount of cards. ${numberOfCards} by the way`
      break
    case numberOfCards < 40:
      response = `I see you've got a taste for it! ${numberOfCards} cards are something.`
      break
    case numberOfCards < 100:
      response = `It would be nice to have time to learn all ${numberOfCards}, wouldn't it?`
      break
    default:
      response = `It can't be that you really need ${numberOfCards} cards!`
      break
  }
  return response
}
