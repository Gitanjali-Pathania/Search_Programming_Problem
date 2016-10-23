Solution to the problem statement given in the file "ProgrammingProblem-Search-Part1_New.pdf"

Language used: Javascript

Design Pattern: Modular

Approach: 
			
			>Getting the input and splitting it line by line
			
			>Assigning weights to all the page and query keywords
			
			>Yielding Page Ratings for each query using the weights calculated in previous step
			
			>Formatting the output according to the sample output
			
			>Display the output


Try it out here :-

https://gitanjali-pathania.github.io//Search_Programming_Problem/index.html




Sample Input

P Ford Car Review 

P Review Car

P Review Ford

P Toyota Car

P Honda Car 

P Car

Q Ford

Q Car

Q Review

Q Ford Review

Q Ford Car

Q cooking French


Output for the Sample Input

Q1: P1 P3

Q2: P6 P1 P2 P4 P5

Q3: P2 P3 P1

Q4: P3 P1 P2

Q5: P1 P3 P6 P2 P4

Q6:



