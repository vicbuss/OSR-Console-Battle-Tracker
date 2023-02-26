class FoeList {
    
    #foeName;
    #numberOfMonsters;
    #hdScore;
    #hdModifier;
    #foeList;

    constructor(foeName, numberOfMonsters, hdScore, hdModifier) {
        this.#foeName = foeName;
        this.#numberOfMonsters = numberOfMonsters;
        this.#hdScore = hdScore;
        this.#hdModifier = hdModifier;
        this.#foeList = this.#hdRoller(numberOfMonsters, hdScore, hdModifier)
    } 

    #rollDice(numberOfDice, numberOfSides) {
        let maxMultiplier = numberOfSides + (numberOfDice - 1) * (numberOfSides - 1);
        let minResult = 1 * numberOfDice;
        let result = Math.floor(Math.random() * maxMultiplier + minResult);
        return result;
    }

    #hdRoller(numberOfMonsters, hdNumber, modifier) {
        let foeList = [];
        let roll = 0;
        for(let i = 0; i < numberOfMonsters; i++) {
            roll = this.#rollDice(hdNumber, 8);
            let foe = {
                "name" : `${this.#foeName} ${i + 1}`,
                "hitPoints" : roll + modifier
            }
            foeList.push(foe);
        }
        return foeList;
    }

    status() {
        let numberOfLivingMonsters = this.#foeList.length;

        if (numberOfLivingMonsters === 0) {
            console.log("All foes are vanquished!")
        } else {
            console.log(`There are ${numberOfLivingMonsters} living ${this.#foeName}s`);
            console.log("Their current HP is: ");

            for(let i = 0; i < numberOfLivingMonsters; i++) {
                let monsterStatus = `${this.#foeList[i].name} : ${this.#foeList[i].hitPoints} hit points`
                console.log(monsterStatus);
            }
        }
    }

    damage(creatureIndex, damage) {
        this.#foeList[creatureIndex].hitPoints -= damage;
        let damageMessage = `${this.#foeList[creatureIndex].name} lost ${damage} hit points!`
        console.log(damageMessage);
        
        if(this.#foeList[creatureIndex].hitPoints <= 0) {
            let deathMessage = `${this.#foeList[creatureIndex].name} has been killed!`;
            this.#foeList.splice(creatureIndex, 1);
            console.log(deathMessage);
        }
        this.status();
    }

}

module.exports = FoeList; 