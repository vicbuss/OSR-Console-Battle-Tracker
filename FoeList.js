class FoeList {
    
    #foeName; // String
    #numberOfMonsters; // int
    #hdScore; // int
    #hdModifier; // int
    #foeList; // list of objects with the properties "name" and "hp"

    /* 
    
        Constructor takes as arguments the foe's name (String), the number of monsters (int),
        their HD score (int) and modifier (int).
        
        E.g.: 
        
        let gnolls = new FoeList("Gnoll", 4, 2, 0); 
        
        Will generate Gnoll 1, Gnoll 2, Gnoll 3, and Gnoll 4, with 2-16 hit points each.
    
    */

    constructor(foeName, numberOfMonsters, hdScore, hdModifier) {
        this.#foeName = foeName;
        this.#numberOfMonsters = numberOfMonsters;
        this.#hdScore = hdScore;
        this.#hdModifier = hdModifier;
        this.#foeList = this.#hdRoller(numberOfMonsters, hdScore, hdModifier)
    } 

    /* 
        Manipulates Math.random() to simulate a dice roll to be used in the hdRoller function.
        It's general purpose and can also roll other types of die, not only d8s. 
    */ 

    #rollDice(numberOfDice, numberOfSides) {
        let maxMultiplier = numberOfSides + (numberOfDice - 1) * (numberOfSides - 1);
        let minResult = 1 * numberOfDice;
        let result = Math.floor(Math.random() * maxMultiplier + minResult);
        return result;
    }

    /* 
        Takes the number of monsters to be generated and their HD score. It then rolls for their HP
        individually, gives them a unique name ({foeName} 1, {foeName} 2, etc.) and pushes them to
        the foe list.
    */

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

    /*
        First checks if all foes are dead. If not, prints the number of living foes and a list
        with their names and current HP.
    */

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

    /*
        Takes a foe by its index in the foe list and the damage it received. It then
        subtracts the damage from the foe's HP and prints it to the console. If the foe
        loses all its HP it removes it from the foe list and prints a message to the console. 
    */

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