// describe('My Test Suite', () => {
//     it('My Test Case', () => {
//       expect(true).toEqual(true);
//     });
//   });

// function calcul(a , b )
// {
//     return a+b
// }



// describe("test calcul", () => {
//     it("test calcul", () => {
//       expect(calcul(2,2)).toEqual(4);
//     });
// });


//FlashCard Mob
import FlashCardMob from "./views/Mobile/FlashCard/index"
describe("Color case flashcard Mob", () => {
    it("Color case flashcard Mob", () => {
      expect(FlashCardMob.colorcase("Response B" , "Response B")).toEqual(true);
    });
});
