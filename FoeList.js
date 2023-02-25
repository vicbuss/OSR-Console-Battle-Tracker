class FoeList {
    constructor(foeName, numberOfMonsters, hdScore, hdModifier) {
        this.foeName = foeName;
        this.numberOfMonsters = numberOfMonsters;
        this.hdScore = hdScore;
        this.hdModifier = hdModifier;
        this.hdArray = this.hdRoller(numberOfMonsters, hdScore, hdModifier)
    } 

    rollDice(numberOfDice, numberOfSides) {
        let maxMultiplier = numberOfSides + (numberOfDice - 1) * (numberOfSides - 1);
        let minResult = 1 * numberOfDice;
        let result = Math.floor(Math.random() * maxMultiplier + minResult);
        return result;
    }

    hdRoller(numberOfMonsters, hdNumber, modifier) {
        let hdArray = [];
        let roll = 0;
        for(let i = 0; i < numberOfMonsters; i++) {
            roll = this.rollDice(hdNumber, 8);
            let rollResult = roll + modifier;
            hdArray.push(rollResult);
        }
        return hdArray;
    }

    status() {
        let numberOfLivingMonsters = this.hdArray.length;

        if (numberOfLivingMonsters === 0) {
            console.log("All foes are vanquished!")
        } else {
            console.log("There are " + numberOfLivingMonsters + " living " + this.foeName + "s...");
            console.log("Their current HP is: ")
            
            for(let i = 0; i < numberOfLivingMonsters; i++) {
                let monsterStatus = `${this.foeName} ${i + 1} : ${this.hdArray[i]} hit points`
                console.log(monsterStatus);
            }
        }
    }

    damage(creatureIndex, damage) {
        this.hdArray[creatureIndex] -= damage;
        let damageMessage = `${this.foeName} ${creatureIndex + 1} lost ${damage} hit points!`
        console.log(damageMessage);
        
        if(this.hdArray[creatureIndex] <= 0) {
            this.hdArray.splice(creatureIndex, 1);
            let deathMessage = `${this.foeName} ${creatureIndex + 1} has been killed!`
            console.log(deathMessage);
        }
        this.status();
    }
}