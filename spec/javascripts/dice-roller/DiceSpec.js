describe("dice-roller dice", function() {
  var dice, $timeout, sides

  beforeEach(module('diceRoller'))

  beforeEach(inject(function (_$timeout_, DiceRollerDice) {
    $timeout = _$timeout_
  }))

  describe("for 10 sides", function () {
    beforeEach(inject(function (DiceRollerDice) {
      sides = 10
      dice  = new DiceRollerDice({ sides: sides, name: 'one-d10' })
    }))

    it("should set its sides to 10", function () {
      expect(dice.sides).toEqual(sides)
    })

    it("should set its name", function () {
      expect(dice.name).toEqual('one-d10')
    })

    describe("roll", function () {
      it("sets the dice to rolling, but do not change its face immediately", function () {
        dice.roll()
        expect(dice.rolling).toBeTruthy()
        expect(dice.face).toBeUndefined()
      })

      it("randomizes its face after a timeout, and sets it to not rolling", function () {
        spyOn(dice, 'randomizeFace').andReturn(2)

        dice.roll()

        $timeout.flush()

        expect(dice.rolling).toBeFalsy()
        expect(dice.face).toEqual(2)
      })
    })

    describe("randomizeFace", function () {
      it("generates a random number between 1 one the number of sides", function () {
        var faces = {}, face

        for (var i = 0; i < 1000; i++) {
          face = dice.randomizeFace()

          faces[face] = (faces[face] || 0) + 1

          expect(face).toBeLessThan(sides + 1)
          expect(face).toBeGreaterThan(0)
        }

        for (i = 1; i <= sides; i++) {
          expect(faces[i]).toBeGreaterThan(0, "face " + i + " should have appeared, but it didn't")
        }
      })
    })

    describe("generateFaces", function () {
      it("should return faces from 0 to 9", function () {
        expect(dice.generateFaces()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      })
    })
  })

  describe("for 20 sides", function () {
    beforeEach(inject(function (DiceRollerDice) {
      sides = 20
      dice = new DiceRollerDice({ sides: sides, name: 'a-d20' })
    }))

    it("should set its name", function () {
      expect(dice.name).toEqual('a-d20')
    })

    it("should set its sides to 20", function () {
      expect(dice.sides).toEqual(sides)
    })

    describe("roll", function () {
      it("sets the dice to rolling, but do not change its face immediately", function () {
        dice.roll()
        expect(dice.rolling).toBeTruthy()
        expect(dice.face).toBeUndefined()
      })

      it("randomizes its face after a timeout, and sets it to not rolling", function () {
        spyOn(dice, 'randomizeFace').andReturn(18)

        dice.roll()

        $timeout.flush()

        expect(dice.rolling).toBeFalsy()
        expect(dice.face).toEqual(18)
      })

      describe("when it is already rolling", function() {
        it("won't randomize face more than once", function () {
          spyOn(dice, 'randomizeFace').andReturn(18)

          dice.roll()
          dice.roll()

          $timeout.flush()

          expect(dice.randomizeFace.calls.length).toEqual(1)
        })
      })
    })

    describe("randomizeFace", function () {
      it("generates a random number between 1 one the number of sides", function () {
        var faces = {}, face

        for (var i = 0; i < 1000; i++) {
          face = dice.randomizeFace()

          faces[face] = (faces[face] || 0) + 1

          expect(face).toBeLessThan(sides + 1)
          expect(face).toBeGreaterThan(0)
        }

        for (i = 1; i <= sides; i++) {
          expect(faces[i]).toBeGreaterThan(0, "face " + i + " should have appeared, but it didn't")
        }
      })
    })

    describe("generateFaces", function () {
      it("should return faces from 1 to 20", function () {
        expect(dice.generateFaces()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
      })
    })
  })
})