export function cardsCheer(numberOfPacks: number) {
  let response
  switch (true) {
    case numberOfPacks < 3:
      response = `I see you just started! You have ${numberOfPacks} packs, let's add more!`
      break
    case numberOfPacks < 6:
      response = `I see you've got a taste for it! ${numberOfPacks} packs are something.`
      break
    case numberOfPacks < 9:
      response = `It would be nice to have time to learn all ${numberOfPacks} of your packs, wouldn't it?`
      break
    default:
      response = `It can't be that you really need ${numberOfPacks} packs!`
      break
  }
  return response
}
