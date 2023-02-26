# OSR Console Battle Tracker 🎲🐉

This is a console-run battle tracker for OSR-style games. It's still under development and is being built to aid me with tracking combat when running TTRPGs through discord.

## Current features

- Automatically generates a list of foes with distinct names for easy tracking;
- Rolls for each foe HP based on the number of Hit Die and modifiers;
- Tracks damage dealt to each foe and removes them from the list when they are killed.

## Planned features

- Read user input from the console for more intuitive use;
- Option to roll for HD with other types of dice (currently d8s);
- Option to also log foe AC, THAC0, Morale score, saves and attacks;
- Option to roll for attack and damage;
- Saving and loading foe list for future use.

## How to use

- Download the files to a folder;
- Navigate to the folder with the command prompt and load *main.js* with Node;
- Instantiate a foe list from the class FoeList, adding the arguments: name (String) - number of monsters (int) - number of HD (int) - modifier (int)
- Call the method *status()* to view the foe list.
- Call the method *damage(foeIndex, damageDealt)* to deal damage to a foe from the list. Note: the first foe on the list is index 0, the second index 1, and so forth... 